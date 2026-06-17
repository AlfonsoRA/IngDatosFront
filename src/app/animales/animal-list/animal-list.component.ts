import { Component, OnInit } from '@angular/core';
import {
  Animal,
  ESTADO_DISPONIBILIDAD_LABELS,
  EstadoDisponibilidad,
} from '../models/animal.model';
import { AnimalService } from '../services/animal.service';
import { Refugio } from '../../refugios/models/refugio.model';
import { RefugioService } from '../../refugios/services/refugio.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
})
export class AnimalListComponent implements OnInit {
  animales: Animal[] = [];
  refugios: Refugio[] = [];
  cargando = true;
  error = '';
  eliminandoId: number | null = null;

  filtroRefugioId: number | null = null;
  filtroEspecie = '';
  filtroEstado: EstadoDisponibilidad | '' = '';

  readonly estados = Object.values(EstadoDisponibilidad);
  readonly estadoLabels = ESTADO_DISPONIBILIDAD_LABELS;

  constructor(
    private animalService: AnimalService,
    private refugioService: RefugioService
  ) {}

  ngOnInit(): void {
    this.refugioService.listar().subscribe({
      next: (data) => {
        this.refugios = data;
      },
    });
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    const filtros = {
      refugioId: this.filtroRefugioId ?? undefined,
      especie: this.filtroEspecie || undefined,
      estadoDisponibilidad: this.filtroEstado || undefined,
    };
    this.animalService.listar(filtros).subscribe({
      next: (data) => {
        this.animales = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con la API. ¿Está corriendo el backend en el puerto 8080?';
        this.cargando = false;
      },
    });
  }

  aplicarFiltros(): void {
    this.cargar();
  }

  limpiarFiltros(): void {
    this.filtroRefugioId = null;
    this.filtroEspecie = '';
    this.filtroEstado = '';
    this.cargar();
  }

  etiquetaEstado(estado: string): string {
    return ESTADO_DISPONIBILIDAD_LABELS[estado as EstadoDisponibilidad] ?? estado;
  }

  claseBadge(estado: string): string {
    return 'badge--' + estado.toLowerCase();
  }

  confirmarEliminar(animal: Animal): void {
    if (!confirm(`¿Eliminar la ficha de "${animal.nombre}"?`)) {
      return;
    }
    this.eliminandoId = animal.id;
    this.animalService.eliminar(animal.id).subscribe({
      next: () => {
        this.animales = this.animales.filter((a) => a.id !== animal.id);
        this.eliminandoId = null;
      },
      error: (err) => {
        this.error = mensajeApiError(err);
        this.eliminandoId = null;
      },
    });
  }
}
