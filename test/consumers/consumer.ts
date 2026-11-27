import { Client, AiApi, Configuration } from '../../dist/hanzo';
import type { AiModel } from '../../dist/models';

const config = new Configuration({ basePath: 'https://api.hanzo.ai', apiKey: 'test' });
const ai = new AiApi(config);
const client = new Client();

async function checkModel(m: AiModel): Promise<string> {
  return m.id || 'unknown';
}

void checkModel;
void ai;
void client;
