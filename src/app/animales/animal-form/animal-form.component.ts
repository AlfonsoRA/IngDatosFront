import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalRequest } from '../models/animal.model';
import { AnimalService } from '../services/animal.service';
import { Refugio } from '../../refugios/models/refugio.model';
import { RefugioService } from '../../refugios/services/refugio.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
})
export class AnimalFormComponent implements OnInit {
  form!: FormGroup;
  editando = false;
  animalId?: number;
  guardando = false;
  error = '';
  refugios: Refugio[] = [];

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private refugioService: RefugioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(120)]],
      especie: ['', [Validators.required, Validators.maxLength(50)]],
      raza: ['', [Validators.maxLength(80)]],
      edad: [null, [Validators.min(0)]],
      fechaIngreso: ['', Validators.required],
      esCastrado: [false],
      refugioId: [null, Validators.required],
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
      this.animalId = +idParam;
      this.animalService.obtener(this.animalId).subscribe({
        next: (animal) => {
          this.form.patchValue({
            nombre: animal.nombre,
            especie: animal.especie,
            raza: animal.raza ?? '',
            edad: animal.edad,
            fechaIngreso: animal.fechaIngreso,
            esCastrado: animal.esCastrado,
            refugioId: animal.refugioId,
          });
        },
        error: () => {
          this.error = 'Animal no encontrado.';
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
    const datos: AnimalRequest = {
      nombre: v.nombre,
      especie: v.especie,
      raza: v.raza || undefined,
      edad: v.edad != null && v.edad !== '' ? Number(v.edad) : undefined,
      fechaIngreso: v.fechaIngreso,
      esCastrado: !!v.esCastrado,
      refugioId: v.refugioId,
    };

    const peticion = this.editando && this.animalId
      ? this.animalService.actualizar(this.animalId, datos)
      : this.animalService.crear(datos);

    peticion.subscribe({
      next: () => {
        this.router.navigate(['/animales']);
      },
      error: (err) => {
        this.guardando = false;
        this.error = mensajeApiError(err);
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/animales']);
  }
}
