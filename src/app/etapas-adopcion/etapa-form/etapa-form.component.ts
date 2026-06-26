import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ESTADOS_ETAPA,
  EtapaAdopcionRequest,
} from '../models/etapa-adopcion.model';
import { EtapaAdopcionService } from '../services/etapa-adopcion.service';
import { Adopcion, ESTADO_ADOPCION_LABELS } from '../../adopciones/models/adopcion.model';
import { AdopcionService } from '../../adopciones/services/adopcion.service';
import { Refugio } from '../../refugios/models/refugio.model';
import { RefugioService } from '../../refugios/services/refugio.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-etapa-form',
  templateUrl: './etapa-form.component.html',
  styleUrls: ['./etapa-form.component.scss'],
})
export class EtapaFormComponent implements OnInit {
  form!: FormGroup;
  editando = false;
  etapaId?: number;
  guardando = false;
  error = '';
  adopciones: Adopcion[] = [];
  refugios: Refugio[] = [];

  readonly estados = ESTADOS_ETAPA;
  readonly estadoLabels = ESTADO_ADOPCION_LABELS;

  constructor(
    private fb: FormBuilder,
    private etapaService: EtapaAdopcionService,
    private adopcionService: AdopcionService,
    private refugioService: RefugioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      adopcionId: [null, Validators.required],
      refugioId: [null, Validators.required],
      estado: ['Solicitada', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: [''],
      observaciones: ['', Validators.maxLength(200)],
    });

    this.adopcionService.listar().subscribe({
      next: (data) => {
        this.adopciones = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar las adopciones.';
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
      this.etapaId = +idParam;
      this.etapaService.obtener(this.etapaId).subscribe({
        next: (etapa) => {
          this.form.patchValue({
            adopcionId: etapa.adopcionId,
            refugioId: etapa.refugioId,
            estado: etapa.estado,
            fechaInicio: etapa.fechaInicio,
            fechaFin: etapa.fechaFin ?? '',
            observaciones: etapa.observaciones ?? '',
          });
        },
        error: () => {
          this.error = 'Etapa no encontrada.';
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
    const datos: EtapaAdopcionRequest = {
      adopcionId: v.adopcionId,
      refugioId: v.refugioId,
      estado: v.estado,
      fechaInicio: v.fechaInicio,
      fechaFin: v.fechaFin || undefined,
      observaciones: v.observaciones || undefined,
    };

    const peticion = this.editando && this.etapaId
      ? this.etapaService.actualizar(this.etapaId, datos)
      : this.etapaService.crear(datos);

    peticion.subscribe({
      next: () => {
        this.router.navigate(['/etapas-adopcion']);
      },
      error: (err) => {
        this.guardando = false;
        this.error = mensajeApiError(err);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/etapas-adopcion']);
  }
}
