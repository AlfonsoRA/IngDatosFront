import { Direccion } from '../../shared/models/direccion.model';

export interface HogarTransito {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  capacidadMaxima: number;
  tieneGatos?: boolean;
  tienePerros?: boolean;
  direccion: Direccion;
}

export interface HogarTransitoRequest {
  dni: string;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  capacidadMaxima: number;
  tieneGatos?: boolean;
  tienePerros?: boolean;
  direccion: Direccion;
}

export function nombreCompletoHogar(h: HogarTransito): string {
  return `${h.nombre} ${h.apellido}`;
}
