/**
 * Constantes de layout compartilhadas entre componentes
 * 
 * Centraliza valores que precisam ser sincronizados entre diferentes partes da aplicação,
 * como alturas de header, breakpoints, e thresholds de comportamento.
 */

// =============================================================================
// BREAKPOINTS
// =============================================================================

/**
 * Breakpoint para detecção de mobile (largura em pixels)
 * Corresponde ao breakpoint `md` do Tailwind CSS
 */
export const MOBILE_BREAKPOINT = 768;

// =============================================================================
// HEADER
// =============================================================================

/**
 * Alturas do header por breakpoint
 * 
 * IMPORTANTE: Estes valores devem corresponder às classes CSS no Header.tsx:
 * - mobile: h-[72px]
 * - desktop: lg:h-[86px]
 */
export const HEADER_HEIGHT = {
  mobile: 72,
  desktop: 86,
} as const;

/**
 * Classes CSS do header para uso em estilos inline
 */
export const HEADER_HEIGHT_CLASSES = {
  mobile: 'top-[72px]',
  desktop: 'lg:top-[86px]',
} as const;

// =============================================================================
// SCROLL BEHAVIOR
// =============================================================================

/**
 * Thresholds para comportamento baseado em scroll
 */
export const SCROLL_THRESHOLDS = {
  /** Scroll Y abaixo deste valor = "no topo" */
  expand: 50,
  /** Scroll Y acima deste valor = "scrollado" */
  collapse: 250,
} as const;

/**
 * Tempo em ms para ignorar eventos de scroll após uma transição
 * Previne loops causados pela mudança de altura dos elementos
 */
export const TRANSITION_LOCK_MS = 300;
