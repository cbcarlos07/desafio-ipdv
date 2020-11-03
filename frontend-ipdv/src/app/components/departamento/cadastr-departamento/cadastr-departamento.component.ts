import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { Departamento } from '../departamento.interface';
import { Location } from '@angular/common';

@Component({
	selector: 'app-cadastr-departamento',
	templateUrl: './cadastr-departamento.component.html',
	styleUrls: ['./cadastr-departamento.component.scss']
})
export class CadastrDepartamentoComponent implements OnInit {
	
	form: FormGroup
	title: string
	id: number
	constructor(private _departamentoService: DepartamentoService,
		private _activateRoute: ActivatedRoute,
		private _messageService: MessageService,
		private _location: Location
		) { }
		
		ngOnInit() {
			this.id = this._activateRoute.snapshot.params['id'] || 0
			this.title = this.id == 0 ? 'Cadastrar Departamento' : 'Atualizar Departamento'
			this.form = new FormGroup({
				id: new FormControl(this.id),
				nome: new FormControl( '', {validators: [Validators.required]} )
			})
			
			if( this.id > 0 ){
				this.buscarDados()
			}
		}
		
		buscarDados(){
			this._departamentoService
			.findById( this.id )
			.subscribe( (_departamento: Departamento)=>{
				
				this.form.controls.nome.setValue( _departamento.nome )
			})
		}
		
		salvar(){
			if( this.id == 0 ){
				this.novo()
			}else{
				this.atualizar()
			}
		}
		
		novo(){
			delete this.form.value.id
			let Departamento: Departamento = { ...this.form.value}
			this._departamentoService
			.save( Departamento )
			.subscribe((response: any)=>{
				let obj = {
					status: true,
					message: response.msg
				}
				this._messageService.notify( obj )
				this._location.back()
			})
		}
		
		atualizar(){
			let Departamento: Departamento = { ...this.form.value}
			this._departamentoService
			.update( Departamento )
			.subscribe((response: any)=>{
				let obj = {
					status: true,
					message: response.msg
				}
				this._messageService.notify( obj )
				this._location.back()
			})
		}

		voltar(){
			this._location.back()
		  }

		
		
	}
	