import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../usuario/usuario.interface';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	form: FormGroup	
	constructor(private _usuarioService: UsuarioService,
				private _router: Router) { }
	
	ngOnInit() {

		this.form = new FormGroup({
			email: new FormControl('', {validators: [Validators.required]}),
			senha: new FormControl('', {validators: [Validators.required]})
		})

	}

	logar(){
		let user: Usuario = {...this.form.value}
		this._usuarioService
			.auth( user )
			.subscribe( (response: any)=>{
				if( response.status == true ){
					
					localStorage.setItem('token', response.token)
					localStorage.setItem('refreshToken', response.refreshToken)
					localStorage.setItem('email', response.user.email)
					localStorage.setItem('nome', response.user.nome)
	
					this._usuarioService.notifyLogin()
					this._router.navigate(['/cargo'])
				}
			} )

	}
	
}
