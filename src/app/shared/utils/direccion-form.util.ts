import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Direccion } from '../models/direccion.model';

export function createDireccionFormGroup(fb: FormBuilder): FormGroup {
  return fb.group({
    calle: ['', [Validators.required, Validators.maxLength(120)]],
    numero: ['', [Validators.required, Validators.maxLength(20)]],
    localidad: ['', [Validators.required, Validators.maxLength(80)]],
    partido: ['', [Validators.maxLength(80)]],
    provincia: [{ value: 'BUENOS AIRES', disabled: true }],
    cp: ['', [Validators.required, Validators.maxLength(10)]],
    cpaId: [null as number | null],
  });
}

export function patchDireccionForm(form: FormGroup, direccion?: Direccion): void {
  if (direccion) {
    form.patchValue({
      calle: direccion.calle,
      numero: direccion.numero ?? '',
      localidad: direccion.localidad,
      partido: direccion.partido ?? '',
      cp: direccion.cp ?? '',
      cpaId: direccion.cpaId ?? null,
    });
  }
}

export function direccionFromForm(form: FormGroup): Direccion {
  const raw = form.getRawValue();
  const direccion: Direccion = {
    calle: raw.calle,
    numero: raw.numero || undefined,
    localidad: raw.localidad,
    partido: raw.partido || undefined,
    provincia: raw.provincia || 'BUENOS AIRES',
    cp: raw.cp?.trim() || undefined,
  };
  if (raw.cpaId != null) {
    direccion.cpaId = raw.cpaId;
  }
  return direccion;
}
