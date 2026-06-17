import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DireccionFieldsComponent } from './components/direccion-fields/direccion-fields.component';

@NgModule({
  declarations: [DireccionFieldsComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [DireccionFieldsComponent],
})
export class SharedModule {}
