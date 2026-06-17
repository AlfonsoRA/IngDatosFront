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

export const ESTADOS_ADOPCION = ['SOLICITUD', 'EN_PROCESO', 'COMPLETADA', 'RECHAZADA'] as const;

export const ESTADO_ADOPCION_LABELS: Record<string, string> = {
  SOLICITUD: 'Solicitud',
  EN_PROCESO: 'En proceso',
  COMPLETADA: 'Completada',
  RECHAZADA: 'Rechazada',
};
