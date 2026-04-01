# Changelog

## 0.1.0-alpha.3 (2026-04-01)

Full Changelog: [v0.1.0-alpha.2...v0.1.0-alpha.3](https://github.com/hanzoai/js-sdk/compare/v0.1.0-alpha.2...v0.1.0-alpha.3)

### Features

* add Ast aliases for Astley (backward compat preserved) ([f4a4508](https://github.com/hanzoai/js-sdk/commit/f4a45083a02edd3ef4e44a42941e6be93c9380d7))
* add Commerce and Astley SDK resource modules ([8005c69](https://github.com/hanzoai/js-sdk/commit/8005c69d2b1cccdb63205687ef45953e01bcfc4e))
* **api:** api update ([8ab24e8](https://github.com/hanzoai/js-sdk/commit/8ab24e8ee05819b4655938cd9a13c23f97f8b387))
* **mcp:** add an option to disable code tool ([bf4552a](https://github.com/hanzoai/js-sdk/commit/bf4552ab1d41ba94d8de39314bd93d41807efb0c))
* **mcp:** add initial server instructions ([5376e85](https://github.com/hanzoai/js-sdk/commit/5376e85a5b0213925b05382818a53d46204ff769))


### Bug Fixes

* apply prettier formatting to astley.ts and commerce.ts ([f542afd](https://github.com/hanzoai/js-sdk/commit/f542afd869a490c4e41f64435bdc28d428ea731f))
* **client:** avoid memory leak with abort signals ([cfdd317](https://github.com/hanzoai/js-sdk/commit/cfdd3179046b5c3b88787963cd2cb09297387517))
* **client:** avoid removing abort listener too early ([7f09aa6](https://github.com/hanzoai/js-sdk/commit/7f09aa6f5e6e90f6400d1453c0b64141454afa91))
* **client:** improve parameter names ([fe82b13](https://github.com/hanzoai/js-sdk/commit/fe82b134f57f8348535ccb517da6f0fd3ed3358f))
* **client:** preserve URL params already embedded in path ([21ea702](https://github.com/hanzoai/js-sdk/commit/21ea702514a77a4a014c79bd8abb659858c0a99a))
* **docs/contributing:** correct pnpm link command ([372a5e9](https://github.com/hanzoai/js-sdk/commit/372a5e9ec53493a52e082ba5e31f35088dd575bd))
* **mcp:** do not fallback on baseUrl if environment env variable is set ([10bb257](https://github.com/hanzoai/js-sdk/commit/10bb257e8958da45022a7b4c8ccbe3659515bd7f))
* **mcp:** initialize SDK lazily to avoid failing the connection on init errors ([7d21e7e](https://github.com/hanzoai/js-sdk/commit/7d21e7ecb73718c4ac0d7b6fe8d7a0612ca8bf82))
* **mcp:** update prompt ([884d029](https://github.com/hanzoai/js-sdk/commit/884d0291162da80edcb9eda0bd0ef7f7dd40a778))
* prettier formatting + exclude resource files from Jest ([8512760](https://github.com/hanzoai/js-sdk/commit/851276015971ae8ba20c232357ebdf186cd51a97))
* resolve TypeScript errors (duplicate imports, missing type, property conflict) ([451c051](https://github.com/hanzoai/js-sdk/commit/451c0518dfa52d9ada3a364871291c112fcac88b))
* update delete test to use renamed deleteResource property ([1e5789b](https://github.com/hanzoai/js-sdk/commit/1e5789bf2808c6dcbe4343056ce0882ec346f70f))
* use --legacy-peer-deps for sub-package npm install ([b14211f](https://github.com/hanzoai/js-sdk/commit/b14211f7edcf04577f54e3d506b72a4af9aecbfa))
* use npm for sub-package builds (pnpm not available in CI) ([2559558](https://github.com/hanzoai/js-sdk/commit/2559558fd8e84a6cadf80d647abf44d9c5f2b307))


### Chores

* **ci:** skip uploading artifacts on stainless-internal branches ([91a33b2](https://github.com/hanzoai/js-sdk/commit/91a33b2b18c002a807df6f075978cf0002661ef5))
* cleanup ([33af3e2](https://github.com/hanzoai/js-sdk/commit/33af3e2668b3e426e7d2e9f8a53bba8481a6adbb))
* **client:** do not parse responses with empty content-length ([6a33f6f](https://github.com/hanzoai/js-sdk/commit/6a33f6fa50b92caa9d96230de7243ab3043e0968))
* **client:** restructure abort controller binding ([3960a4d](https://github.com/hanzoai/js-sdk/commit/3960a4d17c1d7574adc855c2d10726c3ef0c2061))
* **internal/client:** fix form-urlencoded requests ([3fda3a1](https://github.com/hanzoai/js-sdk/commit/3fda3a119ba6fa12d6c3c4dc60a97e802a699103))
* **internal:** add health check to MCP server when running in HTTP mode ([cad35ec](https://github.com/hanzoai/js-sdk/commit/cad35ec70cb7ee60dc750bfc43523c747c9a7659))
* **internal:** allow basic filtering of methods allowed for MCP code mode ([4f53e6b](https://github.com/hanzoai/js-sdk/commit/4f53e6b02bfb473e5c56f3fb280396a14c0f0843))
* **internal:** allow setting x-stainless-api-key header on mcp server requests ([c8c73a8](https://github.com/hanzoai/js-sdk/commit/c8c73a8310da4d79e053737c454dbb4d0cf7ec19))
* **internal:** always generate MCP server dockerfiles and upgrade associated dependencies ([3b156d9](https://github.com/hanzoai/js-sdk/commit/3b156d9db2a37fe58c756da1d1f778e621f07295))
* **internal:** avoid type checking errors with ts-reset ([8491b7e](https://github.com/hanzoai/js-sdk/commit/8491b7ef832d9d464e158d4b55364ae66fbd1a7f))
* **internal:** cache fetch instruction calls in MCP server ([983ecc3](https://github.com/hanzoai/js-sdk/commit/983ecc3b8bc7d25e86cc4a6e0455ab58419703e9))
* **internal:** codegen related update ([3bb3495](https://github.com/hanzoai/js-sdk/commit/3bb34955249ebb6154cbab21fa62d0f7b3345777))
* **internal:** codegen related update ([8148480](https://github.com/hanzoai/js-sdk/commit/8148480c36cd7b9881109e047bc43be386e5e3b8))
* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([1eb7832](https://github.com/hanzoai/js-sdk/commit/1eb78321ad234b771204d8ce6c3ff76faf26433a))
* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([ff8f439](https://github.com/hanzoai/js-sdk/commit/ff8f439451dbffc1fa9af96b45e99d5314948a4b))
* **internal:** improve layout of generated MCP server files ([0d060d8](https://github.com/hanzoai/js-sdk/commit/0d060d85349f621df718694f5f3cd8e22ca9fee3))
* **internal:** make MCP code execution location configurable via a flag ([1e34e6d](https://github.com/hanzoai/js-sdk/commit/1e34e6d876477ea55cf6a774ed7b62eb2a1fefde))
* **internal:** move stringifyQuery implementation to internal function ([bcedf66](https://github.com/hanzoai/js-sdk/commit/bcedf66ce15242c94d43ad912f0272c5361cca8a))
* **internal:** refactor flag parsing for MCP servers and add debug flag ([0ebcc75](https://github.com/hanzoai/js-sdk/commit/0ebcc756c3fc2e11869beeb9f3a8e36db769c373))
* **internal:** remove mock server code ([379360d](https://github.com/hanzoai/js-sdk/commit/379360d7bc83a06bee0a81d374131784ea59bda7))
* **internal:** support oauth authorization code flow for MCP servers ([3f884dc](https://github.com/hanzoai/js-sdk/commit/3f884dce3b54c269e67f1c332cb94e9d9b55c91b))
* **internal:** upgrade @modelcontextprotocol/sdk and hono ([5228b27](https://github.com/hanzoai/js-sdk/commit/5228b27ade8264e76d22780268735c5796be849f))
* **internal:** use x-stainless-mcp-client-envs header for MCP remote code tool calls ([29cabd3](https://github.com/hanzoai/js-sdk/commit/29cabd33d5e20a0bae897504a539089115743f9b))
* **mcp-server:** improve instructions ([101a01d](https://github.com/hanzoai/js-sdk/commit/101a01decfb2c1fb02c6f1326ff7b1fb42e84f3c))
* **mcp-server:** return access instructions for 404 without API key ([a6551b4](https://github.com/hanzoai/js-sdk/commit/a6551b41ef6bed9fb71b21d53a638e2e4c7579ef))
* **mcp:** correctly update version in sync with sdk ([5ea59ee](https://github.com/hanzoai/js-sdk/commit/5ea59eedac3ba6fca7f9cb94fb87b58e7383792f))
* **mcp:** forward STAINLESS_API_KEY to docs search endpoint ([0d1061b](https://github.com/hanzoai/js-sdk/commit/0d1061b2ba3e75fde3ec72d3ffb60c3c89160d2f))
* **mcp:** up tsconfig lib version to es2022 ([90fa795](https://github.com/hanzoai/js-sdk/commit/90fa7953f6e4eb3faf8e8afe7040560c64d644b5))
* migrate from yarn to pnpm ([e99cd9c](https://github.com/hanzoai/js-sdk/commit/e99cd9cceda9d516fcc5b15533c9b62a12a2f8ed))
* symlink AGENTS.md and CLAUDE.md to LLM.md ([38b7e00](https://github.com/hanzoai/js-sdk/commit/38b7e005f11a6f79607b797413bc0e1ef8e04968))
* update dependencies to latest ([3d1d0c4](https://github.com/hanzoai/js-sdk/commit/3d1d0c4df8148b68f1102055c23c58de7b98cad5))
* update mock server docs ([3074761](https://github.com/hanzoai/js-sdk/commit/307476120cbecefd78b1814a1b1abd44b19500c3))
* update placeholder string ([2cd73bd](https://github.com/hanzoai/js-sdk/commit/2cd73bd8c31f37e1a72fde7f83fe2959c0094285))


### Documentation

* add LLM.md project guide ([b2513b2](https://github.com/hanzoai/js-sdk/commit/b2513b2e479221a2856c629fc134808e9920eb04))

## 0.1.0-alpha.2 (2026-01-28)

Full Changelog: [v0.1.0-alpha.1...v0.1.0-alpha.2](https://github.com/hanzoai/js-sdk/compare/v0.1.0-alpha.1...v0.1.0-alpha.2)

### Features

* **api:** api update ([1486923](https://github.com/hanzoai/js-sdk/commit/1486923bc5c503300c8fda05d6ce772c3e521c7e))
* **api:** api update ([d1b5666](https://github.com/hanzoai/js-sdk/commit/d1b5666246733d1b2ec00ec1252f9a8a3275cbe3))
* **api:** api update ([7292a29](https://github.com/hanzoai/js-sdk/commit/7292a29ff6bd7b561810a1a993a24bdf7b40ee51))
* **api:** api update ([fb84cfe](https://github.com/hanzoai/js-sdk/commit/fb84cfe81daf3d308ce414dd7ecb487762c7b3a6))
* **client:** add withOptions helper ([6f444eb](https://github.com/hanzoai/js-sdk/commit/6f444ebe40f8a35d70e3ddd7493284611fdd51e9))
* **mcp:** include http information in tools ([c6e9ff0](https://github.com/hanzoai/js-sdk/commit/c6e9ff07236d9e7735d3a7d9c62798b4d5952c8c))
* **mcp:** support dynamically discovering and invoking tools for APIs with many endpoints ([84e9a23](https://github.com/hanzoai/js-sdk/commit/84e9a234f711d8b3ae52238de19c24d79dee407c))
* **mcp:** support initializing the server with an "environment" ([13367d8](https://github.com/hanzoai/js-sdk/commit/13367d838d35b2a7eba62a26a8251976b74aff3f))
* more gracefully handle $refs and work around schema limitations ([67b087d](https://github.com/hanzoai/js-sdk/commit/67b087d556c8e539614156644dc69e093ed82b8e))


### Bug Fixes

* **client:** always overwrite when merging headers ([e69c25f](https://github.com/hanzoai/js-sdk/commit/e69c25f3dbfdd5f3a2c828198ec406093552c495))
* **client:** send all configured auth headers ([#29](https://github.com/hanzoai/js-sdk/issues/29)) ([c98d1f5](https://github.com/hanzoai/js-sdk/commit/c98d1f56b8b5c0fa5b51dfa5f1823dfb236a4d71))
* compat with more runtimes ([4049270](https://github.com/hanzoai/js-sdk/commit/4049270a009642c33bcc28b9cf4e2ee783da16fe))
* **internal:** fix file uploads in node 18 jest ([7e9f58e](https://github.com/hanzoai/js-sdk/commit/7e9f58e55f3f5d707d41a199c7f6aa47ac1b52e6))
* **mcp:** allow falling back for required env variables ([2c7b782](https://github.com/hanzoai/js-sdk/commit/2c7b782c251327283adad50ae619213b3e54bc56))
* **mcp:** explicitly include zod and zod-to-json-schema in package.json ([89eaba8](https://github.com/hanzoai/js-sdk/commit/89eaba882940dec888f87ae9ed8f9e71dd669255))
* **mcp:** fix cursor schema transformation issue with recursive references ([8c8d632](https://github.com/hanzoai/js-sdk/commit/8c8d632fc526ac8a751fdb0b72b9418f4475e5ed))
* **mcp:** fix readEnv type error ([4614532](https://github.com/hanzoai/js-sdk/commit/461453296a0a96ca2794fe471a06dfe6a29882f1))
* **mcp:** include all necessary env vars in client instantiation ([f37e680](https://github.com/hanzoai/js-sdk/commit/f37e680fd81df7852b9d3273ad15b9ba83831d24))
* **mcp:** include description in dynamic tool search ([9e93905](https://github.com/hanzoai/js-sdk/commit/9e93905aed62b0a4b23051e52d6ef44a4f2c10b0))
* **mcp:** remove ajv dependency so MCP servers are more compatible with Cloudflare Workers ([442142c](https://github.com/hanzoai/js-sdk/commit/442142cb4fd5cf26593919571ca74d423e4a579a))


### Chores

* adjust eslint.config.mjs ignore pattern ([383ea0a](https://github.com/hanzoai/js-sdk/commit/383ea0aafa143b350d8fbd631d94a9c1ce12892c))
* **build:** automatically build subpackages if present ([c90857a](https://github.com/hanzoai/js-sdk/commit/c90857afd76583f2238e5628e3fc09b44341323b))
* **ci:** add timeout thresholds for CI jobs ([473c32b](https://github.com/hanzoai/js-sdk/commit/473c32b6928f61eed34e39921b7e0af376490114))
* **ci:** only use depot for staging repos ([da51f77](https://github.com/hanzoai/js-sdk/commit/da51f775f55be1eddc1fd3d4a237ad8d5a8efc0f))
* **client:** drop support for EOL node versions ([b35890a](https://github.com/hanzoai/js-sdk/commit/b35890a8e173c9ab6861995af0566afb12b6cc3e))
* **client:** minor internal fixes ([7325261](https://github.com/hanzoai/js-sdk/commit/7325261678e4dc8e736c0017221fd543863af962))
* configure new SDK language ([a325ceb](https://github.com/hanzoai/js-sdk/commit/a325ceb89b4af43e3e986e02d12bb18ede4a1bc7))
* **deps:** bump eslint-plugin-prettier ([028617f](https://github.com/hanzoai/js-sdk/commit/028617f8318843eb6c1937986ada19d9acaa4b7e))
* **docs:** grammar improvements ([8c33c00](https://github.com/hanzoai/js-sdk/commit/8c33c00266041b01f1792f225913e99d857d0375))
* **docs:** use top-level-await in example snippets ([d412b5d](https://github.com/hanzoai/js-sdk/commit/d412b5d36dd084e45a45f67c88ea2d17ee67b02a))
* improve docs for MCP servers ([9678ab3](https://github.com/hanzoai/js-sdk/commit/9678ab3e75f7d55a7ce36b60aef5c515f5b3548c))
* improve publish-npm script --latest tag logic ([ae19966](https://github.com/hanzoai/js-sdk/commit/ae199662a840cb0c5d9af6425a8f40edfe9da777))
* **internal:** codegen related update ([4af976f](https://github.com/hanzoai/js-sdk/commit/4af976ffa78c5be4541772529b4b044bb55800f4))
* **internal:** codegen related update ([86a23f3](https://github.com/hanzoai/js-sdk/commit/86a23f3d4a687d8f6aaabeb593fa0d4decc43931))
* **internal:** codegen related update ([7d53298](https://github.com/hanzoai/js-sdk/commit/7d532986520016f0b12783776c3af6d23e7e7898))
* **internal:** codegen related update ([2462e32](https://github.com/hanzoai/js-sdk/commit/2462e320deac694de1bb335bae46bea281801ec3))
* **internal:** codegen related update ([1d8103a](https://github.com/hanzoai/js-sdk/commit/1d8103a08cf8bb799ba574795b4e0887c087ca81))
* **internal:** codegen related update ([7459d8c](https://github.com/hanzoai/js-sdk/commit/7459d8cf34240a3f4668fb28363a5be5d15ca6a1))
* **internal:** codegen related update ([a5329ad](https://github.com/hanzoai/js-sdk/commit/a5329ad2efecdd0a08cb3de558f21ed3e1040e6a))
* **internal:** codegen related update ([5b99a9f](https://github.com/hanzoai/js-sdk/commit/5b99a9f4abe0bcd42f51574943d7db3a8c523518))
* **internal:** codegen related update ([31a31e5](https://github.com/hanzoai/js-sdk/commit/31a31e54c2a6dc92aa95b19343482364c52a21ab))
* **internal:** codegen related update ([c24aef9](https://github.com/hanzoai/js-sdk/commit/c24aef931e8f5f1dc4c96a1fadecbd2ea6ec7c8c))
* **internal:** fix readablestream types in node 20 ([cbc2d23](https://github.com/hanzoai/js-sdk/commit/cbc2d23a8b8a36e72556e8264b51a060de7e46fd))
* **internal:** improve node 18 shims ([fafe47b](https://github.com/hanzoai/js-sdk/commit/fafe47ba77ff58e83494fe19907fd5e52e8986c8))
* **internal:** reduce CI branch coverage ([76a5a25](https://github.com/hanzoai/js-sdk/commit/76a5a25b302269bd4e430c8faf20bc8444d9bbcf))
* **internal:** refactor utils ([c2af104](https://github.com/hanzoai/js-sdk/commit/c2af104a19548e1c75bb92f090eb62f0f7b4cfc0))
* **internal:** share typescript helpers ([41e0e63](https://github.com/hanzoai/js-sdk/commit/41e0e6322b8d08fce0fc393715a2f75b0087e8f8))
* **internal:** update jest config ([c259c2d](https://github.com/hanzoai/js-sdk/commit/c259c2d85cb0bb1e70471fb8538739f67f860e61))
* **internal:** upload builds and expand CI branch coverage ([735816d](https://github.com/hanzoai/js-sdk/commit/735816d2aebc298780fdcce87f73daf4b9588a9e))
* **mcp:** remove duplicate assignment ([b078347](https://github.com/hanzoai/js-sdk/commit/b0783479785247c60042acf5ee5a81aa111ee55d))
* **package:** remove engines ([786b86b](https://github.com/hanzoai/js-sdk/commit/786b86b62444f0a5e54963003fd8a5447415fd4f))
* **perf:** faster base64 decoding ([797a48f](https://github.com/hanzoai/js-sdk/commit/797a48f6dee3d0121abde4c318b48a028103424c))
* **tests:** use node 22 for CI tests ([6390c76](https://github.com/hanzoai/js-sdk/commit/6390c76edc1b93aa2931190f1ea213e8b1a8ad9f))


### Documentation

* **readme:** fix typo ([804ae2d](https://github.com/hanzoai/js-sdk/commit/804ae2d363c0f7615ccd56bcdafb057320290dd5))

## 0.1.0-alpha.1 (2025-04-05)

Full Changelog: [v0.0.1-alpha.3...v0.1.0-alpha.1](https://github.com/hanzoai/js-sdk/compare/v0.0.1-alpha.3...v0.1.0-alpha.1)

### Features

* **mcp:** export server and tools for more customizability ([#15](https://github.com/hanzoai/js-sdk/issues/15)) ([2e8676d](https://github.com/hanzoai/js-sdk/commit/2e8676d2d549b34e27517bda86641be599a4886d))
* **mcp:** handle recursive schemas ([#17](https://github.com/hanzoai/js-sdk/issues/17)) ([b6750c4](https://github.com/hanzoai/js-sdk/commit/b6750c43bf37720efd704ab412926379100328a5))
* **mcp:** support end-user filtering of tools, resources, and tags ([#19](https://github.com/hanzoai/js-sdk/issues/19)) ([651e2fe](https://github.com/hanzoai/js-sdk/commit/651e2fe07934ac7213b180c9fb33b73162f3dd34))


### Bug Fixes

* **api:** improve type resolution when importing as a package ([#21](https://github.com/hanzoai/js-sdk/issues/21)) ([bc10acd](https://github.com/hanzoai/js-sdk/commit/bc10acd6d8d596114c9da8004a0509dc7ef0227d))
* **client:** send `X-Stainless-Timeout` in seconds ([#18](https://github.com/hanzoai/js-sdk/issues/18)) ([9c80199](https://github.com/hanzoai/js-sdk/commit/9c80199336040435717e190514b0ec64f0dc7dc2))
* **mcp:** normalize tool names ([#23](https://github.com/hanzoai/js-sdk/issues/23)) ([bea5449](https://github.com/hanzoai/js-sdk/commit/bea5449a53abce17230dd2e8ab201fa6234e6ad7))
* **mcp:** remove debug logging ([#25](https://github.com/hanzoai/js-sdk/issues/25)) ([8819d12](https://github.com/hanzoai/js-sdk/commit/8819d1250195175034ca755249748012a42b9e00))


### Chores

* **internal:** add aliases for Record and Array ([#20](https://github.com/hanzoai/js-sdk/issues/20)) ([60fb9dd](https://github.com/hanzoai/js-sdk/commit/60fb9dd5b41b550f1ee243fba6bc17524b6bd33a))
* **internal:** codegen related update ([#26](https://github.com/hanzoai/js-sdk/issues/26)) ([da672b6](https://github.com/hanzoai/js-sdk/commit/da672b6d9f0f215dddd5614760b5907d7e021d75))
* **internal:** improve index signature formatting ([#24](https://github.com/hanzoai/js-sdk/issues/24)) ([f6ba126](https://github.com/hanzoai/js-sdk/commit/f6ba1266b5023274cf6c0311097a45c32cd73eb3))


### Documentation

* **mcp:** improve MCP readme docs ([#22](https://github.com/hanzoai/js-sdk/issues/22)) ([397a757](https://github.com/hanzoai/js-sdk/commit/397a757375c3d6ed11436342c945854cf0c3772a))
* **mcp:** update env vars in README ([#27](https://github.com/hanzoai/js-sdk/issues/27)) ([e55c797](https://github.com/hanzoai/js-sdk/commit/e55c7975c63dad028868ad24cdaba34a93aa0fce))

## 0.0.1-alpha.3 (2025-03-27)

Full Changelog: [v0.0.1-alpha.2...v0.0.1-alpha.3](https://github.com/hanzoai/js-sdk/compare/v0.0.1-alpha.2...v0.0.1-alpha.3)

### Chores

* remove custom code ([87408fc](https://github.com/hanzoai/js-sdk/commit/87408fcb4f1a322dfd7add29d465a8c11750b5cd))

## 0.0.1-alpha.2 (2025-03-27)

Full Changelog: [v0.0.1-alpha.1...v0.0.1-alpha.2](https://github.com/hanzoai/js-sdk/compare/v0.0.1-alpha.1...v0.0.1-alpha.2)

### Chores

* update SDK settings ([#3](https://github.com/hanzoai/js-sdk/issues/3)) ([532ef94](https://github.com/hanzoai/js-sdk/commit/532ef944f9dd3bf86abbb99599651bfb143559a5))

## 0.0.1-alpha.1 (2025-03-26)

Full Changelog: [v0.0.1-alpha.0...v0.0.1-alpha.1](https://github.com/hanzoai/js-sdk/compare/v0.0.1-alpha.0...v0.0.1-alpha.1)

### Chores

* configure new SDK language ([63468b7](https://github.com/hanzoai/js-sdk/commit/63468b7a372f65581a7a047ba196dc7edbb12842))
* configure new SDK language ([4b30128](https://github.com/hanzoai/js-sdk/commit/4b30128ad4bf0ce140d12e6f6ae340f6f1a00d27))
* go live ([#1](https://github.com/hanzoai/js-sdk/issues/1)) ([c9de435](https://github.com/hanzoai/js-sdk/commit/c9de4352c9601a4abfe9702cf1148e39fd116d4b))
