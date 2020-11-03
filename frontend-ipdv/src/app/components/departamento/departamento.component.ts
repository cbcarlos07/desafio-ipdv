import { Component, OnInit } from '@angular/core';
import  Swal from 'sweetalert2';
import { Departamento } from './departamento.interface';
import { DepartamentoService } from 'src/app/services/departamento.service';
@Component({
	selector: 'app-departamento',
	templateUrl: './departamento.component.html',
	styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {
	
	departamentos: Departamento[] = []
	constructor(private _departamentoService: DepartamentoService) { }
	
	ngOnInit() {
		this.buscar()
	}
	
	buscar(){
		this._departamentoService
		.getAll()
		.subscribe( (_centroCusto: Departamento[] ) =>{
			this.departamentos = _centroCusto
		})
	}
	
	perguntaRemover( Departamento: Departamento ){
		
		Swal.fire({
			title: 'Atenção!',
			text: `Deseja realmente remover ${Departamento.nome}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, quero remover!',
			cancelButtonText: 'Não',
			preConfirm:  () => {
				const  r = this.remover(Departamento)
				return r
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result: any) => {
			
			
			if (result.value.status) {
				Swal.fire(
					'Removido!',
					`${Departamento.nome} removido com sucesso`,
					'success'
					).then(()=>{
						this.buscar()
					})
				}else{
					console.error(result.value.log);        
					Swal.fire(
						'Oops!',
						`<strong>${Departamento.nome}</strong> não foi removido(a)`,
						'error'
						).then(()=>{
							this.buscar()
						})
					}
				})
			}
			remover( Departamento: Departamento ){
				return new Promise((resolve, reject)=>{
					this._departamentoService.remove( Departamento.id )
					.subscribe( r =>{
						const obj = (r as any)
						let retorno = {...obj, status: true}
						resolve(retorno)
						
					})
					
				})
			}
			
			
			
		}
		