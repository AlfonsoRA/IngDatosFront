import { ESTADOS_ADOPCION } from '../../adopciones/models/adopcion.model';

export interface EtapaAdopcion {
  id: number;
  adopcionId: number;
  refugioId: number;
  refugioNombre: string;
  estado: string;
  fechaInicio: string;
  fechaFin?: string;
  observaciones?: string;
}

export interface EtapaAdopcionRequest {
  adopcionId: number;
  refugioId: number;
  estado: string;
  fechaInicio: string;
  fechaFin?: string;
  observaciones?: string;
}

export const ESTADOS_ETAPA = ESTADOS_ADOPCION;
