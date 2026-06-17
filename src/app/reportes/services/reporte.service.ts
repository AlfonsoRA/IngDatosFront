import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type ReporteRow = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class ReporteService {
  constructor(private http: HttpClient) {}

  animalesDisponibles(): Observable<ReporteRow[]> {
    return this.http.get<ReporteRow[]>(`${environment.apiUrl}/reportes/animales-disponibles`);
  }

  refugiosOcupacion(): Observable<ReporteRow[]> {
    return this.http.get<ReporteRow[]>(`${environment.apiUrl}/reportes/refugios-ocupacion`);
  }

  adopcionesDetalle(): Observable<ReporteRow[]> {
    return this.http.get<ReporteRow[]>(`${environment.apiUrl}/reportes/adopciones-detalle`);
  }
}
