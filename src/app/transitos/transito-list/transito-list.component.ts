import { Component, OnInit } from '@angular/core';
import {
  Transito,
  ESTADO_TRANSITO_LABELS,
  ESTADOS_TRANSITO,
} from '../models/transito.model';
import { TransitoService } from '../services/transito.service';
import { Animal } from '../../animales/models/animal.model';
import { AnimalService } from '../../animales/services/animal.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-transito-list',
  templateUrl: './transito-list.component.html',
  styleUrls: ['./transito-list.component.scss'],
})
export class TransitoListComponent implements OnInit {
  transitos: Transito[] = [];
  animales: Animal[] = [];
  cargando = true;
  error = '';
  eliminandoId: number | null = null;

  filtroEstado = '';
  filtroAnimalId: number | null = null;

  readonly estados = ESTADOS_TRANSITO;
  readonly estadoLabels = ESTADO_TRANSITO_LABELS;

  constructor(
    private transitoService: TransitoService,
    private animalService: AnimalService
  ) {}

  ngOnInit(): void {
    this.animalService.listar().subscribe({
      next: (data) => {
        this.animales = data;
      },
    });
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.transitoService
      .listar({
        estado: this.filtroEstado || undefined,
        animalId: this.filtroAnimalId ?? undefined,
      })
      .subscribe({
        next: (data) => {
          this.transitos = data;
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
    this.filtroEstado = '';
    this.filtroAnimalId = null;
    this.cargar();
  }

  etiquetaEstado(estado: string): string {
    return ESTADO_TRANSITO_LABELS[estado] ?? estado;
  }

  confirmarEliminar(transito: Transito): void {
    if (!confirm(`¿Eliminar el tránsito #${transito.id}?`)) {
      return;
    }
    this.eliminandoId = transito.id;
    this.transitoService.eliminar(transito.id).subscribe({
      next: () => {
        this.transitos = this.transitos.filter((t) => t.id !== transito.id);
        this.eliminandoId = null;
      },
      error: (err) => {
        this.error = mensajeApiError(err);
        this.eliminandoId = null;
      },
    });
  }
}
