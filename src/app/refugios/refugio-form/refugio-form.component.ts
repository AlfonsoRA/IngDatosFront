import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefugioService } from '../services/refugio.service';
import { RefugioRequest } from '../models/refugio.model';
import { mensajeApiError } from '../../shared/utils/api-error.util';
import {
  createDireccionFormGroup,
  direccionFromForm,
  patchDireccionForm,
} from '../../shared/utils/direccion-form.util';

@Component({
  selector: 'app-refugio-form',
  templateUrl: './refugio-form.component.html',
  styleUrls: ['./refugio-form.component.scss'],
})
export class RefugioFormComponent implements OnInit {
  form!: FormGroup;
  editando = false;
  refugioId?: number;
  guardando = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private refugioService: RefugioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(120)]],
      email: ['', [Validators.email, Validators.maxLength(120)]],
      telefono: ['', [Validators.maxLength(30)]],
      capacidad: [null, [Validators.required, Validators.min(1)]],
      responsable: ['', [Validators.required, Validators.maxLength(100)]],
      direccion: createDireccionFormGroup(this.fb),
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true;
      this.refugioId = +idParam;
      this.refugioService.obtener(this.refugioId).subscribe({
        next: (refugio) => {
          this.form.patchValue({
            nombre: refugio.nombre,
            email: refugio.email?.trim() ?? '',
            telefono: refugio.telefono ?? '',
            capacidad: refugio.capacidad ?? refugio.capacidadMaxima,
            responsable: refugio.responsable,
          });
          if (refugio.direccion) {
            patchDireccionForm(this.form.get('direccion') as FormGroup, refugio.direccion);
          } else if (refugio.domicilio) {
            patchDireccionForm(this.form.get('direccion') as FormGroup, {
              calle: refugio.domicilio,
              localidad: 'AMBA',
            });
          }
        },
        error: () => {
          this.error = 'Refugio no encontrado.';
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
    const datos: RefugioRequest = {
      nombre: v.nombre,
      email: v.email?.trim() || undefined,
      telefono: v.telefono || undefined,
      capacidad: v.capacidad,
      responsable: v.responsable,
      direccion: direccionFromForm(this.direccionGroup),
    };

    const peticion = this.editando && this.refugioId
      ? this.refugioService.actualizar(this.refugioId, datos)
      : this.refugioService.crear(datos);

    peticion.subscribe({
      next: () => {
        this.router.navigate(['/refugios']);
      },
      error: (err) => {
        this.guardando = false;
        this.error = mensajeApiError(err);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/refugios']);
  }
}
