---
name: scriptrunner-mcp-setup
description: Connect the ScriptRunner for Jira Cloud MCP server. Use when the scriptrunner MCP tools are missing, need authentication, or report that an admin must enable external MCP access, or when the user asks how to connect their agent to ScriptRunner.
---

# Connect to ScriptRunner for Jira Cloud

This plugin includes the ScriptRunner for Jira Cloud MCP server
(`https://mcp.atlassian.com/forge/1dd33d5a-4685-4816-9851-1b36b2fb3dbd`). Its
tools let you read and change ScriptRunner configuration on the user's Jira
Cloud site. Two things have to happen before they work, and only the user can
do them.

## 1. A site admin turns on MCP tools (once per site)

MCP tools are off by default on every Jira Cloud site. If the server connects
but you see no `sr-` tools, or a tool says an admin must enable external MCP
access, this step has not been done. Ask the user to have an Atlassian
organisation or site admin do this:

1. Go to https://admin.atlassian.com and pick the organisation.
2. Select **Apps** → **Sites**, then pick the site.
3. Select **Connected apps**.
4. Find **ScriptRunner for Jira** and select **View app details**.
5. On the **Details** tab, scroll to **Expose tools to MCP-compatible apps** and
   select **Enable tools**.

## 2. The user signs in

The server uses the user's own Atlassian account and Jira permissions.

- Claude Code: run `/mcp`, choose `plugin:scriptrunner:scriptrunner`, and select
  **Authenticate**.
- Codex: run `codex mcp login scriptrunner`.

The browser asks them to sign in, pick the site, and select **Accept**. Start a
new session afterwards if the tools still don't appear.

## Before changing anything

- Changes go live straight away, with the user's permissions. Suggest a test
  site for trying things out, and confirm before calling a tool that creates,
  updates, or deletes configuration.
- Changes made through MCP are not in the ScriptRunner audit log yet, so tell
  the user what you changed.
- The MCP server covers ScriptRunner for Jira Cloud only. Script fragments, the
  Script Console, and built-in scripts are not supported yet. For Data Center,
  Confluence, or ScriptRunner Connect, use the other skills in this plugin.
- Call `sr-check-agent-access` only to diagnose an access problem.

Full guide: https://docs.adaptavist.com/sr4jc/latest/features/ai-and-agents/connect-ai-agents-to-scriptrunner-for-jira-cloud-with-mcp/
