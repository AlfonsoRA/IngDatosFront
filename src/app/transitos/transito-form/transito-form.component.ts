import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TransitoRequest,
  ESTADO_TRANSITO_LABELS,
  ESTADOS_TRANSITO,
} from '../models/transito.model';
import { TransitoService } from '../services/transito.service';
import { Animal } from '../../animales/models/animal.model';
import { AnimalService } from '../../animales/services/animal.service';
import { HogarTransito, nombreCompletoHogar } from '../../hogares-transito/models/hogar-transito.model';
import { HogarTransitoService } from '../../hogares-transito/services/hogar-transito.service';
import { Refugio } from '../../refugios/models/refugio.model';
import { RefugioService } from '../../refugios/services/refugio.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-transito-form',
  templateUrl: './transito-form.component.html',
  styleUrls: ['./transito-form.component.scss'],
})
export class TransitoFormComponent implements OnInit {
  form!: FormGroup;
  editando = false;
  transitoId?: number;
  guardando = false;
  error = '';
  animales: Animal[] = [];
  hogares: HogarTransito[] = [];
  refugios: Refugio[] = [];

  readonly estados = ESTADOS_TRANSITO;
  readonly estadoLabels = ESTADO_TRANSITO_LABELS;
  readonly nombreHogar = nombreCompletoHogar;

  constructor(
    private fb: FormBuilder,
    private transitoService: TransitoService,
    private animalService: AnimalService,
    private hogarService: HogarTransitoService,
    private refugioService: RefugioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      animalId: [null, Validators.required],
      hogarTransitoId: [null, Validators.required],
      refugioId: [null, Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFinEstimada: [''],
      fechaFinReal: [''],
      estadoActual: ['ACTIVO', Validators.required],
      observaciones: ['', Validators.maxLength(500)],
    });

    this.animalService.listar().subscribe({
      next: (data) => {
        this.animales = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar los animales.';
      },
    });

    this.hogarService.listar().subscribe({
      next: (data) => {
        this.hogares = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar los hogares de tránsito.';
      },
    });

    this.refugioService.listar().subscribe({
      next: (data) => {
        this.refugios = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar los refugios.';
      },
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editando = true;
      this.transitoId = +idParam;
      this.transitoService.obtener(this.transitoId).subscribe({
        next: (transito) => {
          this.form.patchValue({
            animalId: transito.animalId,
            hogarTransitoId: transito.hogarTransitoId,
            refugioId: transito.refugioId,
            fechaInicio: transito.fechaInicio,
            fechaFinEstimada: transito.fechaFinEstimada ?? '',
            fechaFinReal: transito.fechaFinReal ?? '',
            estadoActual: transito.estadoActual,
            observaciones: transito.observaciones ?? '',
          });
        },
        error: () => {
          this.error = 'Tránsito no encontrado.';
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
    const datos: TransitoRequest = {
      animalId: v.animalId,
      hogarTransitoId: v.hogarTransitoId,
      refugioId: v.refugioId,
      fechaInicio: v.fechaInicio,
      fechaFinEstimada: v.fechaFinEstimada || undefined,
      fechaFinReal: v.fechaFinReal || undefined,
      estadoActual: v.estadoActual,
      observaciones: v.observaciones || undefined,
    };

    const peticion = this.editando && this.transitoId
      ? this.transitoService.actualizar(this.transitoId, datos)
      : this.transitoService.crear(datos);

    peticion.subscribe({
      next: () => {
        this.router.navigate(['/transitos']);
      },
      error: (err) => {
        this.guardando = false;
        this.error = mensajeApiError(err);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/transitos']);
  }
}
