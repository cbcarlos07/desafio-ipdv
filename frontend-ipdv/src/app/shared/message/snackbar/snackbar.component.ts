import { Component, OnInit } from '@angular/core';
import { tap, switchMap } from 'rxjs/internal/operators'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { timer } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import  Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
	selector: 'app-snackbar',
	templateUrl: './snackbar.component.html',
	styleUrls: ['./snackbar.component.scss'],
	animations: [
		trigger('snack-visibility',[
			state('hidden', style({
				opacity: 1,
				bottom: '-70px'
			})),
			state('visible', style({
				opacity: 1,
				bottom: '2px'
			})),
			transition('hidden => visible', animate('500ms 0s ease-in')),
			transition('visible => hidden', animate('500ms 0s ease-out'))
		]),
		trigger('snack-visibility1',[
			state('hidden', style({
				opacity: 1,
				bottom: '-100px'
			})),
			state('visible', style({
				opacity: 1,
				bottom: '2px'
			})),
			transition('hidden => visible', animate('500ms 0s ease-in')),
			transition('visible => hidden', animate('500ms 0s ease-out'))
		])
	]
	
})
export class SnackbarComponent implements OnInit {
	
	message: string = 'Hello There'
	snackVibility: string = 'hidden'
	alerta: string
	constructor(private messageService: MessageService,
		private _usuarioService: UsuarioService,
		private _router: Router
		) { }
		
		ngOnInit() {
			this.alertaMsg()
			this.alertaExpirado()
		}
		
		
		alertaMsg(){
			this.messageService
			.notifier
			.pipe(
				tap(obj =>{
					const obj1 = (obj as any)
					this.message = obj1.message
					this.snackVibility = 'visible'
					console.log('msg');
					
					this.alerta = obj1.status == true ? 'alert-success' : 'alert-danger'
					//console.log('alerta', this.alerta);
					
				}),
				switchMap( message => timer(3000) )
				).subscribe( timer => this.snackVibility = 'hidden' )
			}

		alertaExpirado(){
			this._usuarioService
				.avisoExpirado
				.subscribe( (response: any)=>{
					console.log(response);
					this.perguntaAtualizarToken()
					
				})
		}
		
		perguntaAtualizarToken(  ){
		
		Swal.fire({
			title: 'Token Expirado!',
			text: `Deseja atualizar o token?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, quero atualizar!',
			cancelButtonText: 'Não',
			preConfirm:  () => {
				const  r = this.atualizarToken()
				return r
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result: any) => {
			
			let status = result.isConfirmed == false ? false : result.value.status
			
			if (status) {
				Swal.fire(
					'Atualizado!',
					`Token com sucesso`,
					'success'
					).then(()=>{
						
						
						localStorage.setItem('token', result.value.token)
					})
				}else{					
					this._usuarioService.clearStorage()
					this._router.navigate(['/login'])
				}
			})
		}

			atualizarToken( ){
				return new Promise((resolve, reject)=>{
					let dados = {
						refreshToken: localStorage.getItem('refreshToken'),
						email: localStorage.getItem('email'),
						nome: localStorage.getItem('nome'),
					}
					this._usuarioService
						.refreshToken( dados )
						.subscribe((response: any)=>{
							resolve( response )
						})
				})

			}
			
			
			
			
			
			
		}
		