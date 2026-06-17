import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AdopcionRequest,
  ESTADO_ADOPCION_LABELS,
  ESTADOS_ADOPCION,
} from '../models/adopcion.model';
import { AdopcionService } from '../services/adopcion.service';
import { Animal } from '../../animales/models/animal.model';
import { AnimalService } from '../../animales/services/animal.service';
import { Adoptante, nombreCompletoAdoptante } from '../../adoptantes/models/adoptante.model';
import { AdoptanteService } from '../../adoptantes/services/adoptante.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-adopcion-form',
  templateUrl: './adopcion-form.component.html',
  styleUrls: ['./adopcion-form.component.scss'],
})
export class AdopcionFormComponent implements OnInit {
  form!: FormGroup;
  editando = false;
  adopcionId?: number;
  guardando = false;
  error = '';
  animales: Animal[] = [];
  adoptantes: Adoptante[] = [];

  readonly estados = ESTADOS_ADOPCION;
  readonly estadoLabels = ESTADO_ADOPCION_LABELS;
  readonly nombreAdoptante = nombreCompletoAdoptante;

  constructor(
    private fb: FormBuilder,
    private adopcionService: AdopcionService,
    private animalService: AnimalService,
    private adoptanteService: AdoptanteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      animalId: [null, Validators.required],
      adoptanteId: [null, Validators.required],
      fechaSolicitud: ['', Validators.required],
      estadoActual: ['SOLICITUD', Validators.required],
    });

    this.animalService.listar().subscribe({
      next: (data) => {
        this.animales = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar los animales.';
      },
    });

    this.adoptanteService.listar().subscribe({
      next: (data) => {
        this.adoptantes = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar los adoptantes.';
      },
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true;
      this.adopcionId = +idParam;
      this.adopcionService.obtener(this.adopcionId).subscribe({
        next: (adopcion) => {
          this.form.patchValue({
            animalId: adopcion.animalId,
            adoptanteId: adopcion.adoptanteId,
            fechaSolicitud: adopcion.fechaSolicitud,
            estadoActual: adopcion.estadoActual,
          });
        },
        error: () => {
          this.error = 'Adopción no encontrada.';
        },
      });
    }
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
    const datos: AdopcionRequest = {
      animalId: v.animalId,
      adoptanteId: v.adoptanteId,
      fechaSolicitud: v.fechaSolicitud,
      estadoActual: v.estadoActual,
    };

    const peticion = this.editando && this.adopcionId
      ? this.adopcionService.actualizar(this.adopcionId, datos)
      : this.adopcionService.crear(datos);

    peticion.subscribe({
      next: () => {
        this.router.navigate(['/adopciones']);
      },
      error: (err) => {
        this.guardando = false;
        this.error = mensajeApiError(err);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/adopciones']);
  }
}
