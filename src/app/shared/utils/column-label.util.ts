/** Etiquetas en español para columnas de reportes SQL (snake_case). */
const COLUMN_LABELS: Record<string, string> = {
  id_animal: 'ID',
  id_refugio: 'ID refugio',
  id_adopcion: 'ID adopción',
  nombre: 'Nombre',
  especie: 'Especie',
  raza: 'Raza',
  edad: 'Edad',
  fecha_ingreso: 'Fecha ingreso',
  es_castrado: 'Castrado',
  refugio_nombre: 'Refugio',
  total_atenciones: 'Atenciones',
  ultima_atencion: 'Última atención',
  ultima_antirrabica: 'Última antirrábica',
  estado_disponibilidad: 'Disponibilidad',
  capacidad: 'Capacidad',
  ocupacion_actual: 'Ocupación',
  cupos_libres: 'Cupos libres',
  en_sobrecupo: 'Sobrecupo',
  estado_actual: 'Estado',
  fecha_solicitud: 'Fecha solicitud',
  animal_nombre: 'Animal',
  adoptante_nombre: 'Adoptante',
  refugio_actual: 'Refugio actual',
};

const ESTADO_LABELS: Record<string, string> = {
  DISPONIBLE: 'Disponible',
  EN_PROCESO: 'En proceso',
  ADOPTADO: 'Adoptado',
  COMPLETADA: 'Completada',
  SOLICITUD: 'Solicitud',
  RECHAZADA: 'Rechazada',
  ACTIVO: 'Activo',
  FINALIZADO: 'Finalizado',
  CANCELADO: 'Cancelado',
};

export function etiquetaColumna(columna: string): string {
  const key = columna.toLowerCase();
  if (COLUMN_LABELS[key]) {
    return COLUMN_LABELS[key];
  }
  return columna
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatearValorCelda(columna: string, valor: unknown): string {
  if (valor == null || valor === '') {
    return '—';
  }

  const key = columna.toLowerCase();

  if (typeof valor === 'boolean') {
    return valor ? 'Sí' : 'No';
  }

  if (key === 'en_sobrecupo' && (valor === 1 || valor === '1' || valor === true)) {
    return 'Sí';
  }
  if (key === 'en_sobrecupo' && (valor === 0 || valor === '0' || valor === false)) {
    return 'No';
  }

  if (key === 'es_castrado' && (valor === 1 || valor === '1')) {
    return 'Sí';
  }
  if (key === 'es_castrado' && (valor === 0 || valor === '0')) {
    return 'No';
  }

  if (key.includes('estado') && typeof valor === 'string') {
    return ESTADO_LABELS[valor] ?? valor.replace(/_/g, ' ').toLowerCase();
  }

  if (typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}/.test(valor)) {
    return valor.substring(0, 10);
  }

  return String(valor);
}
