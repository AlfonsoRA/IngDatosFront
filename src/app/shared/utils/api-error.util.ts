/** Extrae mensaje legible de errores ProblemDetail / Spring Boot */
export function mensajeApiError(err: { error?: { detail?: string; mensaje?: string; errores?: Record<string, string> } }): string {
  if (err.error?.errores) {
    return `Validación: ${Object.values(err.error.errores).join(', ')}`;
  }
  if (err.error?.detail) {
    return err.error.detail;
  }
  if (err.error?.mensaje) {
    return err.error.mensaje;
  }
  return 'Ocurrió un error. Verifique la conexión con la API.';
}
