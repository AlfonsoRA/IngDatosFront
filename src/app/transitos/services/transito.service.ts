import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transito, TransitoRequest } from '../models/transito.model';

const URL = `${environment.apiUrl}/transitos`;

@Injectable({ providedIn: 'root' })
export class TransitoService {
  constructor(private http: HttpClient) {}

  listar(filtros?: { estado?: string; animalId?: number }): Observable<Transito[]> {
    let params = new HttpParams();
    if (filtros?.estado?.trim()) {
      params = params.set('estado', filtros.estado.trim());
    }
    if (filtros?.animalId != null) {
      params = params.set('animalId', filtros.animalId);
    }
    return this.http.get<Transito[]>(URL, { params });
  }

  obtener(id: number): Observable<Transito> {
    return this.http.get<Transito>(`${URL}/${id}`);
  }

  crear(data: TransitoRequest): Observable<Transito> {
    return this.http.post<Transito>(URL, data);
  }

  actualizar(id: number, data: TransitoRequest): Observable<Transito> {
    return this.http.put<Transito>(`${URL}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`);
  }
}
