import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Adoptante, AdoptanteRequest } from '../models/adoptante.model';

const URL = `${environment.apiUrl}/adoptantes`;

@Injectable({ providedIn: 'root' })
export class AdoptanteService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Adoptante[]> {
    return this.http.get<Adoptante[]>(URL);
  }

  obtener(id: number): Observable<Adoptante> {
    return this.http.get<Adoptante>(`${URL}/${id}`);
  }

  crear(data: AdoptanteRequest): Observable<Adoptante> {
    return this.http.post<Adoptante>(URL, data);
  }

  actualizar(id: number, data: AdoptanteRequest): Observable<Adoptante> {
    return this.http.put<Adoptante>(`${URL}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`);
  }
}
