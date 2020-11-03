import { Component, OnInit } from '@angular/core';
import  Swal from 'sweetalert2';
import { CentroCusto } from './centro-custo.interface';
import { CentroCustoService } from 'src/app/services/centro-custo.service';
@Component({
  selector: 'app-centro-custo',
  templateUrl: './centro-custo.component.html',
  styleUrls: ['./centro-custo.component.scss']
})
export class CentroCustoComponent implements OnInit {

  centroCustos: CentroCusto[] = []
  constructor(private _centroCustoervice: CentroCustoService) { }

  ngOnInit() {
    this.bucarcentroCusto()
  }

  bucarcentroCusto(){
    this._centroCustoervice
          .getFindAll()
          .subscribe( (_centroCusto: CentroCusto[] ) =>{
              this.centroCustos = _centroCusto
          })
  }

  perguntaRemover( CentroCusto: CentroCusto ){
    
    Swal.fire({
      title: 'Atenção!',
      text: `Deseja realmente remover ${CentroCusto.nome}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, quero remover!',
      cancelButtonText: 'Não',
      preConfirm:  () => {
          const  r = this.remover(CentroCusto)
          return r
      },
    allowOutsideClick: () => !Swal.isLoading()
    }).then((result: any) => {
      
      
      if (result.value.status) {
        Swal.fire(
          'Removido!',
          `${CentroCusto.nome} removido com sucesso`,
          'success'
        ).then(()=>{
          this.bucarcentroCusto()
        })
      }else{
        console.error(result.value.log);        
        Swal.fire(
          'Oops!',
          `<strong>${CentroCusto.nome}</strong> não foi removido(a)`,
          'error'
        ).then(()=>{
          this.bucarcentroCusto()
        })
      }
    })
  }
  remover( CentroCusto: CentroCusto ){
     return new Promise((resolve, reject)=>{
       this._centroCustoervice.remove( CentroCusto.id )
                      .subscribe( r =>{
                        const obj = (r as any)
                        let retorno = {...obj, status: true}
                        resolve(retorno)
                        
                      })

     })
  }


}
