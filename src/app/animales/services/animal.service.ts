import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Animal, AnimalFiltros, AnimalRequest } from '../models/animal.model';

const ANIMALES_URL = `${environment.apiUrl}/animales`;

@Injectable({ providedIn: 'root' })
export class AnimalService {
  constructor(private http: HttpClient) {}

  listar(filtros?: AnimalFiltros): Observable<Animal[]> {
    let params = new HttpParams();
    if (filtros?.refugioId != null) {
      params = params.set('refugioId', filtros.refugioId);
    }
    if (filtros?.especie?.trim()) {
      params = params.set('especie', filtros.especie.trim());
    }
    if (filtros?.estadoDisponibilidad) {
      params = params.set('estadoDisponibilidad', filtros.estadoDisponibilidad);
    }
    return this.http.get<Animal[]>(ANIMALES_URL, { params });
  }

  obtener(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${ANIMALES_URL}/${id}`);
  }

  crear(animal: AnimalRequest): Observable<Animal> {
    return this.http.post<Animal>(ANIMALES_URL, animal);
  }

  actualizar(id: number, animal: AnimalRequest): Observable<Animal> {
    return this.http.put<Animal>(`${ANIMALES_URL}/${id}`, animal);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${ANIMALES_URL}/${id}`);
  }
}
