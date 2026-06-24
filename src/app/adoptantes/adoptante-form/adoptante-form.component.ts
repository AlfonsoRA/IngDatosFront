import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdoptanteRequest } from '../models/adoptante.model';
import { AdoptanteService } from '../services/adoptante.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';
import {
  createDireccionFormGroup,
  direccionFromForm,
  patchDireccionForm,
} from '../../shared/utils/direccion-form.util';

@Component({
  selector: 'app-adoptante-form',
  templateUrl: './adoptante-form.component.html',
  styleUrls: ['./adoptante-form.component.scss'],
})
export class AdoptanteFormComponent implements OnInit {
  form!: FormGroup;
  editando = false;
  adoptanteId?: number;
  guardando = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private adoptanteService: AdoptanteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(80)]],
      apellido: ['', [Validators.required, Validators.maxLength(80)]],
      telefono: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.email, Validators.maxLength(120)]],
      adoptantePrevio: [false],
      direccion: createDireccionFormGroup(this.fb),
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true;
      this.adoptanteId = +idParam;
      this.adoptanteService.obtener(this.adoptanteId).subscribe({
        next: (adoptante) => {
          this.form.patchValue({
            dni: adoptante.dni,
            nombre: adoptante.nombre,
            apellido: adoptante.apellido,
            telefono: adoptante.telefono ?? '',
            email: adoptante.email ?? '',
            adoptantePrevio: adoptante.adoptantePrevio ?? false,
          });
          patchDireccionForm(this.form.get('direccion') as FormGroup, adoptante.direccion);
        },
        error: () => {
          this.error = 'Adoptante no encontrado.';
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
    const datos: AdoptanteRequest = {
      dni: v.dni,
      nombre: v.nombre,
      apellido: v.apellido,
      telefono: v.telefono,
      email: v.email || undefined,
      adoptantePrevio: !!v.adoptantePrevio,
      direccion: direccionFromForm(this.direccionGroup),
    };

    const peticion = this.editando && this.adoptanteId
      ? this.adoptanteService.actualizar(this.adoptanteId, datos)
      : this.adoptanteService.crear(datos);

    peticion.subscribe({
      next: () => {
        this.router.navigate(['/adoptantes']);
      },
      error: (err) => {
        this.guardando = false;
        this.error = mensajeApiError(err);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/adoptantes']);
  }
}
