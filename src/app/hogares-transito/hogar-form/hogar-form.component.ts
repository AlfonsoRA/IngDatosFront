import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HogarTransitoRequest } from '../models/hogar-transito.model';
import { HogarTransitoService } from '../services/hogar-transito.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';
import {
  createDireccionFormGroup,
  direccionFromForm,
  patchDireccionForm,
} from '../../shared/utils/direccion-form.util';

@Component({
  selector: 'app-hogar-form',
  templateUrl: './hogar-form.component.html',
  styleUrls: ['./hogar-form.component.scss'],
})
export class HogarFormComponent implements OnInit {
  form!: FormGroup;
  editando = false;
  hogarId?: number;
  guardando = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private hogarService: HogarTransitoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(80)]],
      apellido: ['', [Validators.required, Validators.maxLength(80)]],
      telefono: ['', [Validators.maxLength(30)]],
      email: ['', [Validators.email, Validators.maxLength(120)]],
      capacidadMaxima: [null, [Validators.required, Validators.min(1)]],
      tieneGatos: [false],
      tienePerros: [false],
      direccion: createDireccionFormGroup(this.fb),
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true;
      this.hogarId = +idParam;
      this.hogarService.obtener(this.hogarId).subscribe({
        next: (hogar) => {
          this.form.patchValue({
            dni: hogar.dni,
            nombre: hogar.nombre,
            apellido: hogar.apellido,
            telefono: hogar.telefono ?? '',
            email: hogar.email ?? '',
            capacidadMaxima: hogar.capacidadMaxima,
            tieneGatos: hogar.tieneGatos ?? false,
            tienePerros: hogar.tienePerros ?? false,
          });
          patchDireccionForm(this.form.get('direccion') as FormGroup, hogar.direccion);
        },
        error: () => {
          this.error = 'Hogar no encontrado.';
        },
      });
    }
  }

  get direccionGroup(): FormGroup {
    return this.form.get('direccion') as FormGroup;
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.error = '';
    const v = this.form.value;
    const datos: HogarTransitoRequest = {
      dni: v.dni,
      nombre: v.nombre,
      apellido: v.apellido,
      telefono: v.telefono || undefined,
      email: v.email || undefined,
      capacidadMaxima: v.capacidadMaxima,
      tieneGatos: !!v.tieneGatos,
      tienePerros: !!v.tienePerros,
      direccion: direccionFromForm(this.direccionGroup),
    };

    const peticion = this.editando && this.hogarId
      ? this.hogarService.actualizar(this.hogarId, datos)
      : this.hogarService.crear(datos);

    peticion.subscribe({
      next: () => {
        this.router.navigate(['/hogares-transito']);
      },
      error: (err) => {
        this.guardando = false;
        this.error = mensajeApiError(err);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/hogares-transito']);
  }
}
