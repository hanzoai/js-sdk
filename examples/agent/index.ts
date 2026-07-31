// agent — define one, run it, read the run back.
//
//   POST /v1/agents            cloud_post_v1_agents
//   POST /v1/agents/{ref}/run  cloud_post_v1_agents_by_ref_run
//   GET  /v1/agents/{ref}/runs cloud_get_v1_agents_ref_runs
//
// `ref` is the agent's public id (agent_...) OR its org-unique name, which is
// why the run and the read below can both use the name we just created without
// waiting for an id to come back.
//
// The read-back is the RUN list rather than the agent record: an agent you just
// created tells you nothing you did not just send, while its runs are the part
// the server actually produced.
import { AgentsApi } from 'hanzoai';
import { config, fail } from '../client';

const model = process.env.HANZO_MODEL ?? 'zen4';
// Org-unique: a fixed name collides with itself on the second run.
const name = `example-greeter-${Date.now()}`;

async function main() {
  const agents = new AgentsApi(config());

  const { data: created } = await agents.cloudPostV1Agents({
    cloudCreateAgentIn: {
      name,
      model,
      description: 'Created by the hanzoai SDK agent example.',
      instructions: 'You greet the user in one short sentence.',
    },
  });
  console.log(`created ${created.name} (${created.id}) on ${created.model}`);

  await agents.cloudPostV1AgentsByRefRun({ ref: name });
  console.log('run started');

  const { data: runs } = await agents.cloudGetV1AgentsRefRuns({ ref: name, limit: 5 });
  console.log(`${runs.runs?.length ?? 0} run(s):`);
  for (const r of runs.runs ?? []) {
    console.log(`  ${JSON.stringify(r)}`);
  }
}

main().catch(fail);
