import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HistorialMedico, HistorialMedicoRequest } from '../models/historial-medico.model';

const URL = `${environment.apiUrl}/historial-medico`;

@Injectable({ providedIn: 'root' })
export class HistorialMedicoService {
  constructor(private http: HttpClient) {}

  listar(animalId?: number): Observable<HistorialMedico[]> {
    let params = new HttpParams();
    if (animalId != null) {
      params = params.set('animalId', animalId);
    }
    return this.http.get<HistorialMedico[]>(URL, { params });
  }

  obtener(id: number): Observable<HistorialMedico> {
    return this.http.get<HistorialMedico>(`${URL}/${id}`);
  }

  crear(data: HistorialMedicoRequest): Observable<HistorialMedico> {
    return this.http.post<HistorialMedico>(URL, data);
  }

  actualizar(id: number, data: HistorialMedicoRequest): Observable<HistorialMedico> {
    return this.http.put<HistorialMedico>(`${URL}/${id}`, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`);
  }
}
