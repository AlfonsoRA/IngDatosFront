import { Direccion } from '../../shared/models/direccion.model';

export interface Adoptante {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  adoptantePrevio?: boolean;
  direccion: Direccion;
}

export interface AdoptanteRequest {
  dni: string;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  adoptantePrevio?: boolean;
  direccion: Direccion;
}

export function nombreCompletoAdoptante(a: Adoptante): string {
  return `${a.nombre} ${a.apellido}`;
}
