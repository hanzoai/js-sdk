# Hanzo TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Via Claude Desktop

See [the user guide](https://modelcontextprotocol.io/quickstart/user) for setup.

Once it's set up, add your MCP server to your `claude_desktop_config.json` file to enable it.

The configuration file should be at:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Add the following value to your `mcpServers` section. Make sure to provide any necessary environment variables (like API keys) as well.

```json
{
  "mcpServers": {
    "hanzo_api": {
      "command": "npx",
      "args": ["-y", "git+ssh://git@github.com:stainless-sdks/Hanzo-AI-typescript.git:packages/mcp-server"],
      "env": {
        "HANZO_API_KEY": "My API Key"
      }
    }
  }
}
```
