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
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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

function verifySurface(mod, label) {
  const missing = declared.filter((name) => typeof mod[name] !== 'function');
  if (missing.length) {
    fail(`[${label}] ${missing.length} API class(es) the source declares are not exported from the ` +
         `build:\n  ${missing.slice(0, 10).join('\n  ')}`);
  }
  const ai = new mod.AiApi(new mod.Configuration({ basePath: 'https://api.hanzo.ai' }));
  if (typeof ai.getModels !== 'function') fail(`[${label}] AiApi has no getModels`);
  if (typeof mod.Client !== 'function') fail(`[${label}] Client is not exported`);
}

// 1. CommonJS consumer check
const cjsMod = createRequire(import.meta.url)('hanzoai');
verifySurface(cjsMod, 'CJS');

// 2. Node ESM consumer check
const esmMod = await import('hanzoai');
verifySurface(esmMod, 'ESM');

// 3. TypeScript strict consumer check against the built .d.ts surface
const rootDir = fileURLToPath(new URL('../', import.meta.url));
const tmp = mkdtempSync(join(tmpdir(), 'hanzoai-ts-smoke-'));
try {
  writeFileSync(
    join(tmp, 'consumer.ts'),
    [
      "import { Client, AiApi, Configuration } from 'hanzoai';",
      'const c = new Client();',
      "const ai = new AiApi(new Configuration({ basePath: 'https://api.hanzo.ai' }));",
      'export { c, ai };',
    ].join('\n'),
  );
  writeFileSync(
    join(tmp, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        strict: true,
        noEmit: true,
        target: 'ES2020',
        module: 'node16',
        moduleResolution: 'node16',
        skipLibCheck: false,
        paths: { hanzoai: [join(rootDir, 'dist/hanzo.d.ts')] },
      },
      include: ['consumer.ts'],
    }),
  );
  const tscBin = join(rootDir, 'node_modules', 'typescript', 'bin', 'tsc');
  execFileSync(process.execPath, [tscBin, '-p', join(tmp, 'tsconfig.json')], { stdio: 'inherit' });
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

console.log(`smoke: ${declared.length} API classes verified across CJS, ESM, and strict TypeScript`);
