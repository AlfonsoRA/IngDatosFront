import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Refugio, RefugioRequest } from '../models/refugio.model';

const REFUGIOS_URL = `${environment.apiUrl}/refugios`;

@Injectable({ providedIn: 'root' })
export class RefugioService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Refugio[]> {
    return this.http.get<Refugio[]>(REFUGIOS_URL);
  }

  obtener(id: number): Observable<Refugio> {
    return this.http.get<Refugio>(`${REFUGIOS_URL}/${id}`);
  }

  crear(refugio: RefugioRequest): Observable<Refugio> {
    return this.http.post<Refugio>(REFUGIOS_URL, refugio);
  }

  actualizar(id: number, refugio: RefugioRequest): Observable<Refugio> {
    return this.http.put<Refugio>(`${REFUGIOS_URL}/${id}`, refugio);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${REFUGIOS_URL}/${id}`);
  }
}
