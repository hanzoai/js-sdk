// agent — define one, run it, read it back.
//
//   POST /v1/agents            cloud_AgentsController.Create
//   POST /v1/agents/{ref}/run  cloud_AgentsController.Run
//   GET  /v1/agents/{ref}      cloud_AgentsController.Get
//
// `ref` is the agent's public id (agent_...) OR its org-unique name, which is
// why the run and the read below can both use the name we just created without
// waiting for an id to come back.
import { AgentsAPIApi } from 'hanzoai';
import { config, fail } from '../client';

const model = process.env.HANZO_MODEL ?? 'zen4';
// Org-unique: a fixed name collides with itself on the second run.
const name = `example-greeter-${Date.now()}`;

async function main() {
  const agents = new AgentsAPIApi(config());

  const { data: created } = await agents.cloudAgentsControllerCreate({
    cloudAgentsCreateAgentRequest: {
      name,
      model,
      description: 'Created by the hanzoai SDK agent example.',
      instructions: 'You greet the user in one short sentence.',
    },
  });
  console.log('created:', JSON.stringify(created));

  const { data: run } = await agents.cloudAgentsControllerRun({
    ref: name,
    cloudAgentsRunRequest: { input: 'Greet a new Hanzo user.' },
  });
  console.log('run:', JSON.stringify(run));

  const { data: agent } = await agents.cloudAgentsControllerGet({ ref: name });
  console.log('read back:', JSON.stringify(agent, null, 2));
}

main().catch(fail);
