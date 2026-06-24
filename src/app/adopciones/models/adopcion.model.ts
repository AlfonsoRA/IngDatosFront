export interface Adopcion {
  id: number;
  animalId: number;
  animalNombre: string;
  adoptanteId: number;
  adoptanteNombre: string;
  fechaSolicitud: string;
  estadoActual: string;
}

export interface AdopcionRequest {
  animalId: number;
  adoptanteId: number;
  fechaSolicitud: string;
  estadoActual: string;
}

export const ESTADOS_ADOPCION = [
  'Solicitada',
  'En proceso',
  'Aprobada',
  'Rechazada',
  'Concretada',
] as const;

export const ESTADO_ADOPCION_LABELS: Record<string, string> = {
  Solicitada: 'Solicitada',
  'En proceso': 'En proceso',
  Aprobada: 'Aprobada',
  Rechazada: 'Rechazada',
  Concretada: 'Concretada',
};
