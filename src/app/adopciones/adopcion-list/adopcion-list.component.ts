import { Component, OnInit } from '@angular/core';
import {
  Adopcion,
  ESTADO_ADOPCION_LABELS,
  ESTADOS_ADOPCION,
} from '../models/adopcion.model';
import { AdopcionService } from '../services/adopcion.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-adopcion-list',
  templateUrl: './adopcion-list.component.html',
  styleUrls: ['./adopcion-list.component.scss'],
})
export class AdopcionListComponent implements OnInit {
  adopciones: Adopcion[] = [];
  cargando = true;
  error = '';
  eliminandoId: number | null = null;

  filtroEstado = '';

  readonly estados = ESTADOS_ADOPCION;
  readonly estadoLabels = ESTADO_ADOPCION_LABELS;

  constructor(private adopcionService: AdopcionService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.adopcionService.listar(this.filtroEstado || undefined).subscribe({
      next: (data) => {
        this.adopciones = data;
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
    this.cargar();
  }

  etiquetaEstado(estado: string): string {
    return ESTADO_ADOPCION_LABELS[estado] ?? estado;
  }

  confirmarEliminar(adopcion: Adopcion): void {
    if (!confirm(`¿Eliminar la adopción #${adopcion.id}?`)) {
      return;
    }
    this.eliminandoId = adopcion.id;
    this.adopcionService.eliminar(adopcion.id).subscribe({
      next: () => {
        this.adopciones = this.adopciones.filter((a) => a.id !== adopcion.id);
        this.eliminandoId = null;
      },
      error: (err) => {
        this.error = mensajeApiError(err);
        this.eliminandoId = null;
      },
    });
  }
}
