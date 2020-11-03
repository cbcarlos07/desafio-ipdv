import { Component, OnInit } from '@angular/core';
import  Swal from 'sweetalert2';
import { Usuario } from './usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
	
	usuarios: Usuario[] = []
	constructor(private usuarioService: UsuarioService) { }
	
	ngOnInit() {
		this.bucarUsuarios()
	}
	
	bucarUsuarios(){
		this.usuarioService
		.getAll()
		.subscribe( (_usuarios: Usuario[] ) =>{
			this.usuarios = _usuarios
		})
	}
	
	perguntaRemover( usuario: Usuario ){
		
		Swal.fire({
			title: 'Atenção!',
			text: `Deseja realmente remover ${usuario.nome}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, quero remover!',
			cancelButtonText: 'Não',
			preConfirm:  () => {
				const  r = this.remover(usuario)
				return r
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result: any) => {
			
			
			if (result.value.status) {
				Swal.fire(
					'Removido!',
					`${usuario.nome} removido com sucesso`,
					'success'
					).then(()=>{
						this.bucarUsuarios()
					})
				}else{
					console.error(result.value.log);        
					Swal.fire(
						'Oops!',
						`<strong>${usuario.nome}</strong> não foi removido(a)`,
						'error'
						).then(()=>{
							this.bucarUsuarios()
						})
					}
				})
			}
			remover( usuario: Usuario ){
				return new Promise((resolve, reject)=>{
					this.usuarioService.remove( usuario.id )
					.subscribe( r =>{
						const obj = (r as any)
						let retorno = {...obj, status: true}
						resolve(retorno)
						
					})
					
				})
			}
	
}
