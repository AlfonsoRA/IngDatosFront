export interface HistorialMedico {
  id: number;
  animalId: number;
  animalNombre: string;
  nombreVeterinaria?: string;
  observacion?: string;
  medicamento?: string;
  diagnostico?: string;
  tipoIntervencion: string;
  fecha: string;
  tipoVacuna?: string;
  fechaVencimiento?: string;
}

export interface HistorialMedicoRequest {
  animalId: number;
  nombreVeterinaria?: string;
  observacion?: string;
  medicamento?: string;
  diagnostico?: string;
  tipoIntervencion: string;
  fecha: string;
  tipoVacuna?: string;
  fechaVencimiento?: string;
}

export const TIPOS_VACUNA = ['Antirrábica', 'Sextuple', 'Triple felina', 'Otra'] as const;
