import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CargoService } from 'src/app/services/cargo.service';
import { ActivatedRoute } from '@angular/router';
import { Cargo } from '../cargo.interface';
import { MessageService } from 'src/app/services/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cargo-cadastro',
  templateUrl: './cargo-cadastro.component.html',
  styleUrls: ['./cargo-cadastro.component.scss']
})
export class CargoCadastroComponent implements OnInit {
  form: FormGroup
  title: string
  id: number
  constructor(private _cargoService: CargoService,
              private _activateRoute: ActivatedRoute,
              private _messageService: MessageService,
              private _location: Location
    ) { }

  ngOnInit() {
    this.id = this._activateRoute.snapshot.params['id'] || 0
    this.title = this.id == 0 ? 'Cadastrar cargo' : 'Atualizar Cargo'
    this.form = new FormGroup({
        id: new FormControl(this.id),
        nome: new FormControl( '', {validators: [Validators.required]} )
    })

    if( this.id > 0 ){
      this.buscarDados()
    }
  }

  buscarDados(){
    this._cargoService
        .findById( this.id )
        .subscribe( (_cargo: Cargo)=>{
          
            this.form.controls.nome.setValue( _cargo.nome )
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
    let cargo: Cargo = { ...this.form.value}
    this._cargoService
        .save( cargo )
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
    let cargo: Cargo = { ...this.form.value}
    this._cargoService
        .update( cargo )
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
