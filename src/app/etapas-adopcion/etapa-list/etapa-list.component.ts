import { Component, OnInit } from '@angular/core';
import { EtapaAdopcion } from '../models/etapa-adopcion.model';
import { EtapaAdopcionService } from '../services/etapa-adopcion.service';
import { Adopcion } from '../../adopciones/models/adopcion.model';
import { AdopcionService } from '../../adopciones/services/adopcion.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-etapa-list',
  templateUrl: './etapa-list.component.html',
  styleUrls: ['./etapa-list.component.scss'],
})
export class EtapaListComponent implements OnInit {
  etapas: EtapaAdopcion[] = [];
  adopciones: Adopcion[] = [];
  cargando = true;
  error = '';
  eliminandoId: number | null = null;

  filtroAdopcionId: number | null = null;

  constructor(
    private etapaService: EtapaAdopcionService,
    private adopcionService: AdopcionService
  ) {}

  ngOnInit(): void {
    this.adopcionService.listar().subscribe({
      next: (data) => {
        this.adopciones = data;
      },
    });
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.etapaService.listar(this.filtroAdopcionId ?? undefined).subscribe({
      next: (data) => {
        this.etapas = data;
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
    this.filtroAdopcionId = null;
    this.cargar();
  }

  confirmarEliminar(etapa: EtapaAdopcion): void {
    if (!confirm(`¿Eliminar la etapa #${etapa.id}?`)) {
      return;
    }
    this.eliminandoId = etapa.id;
    this.etapaService.eliminar(etapa.id).subscribe({
      next: () => {
        this.etapas = this.etapas.filter((e) => e.id !== etapa.id);
        this.eliminandoId = null;
      },
      error: (err) => {
        this.error = mensajeApiError(err);
        this.eliminandoId = null;
      },
    });
  }
}
