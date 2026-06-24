import { Direccion } from '../../shared/models/direccion.model';

export interface Refugio {
  id: number;
  nombre: string;
  email?: string;
  telefono?: string;
  capacidad?: number;
  capacidadMaxima?: number;
  responsable: string;
  direccion?: Direccion;
  domicilio?: string;
}

export interface RefugioRequest {
  nombre: string;
  email?: string;
  telefono?: string;
  capacidad?: number;
  capacidadMaxima?: number;
  responsable: string;
  direccion?: Direccion;
  /** Compatibilidad: el back lo convierte en direccion si no hay objeto completo */
  domicilio?: string;
}

export function capacidadRefugio(r: Refugio): number {
  return r.capacidad ?? r.capacidadMaxima ?? 0;
}

export function domicilioRefugio(r: Refugio): string {
  if (r.domicilio) {
    return r.domicilio;
  }
  if (r.direccion) {
    const d = r.direccion;
    const num = d.numero ? ` ${d.numero}` : '';
    const partido = d.partido ? ` (${d.partido})` : '';
    const cp = d.cp ? ` — CP ${d.cp}` : '';
    return `${d.calle}${num}, ${d.localidad}${partido}${cp}`;
  }
  return '—';
}
