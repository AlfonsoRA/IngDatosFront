import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UbicacionAnimal } from '../models/ubicacion-animal.model';

const URL = `${environment.apiUrl}/ubicaciones-animal`;

@Injectable({ providedIn: 'root' })
export class UbicacionAnimalService {
  constructor(private http: HttpClient) {}

  listar(animalId?: number): Observable<UbicacionAnimal[]> {
    let params = new HttpParams();
    if (animalId != null) {
      params = params.set('animalId', animalId);
    }
    return this.http.get<UbicacionAnimal[]>(URL, { params });
  }

  obtener(id: number): Observable<UbicacionAnimal> {
    return this.http.get<UbicacionAnimal>(`${URL}/${id}`);
  }
}
