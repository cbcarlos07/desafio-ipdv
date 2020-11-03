import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CentroCustoService } from 'src/app/services/centro-custo.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { CentroCusto } from '../centro-custo.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadatro-centro-custo',
  templateUrl: './cadatro-centro-custo.component.html',
  styleUrls: ['./cadatro-centro-custo.component.scss']
})
export class CadatroCentroCustoComponent implements OnInit {

  form: FormGroup
  title: string
  id: number
  constructor(private _centroCustoService: CentroCustoService,
              private _activateRoute: ActivatedRoute,
              private _messageService: MessageService,
              private _location: Location
    ) { }

  ngOnInit() {
    this.id = this._activateRoute.snapshot.params['id'] || 0
    this.title = this.id == 0 ? 'Cadastrar Centro de Custo' : 'Atualizar Centro de Custo'
    this.form = new FormGroup({
        id: new FormControl(this.id),
        nome: new FormControl( '', {validators: [Validators.required]} )
    })

    if( this.id > 0 ){
      this.buscarDados()
    }
  }

  buscarDados(){
    this._centroCustoService
        .findById( this.id )
        .subscribe( (_centroCusto: CentroCusto)=>{
          
            this.form.controls.nome.setValue( _centroCusto.nome )
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
    let CentroCusto: CentroCusto = { ...this.form.value}
    this._centroCustoService
        .save( CentroCusto )
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
    let CentroCusto: CentroCusto = { ...this.form.value}
    this._centroCustoService
        .update( CentroCusto )
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
