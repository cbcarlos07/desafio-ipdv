import { Component, OnInit } from '@angular/core';
import { Cargo } from './cargo.interface';
import { CargoService } from 'src/app/services/cargo.service';
import  Swal from 'sweetalert2';
@Component({
	selector: 'app-cargo',
	templateUrl: './cargo.component.html',
	styleUrls: ['./cargo.component.scss']
})
export class CargoComponent implements OnInit {
	cargos: Cargo[] = []
	constructor(private cargoService: CargoService) { }
	
	ngOnInit() {
		this.bucarCargos()
	}
	
	bucarCargos(){
		this.cargoService
		.getFindAll()
		.subscribe( (_cargos: Cargo[] ) =>{
			this.cargos = _cargos
		})
	}
	
	perguntaRemover( cargo: Cargo ){
		
		Swal.fire({
			title: 'Atenção!',
			text: `Deseja realmente remover ${cargo.nome}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, quero remover!',
			cancelButtonText: 'Não',
			preConfirm:  () => {
				const  r = this.remover(cargo)
				return r
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result: any) => {
			
			
			if (result.value.status) {
				Swal.fire(
					'Removido!',
					`${cargo.nome} removido com sucesso`,
					'success'
					).then(()=>{
						this.bucarCargos()
					})
				}else{
					console.error(result.value.log);        
					Swal.fire(
						'Oops!',
						`<strong>${cargo.nome}</strong> não foi removido(a)`,
						'error'
						).then(()=>{
							this.bucarCargos()
						})
					}
				})
			}
			remover( cargo: Cargo ){
				return new Promise((resolve, reject)=>{
					this.cargoService.remove( cargo.id )
					.subscribe( r =>{
						const obj = (r as any)
						let retorno = {...obj, status: true}
						resolve(retorno)
						
					})
					
				})
			}
			
			
			
		}
		