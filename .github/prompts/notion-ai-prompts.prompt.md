---
name: Notion AI Coding Prompts Manager
description: Prompt to manage and organize the "AI Coding Prompts" page in Notion using MCP.
---

# Notion AI Coding Prompts Manager

This prompt provides context and instructions for managing the "AI Coding Prompts" page in Notion using the Model Context Protocol (MCP).

## Page Context

- **Name**: AI Coding Prompts
- **Page ID**: `1b0f4dc3-b462-806f-a45c-cd2f396056fa`
- **Notion URL**: [https://www.notion.so/1b0f4dc3b462806fa45ccd2f396056fa](https://www.notion.so/1b0f4dc3b462806fa45ccd2f396056fa)

## Database: AI Prompts Repository

- **Database ID**: `83ef41cc-7a47-4a27-85c0-9b286fabbfbc`
- **Database URL**: [https://www.notion.so/83ef41cc7a474a2785c09b286fabbfbc](https://www.notion.so/83ef41cc7a474a2785c09b286fabbfbc)
- **Location**: Under "AI Coding Prompts" page
- **Purpose**: Centralized repository of all AI prompts and agents from the `.github` folder

### Database Schema

The database contains the following properties:

- **Name** (Title): Name of the prompt file
- **Category** (Select): Classification (Development, DevTools, Git & GitHub, Database, Documentation, Notion & MCP, Testing, Learning)
- **Type** (Select): Type of file (Prompt, Agent, Guide)
- **Description** (Text): Brief description of the prompt's purpose
- **File Path** (Text): Relative path in the repository
- **Tags** (Multi-select): Keywords for filtering (MCP, GitHub, PR, Neon, Notion, Next.js, DevTools, Automation, Memory, Teaching)
- **Project** (Relation): Links to the GitHub repository in the "📗 Github repository" database
- **Created** (Created Time): Timestamp of when the entry was added

### Managing the Database

When adding new prompts from `.github/prompts/` or `.github/agents/`:

1. **Create entry**: Use `mcp_notion_notion-create-pages` with parent as the database data source
2. **Set properties**: Include all metadata (Category, Type, Tags, File Path, Project link)
3. **Add content**: Include the full prompt text in the page content
4. **Link project**: Always link the prompt to its corresponding repository using the Project relation field

## Purpose

This page serves as a **knowledge hub** for:

- GitHub Copilot custom instructions and prompt files (`.github/prompts/`)
- Custom agents configuration in VS Code
- MCP (Model Context Protocol) documentation and tools
- Best practices for AI-assisted coding
- Links to related pages and resources

## Key Sections

### 1. Workflow GitHub

- Contains references to the `.github` folder structure
- Documents the organization of workflow files

### 2. Copilot Instructions

- Central documentation about `.github/copilot-instructions.md`
- Links to VS Code Copilot customization docs
- Integrates with the "Copilot-instructions.md - Prompt automatiza update" page

### 3. Prompts Directory

- Storage location: `.github/prompts/`
- Maintains list of prompt file examples
- References "Usefull Prompts - PR's" page

### 4. Custom Agents

- Documentation on VS Code custom agents
- Configuration guidelines for different roles
- Handoffs between agents (planning, implementation, review)

### 5. MCP & Context7

- Context7 service documentation (up-to-date library docs)
- MCP tools and integrations
- References to 15,000+ library documentation sources

### 6. Memory Bank Technique

- Techniques for managing large project contexts
- References to Roo Code, Cline memory bank patterns

## Instructions for GitHub Copilot

### 1. Maintaining the Knowledge Hub

When working with AI coding prompts, keep the "AI Coding Prompts" page updated with:

- New prompt files created in `.github/prompts/`
- Updates to MCP tools and services
- New discovery of relevant documentation or resources
- Links to successful prompt implementations

### 2. Adding References

Use `mcp_notion_notion-update-page` to add new content:

- Link to newly created prompt files
- Update section for new tools or frameworks
- Add references to related Notion pages (use `<page url="...">` syntax)

### 3. Organizing Sections

When adding significant new content:

1. **Determine the section**: Which category does it belong to (Workflows, Prompts, Tools, etc.)?
2. **Add entry**: Insert the new reference with appropriate formatting
3. **Update links**: Ensure cross-references to related pages are current
4. **Add metadata**: Include descriptions and tags for discoverability

### 4. Syncing with GitHub

When the user creates new prompt files in `.github/prompts/`:

1. Document them in the "Prompts Directory" section
2. Add the filename and description
3. Link the Notion page to the GitHub raw file if applicable

### 5. Resources & Tools

Always reference:

- Context7 (`https://context7.com/`) for latest library documentation
- GitHub Copilot documentation (`https://code.visualstudio.com/docs/copilot/`)
- Community resources mentioned on the page (Awesome Copilot, etc.)
