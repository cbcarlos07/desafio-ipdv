import { Routes, RouterModule } from "@angular/router";

import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartamentoComponent } from './departamento.component';
import { CadastrDepartamentoComponent } from './cadastr-departamento/cadastr-departamento.component';


const ROUTES: Routes = [
    {path: '', component: DepartamentoComponent},
    {path: 'novo', component: CadastrDepartamentoComponent},
    {path: 'editar/:id', component: CadastrDepartamentoComponent}
]

@NgModule({
    declarations: [DepartamentoComponent,CadastrDepartamentoComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )],
    exports: []
})

export class DepartamentoRouter{}