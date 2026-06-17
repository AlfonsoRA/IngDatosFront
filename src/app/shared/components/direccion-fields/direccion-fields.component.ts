import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-direccion-fields',
  templateUrl: './direccion-fields.component.html',
  styleUrls: ['./direccion-fields.component.scss'],
})
export class DireccionFieldsComponent {
  @Input() group!: FormGroup;

  campoInvalido(campo: string): boolean {
    const control = this.group.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
