/**
 * Template registry — exports all available templates as a flat array.
 * Import new templates here as they are added.
 */

import marigoldMandap       from './hindu/marigold-mandap.js';
import rajwadaArch          from './hindu/rajwada-arch.js';
import haldiMehendi         from './hindu/haldi-mehendi.js';

import mihrabEmerald        from './muslim/mihrab-emerald.js';
import ivoryArabesque       from './muslim/ivory-arabesque.js';
import walimaNoor           from './muslim/walima-noor.js';

import christianOliveLight  from './christian/olive-light.js';
import christianStainedGlass from './christian/stained-glass.js';
import christianGraceBotanical from './christian/grace-botanical.js';

import sikhNavyAnand        from './sikh/navy-anand.js';
import sikhPhulkariSaffron   from './sikh/phulkari-saffron.js';
import sikhKurmaiRoyal      from './sikh/kurmai-royal.js';

import jainLotusPond        from './jain/lotus-pond.js';
import kalashGold           from './jain/kalash-gold.js';
import jainAhimsaSerene     from './jain/ahimsa-serene.js';

import southIndianKalyanam  from './south-indian/kalyana-mandapam.js';
import bengaliShubhoBibaho  from './bengali/shubho-bibaho.js';
import secularModernArch    from './secular/modern-arch.js';

/** @type {import('./types').Template[]} */
export const templates = [
  marigoldMandap,
  rajwadaArch,
  haldiMehendi,

  mihrabEmerald,
  ivoryArabesque,
  walimaNoor,

  christianOliveLight,
  christianStainedGlass,
  christianGraceBotanical,

  sikhNavyAnand,
  sikhPhulkariSaffron,
  sikhKurmaiRoyal,

  jainLotusPond,
  kalashGold,
  jainAhimsaSerene,

  southIndianKalyanam,
  bengaliShubhoBibaho,
  secularModernArch,
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
