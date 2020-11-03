import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-ipdv';
  
  constructor( private usuarioService: UsuarioService ){}

  estaLogado(){
    return this.usuarioService.estaLogado()
  }

}
