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

export const ESTADOS_ANIMAL = ['En refugio', 'En tránsito', 'Adoptado'] as const;

export const SEXO_ANIMAL = ['M', 'F'] as const;

export const SEXO_LABELS: Record<string, string> = {
  M: 'Macho',
  F: 'Hembra',
};

export interface Animal {
  id: number;
  nombre: string;
  especie: string;
  raza?: string;
  edad?: number;
  fechaNacimientoEstimada?: string;
  sexo?: string;
  estado?: string;
  fechaIngreso: string;
  esCastrado: boolean;
  refugioId?: number;
  refugioNombre?: string;
  estadoDisponibilidad: EstadoDisponibilidad | string;
}

export interface AnimalRequest {
  nombre: string;
  especie: string;
  raza?: string;
  edad?: number;
  fechaNacimientoEstimada?: string;
  sexo?: string;
  fechaIngreso: string;
  esCastrado?: boolean;
  refugioId: number;
}

export interface AnimalFiltros {
  refugioId?: number;
  especie?: string;
  estadoDisponibilidad?: EstadoDisponibilidad | string;
}

export function etiquetaSexo(sexo?: string): string {
  if (!sexo) return '—';
  return SEXO_LABELS[sexo] ?? sexo;
}

export function claseBadgeEstado(valor: string): string {
  return 'badge--' + valor
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}
