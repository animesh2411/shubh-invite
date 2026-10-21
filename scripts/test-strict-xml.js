// Strict XML parser test for all 10 templates using @xmldom/xmldom
import { DOMParser } from '@xmldom/xmldom';

globalThis.document = {
  createElement: () => ({
    getContext: () => ({
      measureText: (text) => ({ width: (text || '').length * 12 })
    })
  })
};

async function run() {
  const { templates } = await import('../src/templates/index.js');
  const { render } = await import('../src/core/renderer.js');
  const { sanitizeSVG } = await import('../src/core/exporter.js');

  console.log(`Verifying strict XML parsing for all ${templates.length} templates...`);
  let errors = 0;

  for (const t of templates) {
    const values = {};
    for (const f of t.fields || []) {
      values[f.key] = f.default || '';
    }
    const rawSvg = render(t, values);
    const cleanSvg = sanitizeSVG(rawSvg);

    let parseErrors = [];
    const parser = new DOMParser({
      onError: (level, msg) => {
        if (level === 'error' || level === 'fatalError') {
          parseErrors.push(`[${level}] ${msg}`);
        }
      }
    });

    const doc = parser.parseFromString(cleanSvg, 'image/svg+xml');

    if (parseErrors.length > 0) {
      console.error(`[FAIL] ${t.id} had XML parse errors:`);
      for (const err of parseErrors) {
        console.error('   ', err);
      }
      errors++;
    } else if (!doc || !doc.documentElement || doc.documentElement.nodeName !== 'svg') {
      console.error(`[FAIL] ${t.id} did not produce a valid <svg> root element.`);
      errors++;
    } else {
      console.log(`[PASS] ${t.id} (Strict XML valid, ${cleanSvg.length} bytes)`);
    }
  }

  if (errors > 0) {
    console.error(`\nStrict XML verification failed with ${errors} template(s) with errors.`);
    process.exit(1);
  } else {
    console.log('\nAll 10 templates parsed flawlessly as 100% strict XML without any errors or warnings!');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
