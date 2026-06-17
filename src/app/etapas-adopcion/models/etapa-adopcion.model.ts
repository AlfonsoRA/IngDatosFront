export interface EtapaAdopcion {
  id: number;
  adopcionId: number;
  refugioId: number;
  refugioNombre: string;
  fechaInicio: string;
  fechaFin?: string;
  observaciones?: string;
}

export interface EtapaAdopcionRequest {
  adopcionId: number;
  refugioId: number;
  fechaInicio: string;
  fechaFin?: string;
  observaciones?: string;
}
