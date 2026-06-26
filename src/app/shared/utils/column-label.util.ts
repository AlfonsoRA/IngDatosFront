/** Etiquetas en español para columnas de reportes SQL (snake_case). */
const COLUMN_LABELS: Record<string, string> = {
  id_animal: 'ID animal',
  id_refugio: 'ID refugio',
  id_adopcion: 'ID adopción',
  id_historial_medico: 'ID registro',
  nombre: 'Nombre',
  animal: 'Animal',
  especie: 'Especie',
  raza: 'Raza',
  sexo: 'Sexo',
  edad: 'Edad',
  fecha_ingreso: 'Fecha ingreso',
  ingreso_sistema: 'Ingreso sistema',
  fecha_nacimiento_estimada: 'Nacimiento est.',
  es_castrado: 'Castrado',
  castrado: 'Castrado',
  estado: 'Estado',
  refugio: 'Refugio',
  refugio_actual: 'Refugio actual',
  refugio_nombre: 'Refugio',
  telefono_refugio: 'Tel. refugio',
  dias_en_sistema: 'Días en sistema',
  responsable: 'Responsable',
  telefono: 'Teléfono',
  capacidad: 'Capacidad',
  capacidad_maxima: 'Capacidad máx.',
  animales_actuales: 'Animales actuales',
  lugares_disponibles: 'Lugares disponibles',
  porcentaje_ocupacion: '% ocupación',
  ocupacion_actual: 'Ocupación',
  cupos_libres: 'Cupos libres',
  en_sobrecupo: 'Sobrecupo',
  estado_actual: 'Estado',
  estado_adopcion: 'Estado adopción',
  fecha_solicitud: 'Fecha solicitud',
  animal_nombre: 'Animal',
  adoptante: 'Adoptante',
  adoptante_nombre: 'Adoptante',
  dni_adoptante: 'DNI adoptante',
  tel_adoptante: 'Tel. adoptante',
  adoptante_previo: 'Adoptante previo',
  cantidad_etapas: 'Etapas',
  ultima_actualizacion: 'Última actualización',
  fecha_atencion: 'Fecha atención',
  tipo_intervencion: 'Intervención',
  diagnostico: 'Diagnóstico',
  medicamento: 'Medicamento',
  nombre_veterinaria: 'Veterinaria',
  tipo_vacuna: 'Vacuna',
  vencimiento_vacuna: 'Vencimiento vacuna',
  estado_vacuna: 'Estado vacuna',
  observacion: 'Observación',
  hogar_transito: 'Hogar tránsito',
  fecha_inicio: 'Fecha inicio',
  motivo_traslado: 'Motivo traslado',
  anio: 'Año',
  mes: 'Mes',
  cantidad_adopciones: 'Adopciones',
};

const ESTADO_LABELS: Record<string, string> = {
  DISPONIBLE: 'Disponible',
  EN_PROCESO: 'En proceso',
  ADOPTADO: 'Adoptado',
  Concretada: 'Concretada',
  Solicitada: 'Solicitada',
  'En proceso': 'En proceso',
  Aprobada: 'Aprobada',
  Rechazada: 'Rechazada',
  'En tránsito': 'En tránsito',
  'En refugio': 'En refugio',
  Finalizado: 'Finalizado',
  Cancelado: 'Cancelado',
  Adoptado: 'Adoptado',
  VENCIDA: 'Vencida',
  'PROXIMA A VENCER': 'Próxima a vencer',
  VIGENTE: 'Vigente',
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

  if ((key === 'en_sobrecupo' || key === 'castrado' || key === 'es_castrado' || key === 'adoptante_previo')
      && (valor === 1 || valor === '1' || valor === true)) {
    return 'Sí';
  }
  if ((key === 'en_sobrecupo' || key === 'castrado' || key === 'es_castrado' || key === 'adoptante_previo')
      && (valor === 0 || valor === '0' || valor === false)) {
    return 'No';
  }

  if (key === 'sexo' && typeof valor === 'string') {
    return valor === 'M' ? 'Macho' : valor === 'F' ? 'Hembra' : valor;
  }

  if (key.includes('estado') && typeof valor === 'string') {
    return ESTADO_LABELS[valor] ?? valor;
  }

  if (key === 'porcentaje_ocupacion' && typeof valor === 'number') {
    return `${valor}%`;
  }

  if (typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}/.test(valor)) {
    return valor.substring(0, 10);
  }

  return String(valor);
}
