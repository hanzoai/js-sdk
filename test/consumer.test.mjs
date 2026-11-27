import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

test('consumer: Node ESM import resolution', async () => {
  const hanzo = await import('hanzoai');
  assert.equal(typeof hanzo.AiApi, 'function');
  assert.equal(typeof hanzo.Client, 'function');
  assert.equal(typeof hanzo.Configuration, 'function');
  assert.ok(Object.keys(hanzo).length >= 500);

  const client = new hanzo.Client();
  assert.ok(client);
  assert.ok(client.budget);
  assert.ok(client.policy);
  assert.ok(client.search);
  assert.ok(client.kb);
  assert.ok(client.graph);
  assert.ok(client.audit);
  
  const ai = new hanzo.AiApi(new hanzo.Configuration({ basePath: 'https://api.hanzo.ai' }));
  assert.equal(typeof ai.getModels, 'function');
});

test('consumer: CommonJS require resolution', () => {
  const require = createRequire(import.meta.url);
  const hanzo = require('hanzoai');
  assert.equal(typeof hanzo.AiApi, 'function');
  assert.equal(typeof hanzo.Client, 'function');
  assert.equal(typeof hanzo.Configuration, 'function');
  assert.ok(Object.keys(hanzo).length >= 500);

  const client = new hanzo.Client();
  assert.ok(client);
  assert.ok(client.budget);
  assert.ok(client.policy);
  assert.ok(client.search);
  assert.ok(client.kb);
  assert.ok(client.graph);
  assert.ok(client.audit);

  const ai = new hanzo.AiApi(new hanzo.Configuration({ basePath: 'https://api.hanzo.ai' }));
  assert.equal(typeof ai.getModels, 'function');
});
