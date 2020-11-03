import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { InputComponent } from './input/input.component';
import { SnackbarComponent } from './message/snackbar/snackbar.component';
import { AngularDualListBoxModule } from 'angular-dual-listbox';

@NgModule({
    declarations: [InputComponent, SnackbarComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AngularDualListBoxModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputComponent, 
        SnackbarComponent,
        AngularDualListBoxModule
    ]
})


export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return {
            ngModule: SharedModule,
            providers: []
        }
    }
}
