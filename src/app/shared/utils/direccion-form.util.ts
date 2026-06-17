import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Direccion } from '../models/direccion.model';

export function createDireccionFormGroup(fb: FormBuilder): FormGroup {
  return fb.group({
    calle: ['', [Validators.required, Validators.maxLength(120)]],
    numero: ['', [Validators.maxLength(20)]],
    localidad: ['', [Validators.required, Validators.maxLength(80)]],
    partido: ['', [Validators.maxLength(80)]],
    cp: ['', [Validators.maxLength(10)]],
  });
}

export function patchDireccionForm(form: FormGroup, direccion?: Direccion): void {
  if (direccion) {
    form.patchValue(direccion);
  }
}

export function direccionFromForm(form: FormGroup): Direccion {
  return form.value as Direccion;
}
