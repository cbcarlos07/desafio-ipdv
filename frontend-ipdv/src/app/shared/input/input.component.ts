import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() errorMessage: string;
  @Input() label: string;
  @Input() showTip = true;
  input: any;
  @ContentChild(NgModel, {static: false}) model: NgModel;
  @ContentChild(FormControlName, {static: false}) control: FormControlName;
  constructor() { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw new Error('Este componente precisar ser usado com a diretiva ngModel ou formControlName');
    }
  }
  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched || !this.input.empty );
  }
  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }



}
