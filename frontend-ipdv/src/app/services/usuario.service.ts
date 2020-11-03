import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../components/usuario/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client'
@Injectable({
	providedIn: 'root'
})
export class UsuarioService {
	avisoLogin = new EventEmitter()
	avisoExpirado = new EventEmitter()
	private webservice: string
	private socket: SocketIOClient.Socket
	constructor(private http: HttpClient) { 
		this.webservice = `${environment.host}${environment.endpoint}/usuario`
		this.socket = io( environment.host )
		this.escutandoExpiracao()
	}

	escutandoExpiracao(){
		this.socket.on( 'expired', msg =>{
			this.avisoExpirado.emit( msg )
		})

	}
	
	getAll(){
		return this.http.get(`${this.webservice}/users/cargo`)
	}

	findById( id: number ){
		return this.http.get(`${this.webservice}/${id}`)
	}

	save( usuario: Usuario ){
		return this.http.post(`${this.webservice}`, usuario)
	}

	update( usuario: Usuario ){
		const id = usuario.id
		delete usuario.id
		return this.http.put(`${this.webservice}/${id}`, usuario)
	}

	remove( id: number ){
		return this.http.delete(`${this.webservice}/${id}`)
	}

	auth( dados: Usuario ){
		return this.http.post( `${this.webservice}/auth/logar`, dados )
	}

	refreshToken( dados: any ){
		return this.http.post( `${this.webservice}/auth/renew-token`, dados )
	}

	estaLogado(){
		return localStorage.getItem('email') != undefined
	}

	getNome(){
		return localStorage.getItem('nome')
	}

	clearStorage(){
		localStorage.clear()
	}

	notifyLogin(status = true){
		this.avisoLogin.emit( status )
	}

	

}
