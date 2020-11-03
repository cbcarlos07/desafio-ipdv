import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
	{
		path: '', 
		redirectTo: 'login', 
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'cargo',
		children: [
			{path: '', loadChildren: './components/cargo/cargo.router#CargoRouter'}
		]
	},
	{
		path: 'centro-custo',
		children: [
			{path: '', loadChildren: './components/centro-custo/centro-custo.router#CentroCustoRouter'}
		]
	},
	{
		path: 'departamento',
		children: [
		  {path: '', loadChildren: './components/departamento/departamento.router#DepartamentoRouter'}
		]
	},
	{
		path: 'usuario',
		children: [
		  {path: '', loadChildren: './components/usuario/usuario.router#UsuarioRouter'}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
