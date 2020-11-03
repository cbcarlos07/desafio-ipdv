import { Component, OnInit } from '@angular/core';
import { DualListComponent } from 'angular-dual-listbox';
import { FormGroup, FormControl } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CentroCustoService } from 'src/app/services/centro-custo.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MessageService } from 'src/app/services/message.service';
import { Location } from '@angular/common';
@Component({
	selector: 'app-depto-centro-custo',
	templateUrl: './depto-centro-custo.component.html',
	styleUrls: ['./depto-centro-custo.component.scss']
})
export class DeptoCentroCustoComponent implements OnInit {
	idCentroCusto: number
	form: FormGroup
	frameState = 'ready'
	centroCusto: string
	source = [];
	target = [];
	format = { add: 'Adicionar', remove: 'Remover', all: 'Todos', none: 'Nenhum',
			direction: DualListComponent.LTR, draggable: true, locale: 'PT_br' };

	constructor(private _location: Location,
				private _activatedRoute: ActivatedRoute,
				private _centroCustoService: CentroCustoService,
				private _departamentoService: DepartamentoService,
				private _messageService: MessageService
				) { }
	
	ngOnInit() {
		this.idCentroCusto = this._activatedRoute.snapshot.params['id'] || 0
		this.form = new FormGroup({
			depto: new FormControl()
		})
		this.init()
	}

	async init(){
		await this.getCentroCusto()
		await this.getDeptoList()
		await this.deptoDoCentroCusto()
	}	

	getCentroCusto(){
		return new Promise((resolve, reject)=>{
			this._centroCustoService.findById( this.idCentroCusto )
				.subscribe( r =>{
					let obj = (r as any)
					this.centroCusto = obj.nome
					resolve()	
				})
		})
	}

	getDeptoList(){
		return new Promise((resolve, reject)=>{
			this._departamentoService.getAll()
				.subscribe( r =>{
					let obj = (r as any)
					obj.forEach(p => {
					  this.source.push({id: p.id, nome: `${p.nome}`})
					});
					resolve()	
				})

		})
	  }


	  salvar(){
		const depto = this.target.map( e => e.id)
		
		
		this._centroCustoService.saveDepto( this.idCentroCusto, depto )
				   .subscribe( r =>{
					   let obj = (r as any)
					   if( obj.status == true ){
						 let objAlert = {
						   message: obj.msg,
						   status: true
						 }
						 this._messageService.notify( objAlert )
						 this.voltar()
					   }
					   
				   })
		
	  }
	
	  deptoDoCentroCusto(){
		  return new Promise((resolve, reject)=>{

			  this._centroCustoService.getDeptoList( this.idCentroCusto )
						 .subscribe( r =>{
						   let obj = (r as any)
						   obj._departamento.forEach(p => {
							this.target.push({id: p.id, nome: `${p.nome}`})
						  });
						   
						 })
		  })
	  }
	
	  voltar(){
		this._location.back()
	  }
	
	  
	
	
	
}
