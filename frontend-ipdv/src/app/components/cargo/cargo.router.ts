import { Routes, RouterModule } from "@angular/router";
import { CargoComponent } from './cargo.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CargoCadastroComponent } from './cargo-cadastro/cargo-cadastro.component';

const ROUTES: Routes = [
    {path: '', component: CargoComponent},
    {path: 'novo', component: CargoCadastroComponent},
    {path: 'editar/:id', component: CargoCadastroComponent}
]

@NgModule({
    declarations: [CargoComponent, CargoCadastroComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )],
    exports: []
})

export class CargoRouter{}