import { Injectable } from '@angular/core';
import { Departamento } from '../components/departamento/departamento.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DepartamentoService {
	
	private webservice: string
	constructor(private http: HttpClient) { 
		this.webservice = `${environment.host}${environment.endpoint}/departamento`
	}
	
	getAll(){
		return this.http.get(this.webservice)
	}

	findById( id: number ){
		return this.http.get(`${this.webservice}/${id}`)
	}

	save( departamento: Departamento ){
		return this.http.post(`${this.webservice}`, departamento)
	}

	update( departamento: Departamento ){
		const id = departamento.id
		delete departamento.id
		return this.http.put(`${this.webservice}/${id}`, departamento)
	}

	remove( id: number ){
		return this.http.delete(`${this.webservice}/${id}`)
	}
}
