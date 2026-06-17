import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Adopcion, AdopcionRequest } from '../models/adopcion.model';

const URL = `${environment.apiUrl}/adopciones`;

@Injectable({ providedIn: 'root' })
export class AdopcionService {
  constructor(private http: HttpClient) {}

  listar(estado?: string): Observable<Adopcion[]> {
    let params = new HttpParams();
    if (estado?.trim()) {
      params = params.set('estado', estado.trim());
    }
    return this.http.get<Adopcion[]>(URL, { params });
  }

  obtener(id: number): Observable<Adopcion> {
    return this.http.get<Adopcion>(`${URL}/${id}`);
  }

  crear(data: AdopcionRequest): Observable<Adopcion> {
    return this.http.post<Adopcion>(URL, data);
  }

  actualizar(id: number, data: AdopcionRequest): Observable<Adopcion> {
    return this.http.put<Adopcion>(`${URL}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`);
  }
}
