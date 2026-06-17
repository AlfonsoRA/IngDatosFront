import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialMedicoRequest } from '../models/historial-medico.model';
import { HistorialMedicoService } from '../services/historial-medico.service';
import { Animal } from '../../animales/models/animal.model';
import { AnimalService } from '../../animales/services/animal.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-historial-form',
  templateUrl: './historial-form.component.html',
  styleUrls: ['./historial-form.component.scss'],
})
export class HistorialFormComponent implements OnInit {
  form!: FormGroup;
  editando = false;
  historialId?: number;
  guardando = false;
  error = '';
  animales: Animal[] = [];

  constructor(
    private fb: FormBuilder,
    private historialService: HistorialMedicoService,
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      animalId: [null, Validators.required],
      nombreVeterinaria: ['', Validators.maxLength(120)],
      observacion: ['', Validators.maxLength(500)],
      medicamento: ['', Validators.maxLength(200)],
      diagnostico: ['', Validators.maxLength(500)],
      tipoIntervencion: ['', Validators.maxLength(120)],
      fecha: ['', Validators.required],
      antirrabicaAnual: [false],
      sextupleAnual: [false],
      tripleAnual: [false],
    });

    this.animalService.listar().subscribe({
      next: (data) => {
        this.animales = data;
      },
      error: () => {
        this.error = 'No se pudieron cargar los animales.';
      },
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    const animalIdQuery = this.route.snapshot.queryParamMap.get('animalId');
    if (animalIdQuery && !idParam) {
      this.form.patchValue({ animalId: +animalIdQuery });
    }
    if (idParam) {
      this.editando = true;
      this.historialId = +idParam;
      this.historialService.obtener(this.historialId).subscribe({
        next: (registro) => {
          this.form.patchValue({
            animalId: registro.animalId,
            nombreVeterinaria: registro.nombreVeterinaria ?? '',
            observacion: registro.observacion ?? '',
            medicamento: registro.medicamento ?? '',
            diagnostico: registro.diagnostico ?? '',
            tipoIntervencion: registro.tipoIntervencion ?? '',
            fecha: registro.fecha,
            antirrabicaAnual: registro.antirrabicaAnual ?? false,
            sextupleAnual: registro.sextupleAnual ?? false,
            tripleAnual: registro.tripleAnual ?? false,
          });
        },
        error: () => {
          this.error = 'Registro no encontrado.';
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
    const datos: HistorialMedicoRequest = {
      animalId: v.animalId,
      nombreVeterinaria: v.nombreVeterinaria || undefined,
      observacion: v.observacion || undefined,
      medicamento: v.medicamento || undefined,
      diagnostico: v.diagnostico || undefined,
      tipoIntervencion: v.tipoIntervencion || undefined,
      fecha: v.fecha,
      antirrabicaAnual: !!v.antirrabicaAnual,
      sextupleAnual: !!v.sextupleAnual,
      tripleAnual: !!v.tripleAnual,
    };

    const peticion = this.editando && this.historialId
      ? this.historialService.actualizar(this.historialId, datos)
      : this.historialService.crear(datos);

    peticion.subscribe({
      next: () => {
        this.router.navigate(['/historial-medico']);
      },
      error: (err) => {
        this.guardando = false;
        this.error = mensajeApiError(err);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/historial-medico']);
  }
}
