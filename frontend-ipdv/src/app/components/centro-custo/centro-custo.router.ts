import { Routes, RouterModule } from "@angular/router";

import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CentroCustoComponent } from './centro-custo.component';
import { CadatroCentroCustoComponent } from './cadatro-centro-custo/cadatro-centro-custo.component';
import { DeptoCentroCustoComponent } from './depto-centro-custo/depto-centro-custo.component';

const ROUTES: Routes = [
    {path: '', component: CentroCustoComponent},
    {path: 'novo', component: CadatroCentroCustoComponent},
    {path: 'editar/:id', component: CadatroCentroCustoComponent},
    {path: 'depto/:id', component: DeptoCentroCustoComponent}
]

@NgModule({
    declarations: [CentroCustoComponent, CadatroCentroCustoComponent, DeptoCentroCustoComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )],
    exports: []
})

export class CentroCustoRouter{}