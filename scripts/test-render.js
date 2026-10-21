// Test script to verify SVG output of all templates
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

  console.log(`Testing ${templates.length} templates...`);
  let errors = 0;

  for (const t of templates) {
    const values = {};
    for (const f of t.fields || []) {
      values[f.key] = f.default || '';
    }
    const svg = render(t, values);

    // Check for glued attributes (e.g. fill="..."opacity="...")
    const gluedAttr = svg.match(/(["'])([a-zA-Z_:][\w:.-]*=)/g);
    if (gluedAttr) {
      console.error(`[FAIL] ${t.id} has glued attributes:`, gluedAttr);
      errors++;
      continue;
    }

    // Check for bare & not part of an entity
    const bareAmp = svg.match(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/g);
    if (bareAmp) {
      console.error(`[FAIL] ${t.id} has bare & characters:`, bareAmp.length);
      errors++;
      continue;
    }

    // Check for NaN
    if (/\bNaN\b/.test(svg)) {
      console.error(`[FAIL] ${t.id} has NaN coordinates!`);
      errors++;
      continue;
    }

    // Check for undefined
    if (/"undefined"/.test(svg)) {
      console.error(`[FAIL] ${t.id} has "undefined" attribute values!`);
      errors++;
      continue;
    }

    console.log(`[PASS] ${t.id} (${svg.length} chars)`);
  }

  if (errors > 0) {
    console.error(`\nCompleted with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log('\nAll templates rendered valid SVG without attribute or entity errors!');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
