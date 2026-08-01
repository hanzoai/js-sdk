// agent — define one, run it, read the run back.
//
//   POST /v1/agents            post_v1_agents
//   POST /v1/agents/{ref}/run  post_v1_agents_by_ref_run
//   GET  /v1/agents/{ref}/runs get_v1_agents_ref_runs
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

// `zen5` is the current flagship of the Zen family and what the gateway serves:
// `zen4` answers 400 "not in this gateway's catalog", so an agent created on it
// cannot run. An example's model default has to be one the reader's key can call
// on the first try. `HANZO_MODEL` overrides it (zen5-mini, zen5-coder, enso, …).
const model = process.env.HANZO_MODEL ?? 'zen5';
// Org-unique: a fixed name collides with itself on the second run.
const name = `example-greeter-${Date.now()}`;

async function main() {
  const agents = new AgentsApi(config());

  const { data: created } = await agents.postV1Agents({
    createAgentIn: {
      name,
      model,
      description: 'Created by the hanzoai SDK agent example.',
      instructions: 'You greet the user in one short sentence.',
    },
  });
  console.log(`created ${created.name} (${created.id}) on ${created.model}`);

  await agents.postV1AgentsByRefRun({ ref: name });
  console.log('run started');

  const { data: runs } = await agents.getV1AgentsRefRuns({ ref: name, limit: 5 });
  console.log(`${runs.runs?.length ?? 0} run(s):`);
  for (const r of runs.runs ?? []) {
    console.log(`  ${JSON.stringify(r)}`);
  }
}

main().catch(fail);
