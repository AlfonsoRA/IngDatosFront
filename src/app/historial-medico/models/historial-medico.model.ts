export interface HistorialMedico {
  id: number;
  animalId: number;
  animalNombre: string;
  nombreVeterinaria?: string;
  observacion?: string;
  medicamento?: string;
  diagnostico?: string;
  tipoIntervencion?: string;
  fecha: string;
  antirrabicaAnual?: boolean;
  sextupleAnual?: boolean;
  tripleAnual?: boolean;
}

export interface HistorialMedicoRequest {
  animalId: number;
  nombreVeterinaria?: string;
  observacion?: string;
  medicamento?: string;
  diagnostico?: string;
  tipoIntervencion?: string;
  fecha: string;
  antirrabicaAnual?: boolean;
  sextupleAnual?: boolean;
  tripleAnual?: boolean;
}
