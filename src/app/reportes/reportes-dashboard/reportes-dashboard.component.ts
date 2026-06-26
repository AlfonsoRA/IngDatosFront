import { Component, OnInit } from '@angular/core';
import { ReporteRow, ReporteService } from '../services/reporte.service';
import { etiquetaColumna, formatearValorCelda } from '../../shared/utils/column-label.util';

interface TablaReporte {
  titulo: string;
  filas: ReporteRow[];
  columnas: string[];
  cargando: boolean;
}

@Component({
  selector: 'app-reportes-dashboard',
  templateUrl: './reportes-dashboard.component.html',
  styleUrls: ['./reportes-dashboard.component.scss'],
})
export class ReportesDashboardComponent implements OnInit {
  error = '';

  animalesDisponibles: TablaReporte = {
    titulo: 'Animales disponibles',
    filas: [],
    columnas: [],
    cargando: true,
  };

  refugiosOcupacion: TablaReporte = {
    titulo: 'Ocupación de refugios',
    filas: [],
    columnas: [],
    cargando: true,
  };

  adopcionesDetalle: TablaReporte = {
    titulo: 'Historial de adopciones',
    filas: [],
    columnas: [],
    cargando: true,
  };

  historialMedico: TablaReporte = {
    titulo: 'Historial médico completo',
    filas: [],
    columnas: [],
    cargando: true,
  };

  transitosActivos: TablaReporte = {
    titulo: 'Tránsitos activos',
    filas: [],
    columnas: [],
    cargando: true,
  };

  adopcionesPorMes: TablaReporte = {
    titulo: 'Adopciones concretadas por mes',
    filas: [],
    columnas: [],
    cargando: true,
  };

  trasladosRefugios: TablaReporte = {
    titulo: 'Traslados entre refugios',
    filas: [],
    columnas: [],
    cargando: true,
  };

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.cargarTabla(this.animalesDisponibles, () => this.reporteService.animalesDisponibles());
    this.cargarTabla(this.refugiosOcupacion, () => this.reporteService.refugiosOcupacion());
    this.cargarTabla(this.adopcionesDetalle, () => this.reporteService.adopcionesDetalle());
    this.cargarTabla(this.historialMedico, () => this.reporteService.historialMedicoCompleto());
    this.cargarTabla(this.transitosActivos, () => this.reporteService.transitosActivos());
    this.cargarTabla(this.adopcionesPorMes, () => this.reporteService.adopcionesPorMes());
    this.cargarTabla(this.trasladosRefugios, () => this.reporteService.trasladosRefugios());
  }

  private columnasDesde(filas: ReporteRow[]): string[] {
    if (filas.length === 0) {
      return [];
    }
    return Object.keys(filas[0]);
  }

  private cargarTabla(tabla: TablaReporte, peticion: () => ReturnType<ReporteService['animalesDisponibles']>): void {
    peticion().subscribe({
      next: (data) => {
        tabla.filas = data;
        tabla.columnas = this.columnasDesde(data);
        tabla.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con la API. ¿Está corriendo el backend en el puerto 8080?';
        tabla.cargando = false;
      },
    });
  }

  valorCelda(fila: ReporteRow, columna: string): string {
    return formatearValorCelda(columna, fila[columna]);
  }

  etiquetaColumna = etiquetaColumna;
}
