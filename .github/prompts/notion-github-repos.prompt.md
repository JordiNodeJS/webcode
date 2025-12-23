---
name: Notion Github Repository Manager
description: Prompt to manage and update the "Github repository" database in Notion using MCP.
---

# Notion Github Repository Manager

This prompt provides context and instructions for managing the "Github repository" database in Notion using the Model Context Protocol (MCP).

## Database Context

- **Name**: 📗 Github repository
- **Database ID**: `238f4dc3-b462-80a5-bda5-c2a661bd7d1e`
- **Data Source ID**: `238f4dc3-b462-8167-921b-000b0efc790a`
- **Notion URL**: [https://www.notion.so/238f4dc3b46280a5bda5c2a661bd7d1e](https://www.notion.so/238f4dc3b46280a5bda5c2a661bd7d1e)

### Schema (SQLite Table Definition)

```sql
CREATE TABLE IF NOT EXISTS "collection://238f4dc3-b462-8167-921b-000b0efc790a" (
	url TEXT UNIQUE,
	createdTime TEXT,
	"Website" TEXT,
	"Tags" TEXT, -- JSON array: ["PRD", "Post", "Decision doc", "Strategy doc", "Tech spec"]
	"Repositorio" TEXT,
	"Last edited" TEXT NOT NULL,
	"Name" TEXT
)
```

## Instructions for GitHub Copilot

### 1. Context Awareness

Always consider the "Github repository" database as the source of truth for repositories managed by the user. When the user mentions "my repositories" or "the repo database", refer to this Notion database.

### 2. Adding New Repositories

When the user creates a new project or asks to "save this repo to Notion", use the `mcp_notion_notion-create-pages` tool with the following parameters:

- **Parent**: `{"data_source_id": "238f4dc3-b462-8167-921b-000b0efc790a"}`
- **Properties**:
  - `Name`: The name of the repository.
  - `Repositorio`: The full GitHub URL (e.g., `https://github.com/JordiNodeJS/repo-name`).
  - `Tags`: (Optional) Select from `PRD`, `Post`, `Decision doc`, `Strategy doc`, `Tech spec`.
  - `Website`: (Optional) Deployment URL if available.

### 3. Preventing Duplicates

Before creating a new entry, perform a search using `mcp_notion_search` with the repository name or URL to ensure it doesn't already exist.

### 4. Updating Repositories

If the user wants to update tags or the website URL for an existing repository:

1. Find the page ID using `mcp_notion_search`.
2. Use `mcp_notion_update_page` to modify the properties.

### 5. Listing Repositories

To list repositories, use `mcp_notion_fetch` with the Database ID `238f4dc3-b462-80a5-bda5-c2a661bd7d1e` to get the latest entries.
