export interface Transito {
  id: number;
  animalId: number;
  animalNombre: string;
  hogarTransitoId: number;
  hogarTransitoNombre: string;
  refugioId: number;
  refugioNombre: string;
  fechaInicio: string;
  fechaFinEstimada?: string;
  fechaFinReal?: string;
  estadoActual: string;
  observaciones?: string;
}

export interface TransitoRequest {
  animalId: number;
  hogarTransitoId: number;
  refugioId: number;
  fechaInicio: string;
  fechaFinEstimada?: string;
  fechaFinReal?: string;
  estadoActual: string;
  observaciones?: string;
}

export const ESTADOS_TRANSITO = ['En tránsito', 'Finalizado', 'Cancelado'] as const;

export const ESTADO_TRANSITO_LABELS: Record<string, string> = {
  'En tránsito': 'En tránsito',
  Finalizado: 'Finalizado',
  Cancelado: 'Cancelado',
};
