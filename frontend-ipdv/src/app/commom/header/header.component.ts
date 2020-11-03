import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	
	constructor(private _usuarioService: UsuarioService,
				private _router: Router
		) { }
	
	ngOnInit() {
	}
	getNome(){
		return this._usuarioService.getNome()
	}

	logout(){
		this._usuarioService.clearStorage()
		this._router.navigate(['/login'])
	}
}
