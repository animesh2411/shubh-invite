/**
 * Template registry — exports all available templates as a flat array.
 * Import new templates here as they are added.
 */

import marigoldMandap  from './hindu/marigold-mandap.js';
import mihrabEmerald   from './muslim/mihrab-emerald.js';

/** @type {import('./types').Template[]} */
export const templates = [
  marigoldMandap,
  mihrabEmerald,
  // Phase 3 additions:
  // hinduRajwadaArch,
  // muslimIvoryArabesque,
  // Phase 4:
  // christianOliveLight, christianStainedGlass,
  // sikhPhulkariSaffron, sikhNavyAnand,
  // jainLotusPond, jainKalashGold,
];

/** Lookup a template by its id. */
export function getTemplate(id) {
  return templates.find((t) => t.id === id) ?? null;
}

/** Get all unique tradition values. */
export function getTraditions() {
  return [...new Set(templates.map((t) => t.tradition))];
}

/** Get all unique occasion values. */
export function getOccasions() {
  return [...new Set(templates.map((t) => t.occasion))];
}

/**
 * Filter templates by tradition and/or occasion.
 * @param {{ tradition?: string, occasion?: string, query?: string }} filters
 */
export function filterTemplates({ tradition, occasion, query } = {}) {
  return templates.filter((t) => {
    if (tradition && t.tradition !== tradition) return false;
    if (occasion  && t.occasion  !== occasion)  return false;
    if (query) {
      const q = query.toLowerCase();
      if (
        !t.name.toLowerCase().includes(q) &&
        !t.tradition.toLowerCase().includes(q) &&
        !t.occasion.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });
}
