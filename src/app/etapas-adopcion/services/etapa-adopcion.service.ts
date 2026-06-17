import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EtapaAdopcion, EtapaAdopcionRequest } from '../models/etapa-adopcion.model';

const URL = `${environment.apiUrl}/etapas-adopcion`;

@Injectable({ providedIn: 'root' })
export class EtapaAdopcionService {
  constructor(private http: HttpClient) {}

  listar(adopcionId?: number): Observable<EtapaAdopcion[]> {
    let params = new HttpParams();
    if (adopcionId != null) {
      params = params.set('adopcionId', adopcionId);
    }
    return this.http.get<EtapaAdopcion[]>(URL, { params });
  }

  obtener(id: number): Observable<EtapaAdopcion> {
    return this.http.get<EtapaAdopcion>(`${URL}/${id}`);
  }

  crear(data: EtapaAdopcionRequest): Observable<EtapaAdopcion> {
    return this.http.post<EtapaAdopcion>(URL, data);
  }

  actualizar(id: number, data: EtapaAdopcionRequest): Observable<EtapaAdopcion> {
    return this.http.put<EtapaAdopcion>(`${URL}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`);
  }
}
