export enum EstadoDisponibilidad {
  DISPONIBLE = 'DISPONIBLE',
  EN_PROCESO = 'EN_PROCESO',
  ADOPTADO = 'ADOPTADO',
}

export const ESTADO_DISPONIBILIDAD_LABELS: Record<EstadoDisponibilidad, string> = {
  [EstadoDisponibilidad.DISPONIBLE]: 'Disponible',
  [EstadoDisponibilidad.EN_PROCESO]: 'En proceso de adopción',
  [EstadoDisponibilidad.ADOPTADO]: 'Adoptado',
};

export interface Animal {
  id: number;
  nombre: string;
  especie: string;
  raza?: string;
  edad?: number;
  fechaIngreso: string;
  esCastrado: boolean;
  refugioId: number;
  refugioNombre: string;
  estadoDisponibilidad: EstadoDisponibilidad | string;
}

export interface AnimalRequest {
  nombre: string;
  especie: string;
  raza?: string;
  edad?: number;
  fechaIngreso: string;
  esCastrado?: boolean;
  refugioId: number;
}

export interface AnimalFiltros {
  refugioId?: number;
  especie?: string;
  estadoDisponibilidad?: EstadoDisponibilidad | string;
}
