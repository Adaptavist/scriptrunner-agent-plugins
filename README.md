# ScriptRunner plugin for Claude Code and Codex

Work on ScriptRunner from your coding agent. The `scriptrunner` plugin gives Claude Code and Codex two things:

- **The ScriptRunner for Jira Cloud MCP server**, so your agent can explore and change listeners, scheduled jobs, workflow rules, behaviours, and Script Manager files, test a scripted field, and read execution logs to find out why a script failed.
- **ScriptRunner skills**: documentation, example scripts, platform guidance, Jira expressions, ScriptRunner Connect, and Atlassian REST API specs for Cloud and Data Center.

## Install

Claude Code:

```bash
claude plugin marketplace add https://github.com/Adaptavist/scriptrunner-agent-plugins.git
claude plugin install scriptrunner@scriptrunner
```

Codex:

```bash
codex plugin marketplace add https://github.com/Adaptavist/scriptrunner-agent-plugins.git
codex plugin add scriptrunner@scriptrunner
```

Start a new session afterwards.

## Connect to your Jira Cloud site

The skills work straight away, including for Data Center, Confluence, and ScriptRunner Connect. The MCP server needs two more steps.

**1. A site admin turns on MCP tools.** They're off by default, and this is needed once per site:

1. Go to [admin.atlassian.com](https://admin.atlassian.com) and pick your organisation.
2. Select **Apps** → **Sites**, then pick your site.
3. Select **Connected apps**.
4. Find **ScriptRunner for Jira** and select **View app details**.
5. On the **Details** tab, under **Expose tools to MCP-compatible apps**, select **Enable tools**.

**2. You sign in.** In Claude Code, run `/mcp`, choose `plugin:scriptrunner:scriptrunner`, and select **Authenticate**. In Codex, run `codex mcp login scriptrunner`. Sign in with your Atlassian account, pick your site, and select **Accept**.

If your agent connects but can't see any ScriptRunner tools, step 1 hasn't been done yet.

## Good to know

- Your agent works as you, with your Jira permissions, and its changes go live straight away. Try things on a test site first.
- Changes made through MCP don't appear in the ScriptRunner audit log yet.
- The MCP server covers ScriptRunner for Jira Cloud only. Script fragments, the Script Console, and built-in scripts aren't supported yet.

Full guide: [Connect AI agents to ScriptRunner for Jira Cloud with MCP](https://docs.adaptavist.com/sr4jc/latest/features/ai-and-agents/connect-ai-agents-to-scriptrunner-for-jira-cloud-with-mcp/).

## Update

```bash
claude plugin marketplace update scriptrunner
claude plugin update scriptrunner@scriptrunner

codex plugin marketplace upgrade scriptrunner
codex plugin add scriptrunner@scriptrunner
```

## Only want the skills?

They're also available for any agent that supports skills:

```bash
npx skills add Adaptavist/scriptrunner-skills
```

## Contributing

`plugins/scriptrunner/` is published automatically and rewritten on every release, so changes made there directly will be lost. To report a problem or suggest a change, [contact ScriptRunner support](https://the-adaptavist-group-support.atlassian.net/servicedesk/customer/portal/27).

[Privacy policy](https://www.theadaptavistgroup.com/policy/privacy)
