export interface UbicacionAnimal {
  id: number;
  animalId: number;
  animalNombre: string;
  refugioId: number;
  refugioNombre: string;
  fechaIngreso: string;
  motivoTraslado?: string;
  fechaSalida?: string;
  esActual?: boolean;
}
