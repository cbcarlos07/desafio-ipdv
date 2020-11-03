import { Routes, RouterModule } from "@angular/router";

import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';


const ROUTES: Routes = [
    {path: '', component: UsuarioComponent},
    {path: 'novo', component: UsuarioCadastroComponent},
    {path: 'editar/:id', component: UsuarioCadastroComponent}
]

@NgModule({
    declarations: [UsuarioComponent, UsuarioCadastroComponent] ,
    imports: [SharedModule, RouterModule.forChild( ROUTES )],
    exports: []
})

export class UsuarioRouter{}