import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Usuario } from '../usuario.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { CargoService } from 'src/app/services/cargo.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from '../../departamento/departamento.interface';
import { Cargo } from '../../cargo/cargo.interface';
import * as md5 from 'md5'
@Component({
	selector: 'app-usuario-cadastro',
	templateUrl: './usuario-cadastro.component.html',
	styleUrls: ['./usuario-cadastro.component.scss']
})
export class UsuarioCadastroComponent implements OnInit {
	
	form: FormGroup
	title: string
	id: number
	departamentos: Departamento[] = []
	cargos: Cargo[] = []
	constructor(private _usuarioService: UsuarioService,
		private _activateRoute: ActivatedRoute,
		private _messageService: MessageService,
		private _location: Location,
		private _cargoService: CargoService,
		private _departamentoService: DepartamentoService
		) { }
		
		ngOnInit() {
			this.id = this._activateRoute.snapshot.params['id'] || 0
			this.title = this.id == 0 ? 'Cadastrar usuario' : 'Atualizar Usuario'
			this.form = new FormGroup({
				id: new FormControl(this.id),
				nome: new FormControl( '', {validators: [Validators.required]} ),
				email: new FormControl( '', {validators: [Validators.required]} ),
				senha: new FormControl( '', {validators: [Validators.required, Validators.minLength(6)]} ),
				cargo_id: new FormControl( '' ),
				departamento_id: new FormControl( '' )
			})
			
			this.init()
			

		}

		async init(){
			
			await this.buscarCargos()
			await this.buscarDepartamentos()

			if( this.id > 0 ){
				this.buscarDados()
			}
		}

		buscarCargos(){
			return new Promise((resolve, reject)=>{
				this._cargoService
					.getFindAll()
					.subscribe( (_cargos: Cargo[]) =>{
						this.cargos = _cargos
						this.form.controls.cargo_id.setValue( this.cargos[0].id )
						resolve()
					})

			})
		}

		buscarDepartamentos(){
			return new Promise((resolve, reject)=>{
				this._departamentoService
					.getAll()
					.subscribe( (_depto: Departamento[]) =>{
						this.departamentos = _depto
						this.form.controls.departamento_id.setValue( this.departamentos[0].id )
						resolve()
					})

			})
		}
		
		buscarDados(){
			this._usuarioService
			.findById( this.id )
			.subscribe( (_usuario: Usuario)=>{
				this.form.controls.nome.setValue( _usuario.nome )
				this.form.controls.email.setValue( _usuario.email )
				let idxCargo = this.cargos.findIndex( c => c.id == _usuario.cargo_id)
				let idxDepto = this.departamentos.findIndex( d => d.id == _usuario.departamento_id)
				this.form.controls.cargo_id.setValue( this.cargos[idxCargo].id )
				this.form.controls.departamento_id.setValue( this.departamentos[idxDepto].id )
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
			this.form.value.senha = md5( this.form.value.senha )
			let usuario: Usuario = { ...this.form.value}
			this._usuarioService
			.save( usuario )
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
			let usuario: Usuario = { ...this.form.value}
			this._usuarioService
			.update( usuario )
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
	