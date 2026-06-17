import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HogarTransito, HogarTransitoRequest } from '../models/hogar-transito.model';

const URL = `${environment.apiUrl}/hogares-transito`;

@Injectable({ providedIn: 'root' })
export class HogarTransitoService {
  constructor(private http: HttpClient) {}

  listar(): Observable<HogarTransito[]> {
    return this.http.get<HogarTransito[]>(URL);
  }

  obtener(id: number): Observable<HogarTransito> {
    return this.http.get<HogarTransito>(`${URL}/${id}`);
  }

  crear(data: HogarTransitoRequest): Observable<HogarTransito> {
    return this.http.post<HogarTransito>(URL, data);
  }

  actualizar(id: number, data: HogarTransitoRequest): Observable<HogarTransito> {
    return this.http.put<HogarTransito>(`${URL}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`);
  }
}
