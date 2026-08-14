// agent — define one, run it, read the run back.
//
//   POST /v1/agents            post_agents
//   POST /v1/agents/{ref}/run  post_agents_by_ref_run
//   GET  /v1/agents/{ref}/runs get_agents_by_ref_runs
//
// `ref` is the agent's public id (agent_…) OR its org-unique name, which is why
// the run and the read below both use the name we just sent instead of waiting
// for an id to come back.
//
// The read-back is the RUN list rather than the agent record: an agent you just
// created tells you nothing you did not just send, while its runs are the part
// the server produced.
import { AgentsApi } from 'hanzoai';
import { config, fail } from '../client';

// A model id is a string, so the wrong one type-checks and then fails on the
// wire. `HANZO_MODEL` overrides it (zen5-mini, zen5-coder, enso, …).
const model = process.env.HANZO_MODEL ?? 'zen5';
// Org-unique: a fixed name collides with itself on the second run.
const name = `example-greeter-${Date.now()}`;

async function main() {
  const agents = new AgentsApi(config());

  const { data: created } = await agents.postAgents({
    createAgentIn: {
      name,
      model,
      description: 'Created by the hanzoai SDK agent example.',
      instructions: 'You greet the user in one short sentence.',
    },
  });
  console.log(`created ${created.name} (${created.id}) on ${created.model}`);

  await agents.postAgentsByRefRun({ ref: name });
  console.log('run started');

  const { data: runs } = await agents.getAgentsByRefRuns({ ref: name, limit: 5 });
  console.log(`${runs.runs?.length ?? 0} run(s):`);
  for (const r of runs.runs ?? []) {
    console.log(`  ${JSON.stringify(r)}`);
  }
}

main().catch(fail);
