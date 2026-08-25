// smoke — load the built package the way a consumer does, and ask it for every
// API class the generated source declares.
//
// `npm run build` proves the tree type-checks and `npm run examples` proves a
// consumer's imports compile. Neither one LOADS dist/, so neither can see a
// broken module graph, a re-export the generator declined to write, or an entry
// point that does not resolve. Those are runtime facts about the artifact that
// gets published, and this is where they show up.
//
// `require('hanzoai')` and not a path: the package self-reference resolves
// through package.json `exports`, which is the same entry point `npm i hanzoai` opens.
// A build that only works when you reach past that entry point is a build that works
// for nobody.
//
// The expected surface is READ FROM THE SOURCE, never listed here. A product
// joins this check the release cloud starts serving it and leaves the release it
// stops, so there is nothing to edit when the API moves — and nothing that can
// quietly stop covering what it claims to.
import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const api = fileURLToPath(new URL('../src/api/', import.meta.url));
const declared = readdirSync(api)
  .filter((f) => f.endsWith('.ts'))
  .flatMap((f) =>
    [...readFileSync(api + f, 'utf8').matchAll(/^export class (\w+Api) /gm)].map((m) => m[1]))
  .sort();

const fail = (msg) => {
  console.error(`smoke: ${msg}`);
  process.exit(1);
};

// A zero here must mean "looked and found nothing missing", never "looked at
// nothing".
if (!declared.length) fail('src/api declares no API class — read nothing, proved nothing');

const hanzo = createRequire(import.meta.url)('hanzoai');
const missing = declared.filter((name) => typeof hanzo[name] !== 'function');
if (missing.length) {
  fail(`${missing.length} API class(es) the source declares are not exported from the ` +
       `build:\n  ${missing.slice(0, 10).join('\n  ')}`);
}

// One construction and one call site, so what is proved is that a class WORKS
// and not merely that a name is bound to something.
const models = new hanzo.ModelsApi(new hanzo.Configuration({ basePath: 'https://api.hanzo.ai' }));
if (typeof models.getModels !== 'function') fail('ModelsApi has no getModels');

console.log(`smoke: ${declared.length} API classes exported from the build; ModelsApi constructs`);
