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
    titulo: 'Detalle de adopciones',
    filas: [],
    columnas: [],
    cargando: true,
  };

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.cargarAnimalesDisponibles();
    this.cargarRefugiosOcupacion();
    this.cargarAdopcionesDetalle();
  }

  private columnasDesde(filas: ReporteRow[]): string[] {
    if (filas.length === 0) {
      return [];
    }
    return Object.keys(filas[0]);
  }

  private cargarAnimalesDisponibles(): void {
    this.reporteService.animalesDisponibles().subscribe({
      next: (data) => {
        this.animalesDisponibles.filas = data;
        this.animalesDisponibles.columnas = this.columnasDesde(data);
        this.animalesDisponibles.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con la API. ¿Está corriendo el backend en el puerto 8080?';
        this.animalesDisponibles.cargando = false;
      },
    });
  }

  private cargarRefugiosOcupacion(): void {
    this.reporteService.refugiosOcupacion().subscribe({
      next: (data) => {
        this.refugiosOcupacion.filas = data;
        this.refugiosOcupacion.columnas = this.columnasDesde(data);
        this.refugiosOcupacion.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con la API. ¿Está corriendo el backend en el puerto 8080?';
        this.refugiosOcupacion.cargando = false;
      },
    });
  }

  private cargarAdopcionesDetalle(): void {
    this.reporteService.adopcionesDetalle().subscribe({
      next: (data) => {
        this.adopcionesDetalle.filas = data;
        this.adopcionesDetalle.columnas = this.columnasDesde(data);
        this.adopcionesDetalle.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con la API. ¿Está corriendo el backend en el puerto 8080?';
        this.adopcionesDetalle.cargando = false;
      },
    });
  }

  valorCelda(fila: ReporteRow, columna: string): string {
    return formatearValorCelda(columna, fila[columna]);
  }

  etiquetaColumna = etiquetaColumna;
}
