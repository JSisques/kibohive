/**
 * Extrae un objeto JSON válido de un texto que puede contener markdown
 * @param text Texto que puede contener markdown y JSON
 * @returns Objeto JSON parseado
 */
export function extractJsonFromText(text: string): any {
  try {
    // Primero intentamos parsear directamente
    return JSON.parse(text);
  } catch {
    try {
      // Si falla, intentamos extraer el JSON de bloques de código markdown
      const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\}|\[[\s\S]*?\])\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1]);
      }

      // Si no hay bloques de código, buscamos cualquier estructura JSON
      const jsonPattern = /\{[\s\S]*?\}|\[[\s\S]*?\]/;
      const match = text.match(jsonPattern);
      if (match) {
        return JSON.parse(match[0]);
      }
    } catch {
      // Si todo falla, intentamos limpiar el texto y parsear de nuevo
      const cleanText = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      return JSON.parse(cleanText);
    }
  }

  throw new Error('No se pudo extraer un JSON válido del texto');
}
