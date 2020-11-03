import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cargo } from '../components/cargo/cargo.interface';

@Injectable({
  providedIn: 'root'
})
export class CentroCustoService {

  	private webservice: string
	constructor(private http: HttpClient) { 
		this.webservice = `${environment.host}${environment.endpoint}/centro-custo`
	}
	
	getFindAll(){
		return this.http.get(this.webservice)
	}

	findById( id: number ){
		return this.http.get(`${this.webservice}/${id}`)
	}

	save( cargo: Cargo ){
		return this.http.post(`${this.webservice}`, cargo)
	}

	update( cargo: Cargo ){
		const id = cargo.id
		delete cargo.id
		return this.http.put(`${this.webservice}/${id}`, cargo)
	}

	remove( id: number ){
		return this.http.delete(`${this.webservice}/${id}`)
	}


	getDeptoList( id: number ){
		return this.http.get(`${this.webservice}/${id}/depto`)
	}

	saveDepto( id: number, depto: any ){
		return this.http.post(`${this.webservice}/${id}/depto/save`, depto)
	}
}
