// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import path from 'node:path';
import util from 'node:util';
import Fuse from 'fuse.js';
import ts from 'typescript';
import { WorkerOutput } from './code-tool-types';
import { Hanzo, ClientOptions } from 'hanzoai';

function getRunFunctionSource(code: string): {
  type: 'declaration' | 'expression';
  client: string | undefined;
  code: string;
} | null {
  const sourceFile = ts.createSourceFile('code.ts', code, ts.ScriptTarget.Latest, true);
  const printer = ts.createPrinter();

  for (const statement of sourceFile.statements) {
    // Check for top-level function declarations
    if (ts.isFunctionDeclaration(statement)) {
      if (statement.name?.text === 'run') {
        return {
          type: 'declaration',
          client: statement.parameters[0]?.name.getText(),
          code: printer.printNode(ts.EmitHint.Unspecified, statement.body!, sourceFile),
        };
      }
    }

    // Check for variable declarations: const run = () => {} or const run = function() {}
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name) &&
          declaration.name.text === 'run' &&
          // Check if it's initialized with a function
          declaration.initializer &&
          (ts.isFunctionExpression(declaration.initializer) || ts.isArrowFunction(declaration.initializer))
        ) {
          return {
            type: 'expression',
            client: declaration.initializer.parameters[0]?.name.getText(),
            code: printer.printNode(ts.EmitHint.Unspecified, declaration.initializer, sourceFile),
          };
        }
      }
    }
  }

  return null;
}

function getTSDiagnostics(code: string): string[] {
  const functionSource = getRunFunctionSource(code)!;
  const codeWithImport = [
    'import { Hanzo } from "hanzoai";',
    functionSource.type === 'declaration' ?
      `async function run(${functionSource.client}: Hanzo)`
    : `const run: (${functionSource.client}: Hanzo) => Promise<unknown> =`,
    functionSource.code,
  ].join('\n');
  const sourcePath = path.resolve('code.ts');
  const ast = ts.createSourceFile(sourcePath, codeWithImport, ts.ScriptTarget.Latest, true);
  const options = ts.getDefaultCompilerOptions();
  options.target = ts.ScriptTarget.Latest;
  options.module = ts.ModuleKind.NodeNext;
  options.moduleResolution = ts.ModuleResolutionKind.NodeNext;
  const host = ts.createCompilerHost(options, true);
  const newHost: typeof host = {
    ...host,
    getSourceFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return ast;
      }
      return host.getSourceFile(...args);
    },
    readFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return codeWithImport;
      }
      return host.readFile(...args);
    },
    fileExists: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return true;
      }
      return host.fileExists(...args);
    },
  };
  const program = ts.createProgram({
    options,
    rootNames: [sourcePath],
    host: newHost,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program, ast);
  return diagnostics.map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    if (!d.file || !d.start) return `- ${message}`;
    const { line: lineNumber } = ts.getLineAndCharacterOfPosition(d.file, d.start);
    const line = codeWithImport.split('\n').at(lineNumber)?.trim();
    return line ? `- ${message}\n    ${line}` : `- ${message}`;
  });
}

const fuse = new Fuse(
  [
    'client.getHome',
    'client.models.list',
    'client.openai.create',
    'client.openai.delete',
    'client.openai.patch',
    'client.openai.retrieve',
    'client.openai.update',
    'client.openai.deployments.complete',
    'client.openai.deployments.embed',
    'client.openai.deployments.chat.complete',
    'client.engines.complete',
    'client.engines.embed',
    'client.engines.chat.complete',
    'client.chat.completions.create',
    'client.completions.create',
    'client.embeddings.create',
    'client.images.generations.create',
    'client.audio.speech.create',
    'client.audio.transcriptions.create',
    'client.assistants.create',
    'client.assistants.delete',
    'client.assistants.list',
    'client.threads.create',
    'client.threads.retrieve',
    'client.threads.messages.create',
    'client.threads.messages.list',
    'client.threads.runs.create',
    'client.moderations.create',
    'client.utils.getSupportedOpenAIParams',
    'client.utils.tokenCounter',
    'client.utils.transformRequest',
    'client.model.create',
    'client.model.delete',
    'client.model.info.list',
    'client.model.update.full',
    'client.model.update.partial',
    'client.modelGroup.retrieveInfo',
    'client.routes.list',
    'client.responses.create',
    'client.responses.delete',
    'client.responses.retrieve',
    'client.responses.inputItems.list',
    'client.batches.cancelWithProvider',
    'client.batches.create',
    'client.batches.createWithProvider',
    'client.batches.list',
    'client.batches.listWithProvider',
    'client.batches.retrieve',
    'client.batches.retrieveWithProvider',
    'client.batches.cancel.cancel',
    'client.rerank.create',
    'client.rerank.createV1',
    'client.rerank.createV2',
    'client.fineTuning.jobs.create',
    'client.fineTuning.jobs.list',
    'client.fineTuning.jobs.retrieve',
    'client.fineTuning.jobs.cancel.create',
    'client.credentials.create',
    'client.credentials.delete',
    'client.credentials.list',
    'client.vertexAI.create',
    'client.vertexAI.delete',
    'client.vertexAI.patch',
    'client.vertexAI.retrieve',
    'client.vertexAI.update',
    'client.gemini.create',
    'client.gemini.delete',
    'client.gemini.patch',
    'client.gemini.retrieve',
    'client.gemini.update',
    'client.cohere.create',
    'client.cohere.delete',
    'client.cohere.modify',
    'client.cohere.retrieve',
    'client.cohere.update',
    'client.anthropic.create',
    'client.anthropic.delete',
    'client.anthropic.modify',
    'client.anthropic.retrieve',
    'client.anthropic.update',
    'client.bedrock.create',
    'client.bedrock.delete',
    'client.bedrock.patch',
    'client.bedrock.retrieve',
    'client.bedrock.update',
    'client.euAssemblyai.create',
    'client.euAssemblyai.delete',
    'client.euAssemblyai.patch',
    'client.euAssemblyai.retrieve',
    'client.euAssemblyai.update',
    'client.assemblyai.create',
    'client.assemblyai.delete',
    'client.assemblyai.patch',
    'client.assemblyai.retrieve',
    'client.assemblyai.update',
    'client.azure.call',
    'client.azure.create',
    'client.azure.delete',
    'client.azure.patch',
    'client.azure.update',
    'client.langfuse.create',
    'client.langfuse.delete',
    'client.langfuse.patch',
    'client.langfuse.retrieve',
    'client.langfuse.update',
    'client.config.passThroughEndpoint.create',
    'client.config.passThroughEndpoint.delete',
    'client.config.passThroughEndpoint.list',
    'client.config.passThroughEndpoint.update',
    'client.test.ping',
    'client.health.checkAll',
    'client.health.checkLiveliness',
    'client.health.checkLiveness',
    'client.health.checkReadiness',
    'client.health.checkServices',
    'client.active.listCallbacks',
    'client.settings.retrieve',
    'client.key.block',
    'client.key.checkHealth',
    'client.key.delete',
    'client.key.generate',
    'client.key.list',
    'client.key.regenerateByKey',
    'client.key.retrieveInfo',
    'client.key.unblock',
    'client.key.update',
    'client.user.create',
    'client.user.delete',
    'client.user.list',
    'client.user.retrieveInfo',
    'client.user.update',
    'client.team.addMember',
    'client.team.block',
    'client.team.create',
    'client.team.delete',
    'client.team.disableLogging',
    'client.team.list',
    'client.team.listAvailable',
    'client.team.removeMember',
    'client.team.retrieveInfo',
    'client.team.unblock',
    'client.team.update',
    'client.team.updateMember',
    'client.team.model.add',
    'client.team.model.remove',
    'client.team.callback.add',
    'client.team.callback.retrieve',
    'client.organization.addMember',
    'client.organization.create',
    'client.organization.delete',
    'client.organization.deleteMember',
    'client.organization.list',
    'client.organization.update',
    'client.organization.updateMember',
    'client.organization.info.deprecated',
    'client.organization.info.retrieve',
    'client.customer.block',
    'client.customer.create',
    'client.customer.delete',
    'client.customer.list',
    'client.customer.retrieveInfo',
    'client.customer.unblock',
    'client.customer.update',
    'client.spend.calculateSpend',
    'client.spend.listLogs',
    'client.spend.listTags',
    'client.global.spend.listTags',
    'client.global.spend.reset',
    'client.global.spend.retrieveReport',
    'client.provider.listBudgets',
    'client.cache.delete',
    'client.cache.flushAll',
    'client.cache.ping',
    'client.cache.redis.retrieveInfo',
    'client.guardrails.list',
    'client.add.addAllowedIP',
    'client.delete.createAllowedIP',
    'client.files.create',
    'client.files.delete',
    'client.files.list',
    'client.files.retrieve',
    'client.files.content.retrieve',
    'client.budget.create',
    'client.budget.delete',
    'client.budget.info',
    'client.budget.list',
    'client.budget.settings',
    'client.budget.update',
  ],
  { threshold: 1, shouldSort: true },
);

function getMethodSuggestions(fullyQualifiedMethodName: string): string[] {
  return fuse
    .search(fullyQualifiedMethodName)
    .map(({ item }) => item)
    .slice(0, 5);
}

const proxyToObj = new WeakMap<any, any>();
const objToProxy = new WeakMap<any, any>();

type ClientProxyConfig = {
  path: string[];
  isBelievedBad?: boolean;
};

function makeSdkProxy<T extends object>(obj: T, { path, isBelievedBad = false }: ClientProxyConfig): T {
  let proxy: T = objToProxy.get(obj);

  if (!proxy) {
    proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const propPath = [...path, String(prop)];
        const value = Reflect.get(target, prop, receiver);

        if (isBelievedBad || (!(prop in target) && value === undefined)) {
          // If we're accessing a path that doesn't exist, it will probably eventually error.
          // Let's proxy it and mark it bad so that we can control the error message.
          // We proxy an empty class so that an invocation or construction attempt is possible.
          return makeSdkProxy(class {}, { path: propPath, isBelievedBad: true });
        }

        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
          return makeSdkProxy(value, { path: propPath, isBelievedBad });
        }

        return value;
      },

      apply(target, thisArg, args) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a function. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.apply(target, proxyToObj.get(thisArg) ?? thisArg, args);
      },

      construct(target, args, newTarget) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a constructor. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.construct(target, args, newTarget);
      },
    });

    objToProxy.set(obj, proxy);
    proxyToObj.set(proxy, obj);
  }

  return proxy;
}

function parseError(code: string, error: unknown): string | undefined {
  if (!(error instanceof Error)) return;
  const message = error.name ? `${error.name}: ${error.message}` : error.message;
  try {
    // Deno uses V8; the first "<anonymous>:LINE:COLUMN" is the top of stack.
    const lineNumber = error.stack?.match(/<anonymous>:([0-9]+):[0-9]+/)?.[1];
    // -1 for the zero-based indexing
    const line =
      lineNumber &&
      code
        .split('\n')
        .at(parseInt(lineNumber, 10) - 1)
        ?.trim();
    return line ? `${message}\n  at line ${lineNumber}\n    ${line}` : message;
  } catch {
    return message;
  }
}

const fetch = async (req: Request): Promise<Response> => {
  const { opts, code } = (await req.json()) as { opts: ClientOptions; code: string };

  const runFunctionSource = code ? getRunFunctionSource(code) : null;
  if (!runFunctionSource) {
    const message =
      code ?
        'The code is missing a top-level `run` function.'
      : 'The code argument is missing. Provide one containing a top-level `run` function.';
    return Response.json(
      {
        is_error: true,
        result: `${message} Write code within this template:\n\n\`\`\`\nasync function run(client) {\n  // Fill this out\n}\n\`\`\``,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const diagnostics = getTSDiagnostics(code);
  if (diagnostics.length > 0) {
    return Response.json(
      {
        is_error: true,
        result: `The code contains TypeScript diagnostics:\n${diagnostics.join('\n')}`,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const client = new Hanzo({
    ...opts,
  });

  const log_lines: string[] = [];
  const err_lines: string[] = [];
  const console = {
    log: (...args: unknown[]) => {
      log_lines.push(util.format(...args));
    },
    error: (...args: unknown[]) => {
      err_lines.push(util.format(...args));
    },
  };
  try {
    let run_ = async (client: any) => {};
    eval(`${code}\nrun_ = run;`);
    const result = await run_(makeSdkProxy(client, { path: ['client'] }));
    return Response.json({
      is_error: false,
      result,
      log_lines,
      err_lines,
    } satisfies WorkerOutput);
  } catch (e) {
    return Response.json(
      {
        is_error: true,
        result: parseError(code, e),
        log_lines,
        err_lines,
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }
};

export default { fetch };
