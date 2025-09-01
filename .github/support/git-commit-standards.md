# Git Commit Standards for AI

## Commit Message Format

### Conventional Commits Standard

All commit messages must be in English and follow the conventional commit format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Commit Types

- `feat`: A new feature for the user
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process, auxiliary tools, or dependencies

### Examples for AI to Suggest

```bash
# ✅ CORRECT commit messages
git commit -m "feat: add user authentication with NextAuth"
git commit -m "fix: resolve hydration mismatch in theme provider"
git commit -m "style: update button component variants"
git commit -m "refactor: extract form validation logic to utils"
git commit -m "docs: update API documentation for user endpoints"
git commit -m "test: add unit tests for auth middleware"
git commit -m "chore: update dependencies to latest versions"

# With scope for better organization
git commit -m "feat(auth): implement OAuth login flow"
git commit -m "fix(ui): resolve button accessibility issues"
git commit -m "style(components): standardize spacing in cards"
git commit -m "perf(images): optimize hero image loading"
git commit -m "refactor(api): simplify user data fetching"

# With body for complex changes
git commit -m "feat: implement real-time notifications

Add WebSocket connection for live updates
Include notification preferences in user settings
Add toast notifications for immediate feedback

Closes #123"
```

### Scope Guidelines

Use scopes to indicate which part of the codebase is affected:

- `auth`: Authentication and authorization
- `ui`: User interface components
- `api`: API routes and external API integration
- `db`: Database schema and queries
- `components`: React components
- `hooks`: Custom React hooks
- `utils`: Utility functions
- `config`: Configuration files
- `deps`: Dependencies updates

## Branch Naming Convention

### Feature Branches

```bash
# New features
feat/user-authentication
feat/dashboard-analytics
feat/payment-integration

# Bug fixes
fix/login-redirect-issue
fix/mobile-navigation
fix/image-optimization

# Improvements
improve/loading-performance
improve/accessibility
improve/error-handling

# Documentation
docs/api-documentation
docs/setup-guide
docs/contributing
```

### Development Workflow

```bash
# Create and switch to new feature branch
git switch -c feat/new-feature

# Make changes and commit with proper messages
git add .
git commit -m "feat: add new feature implementation"

# Push branch for review
git push origin feat/new-feature

# After review, merge to main
git switch main
git merge feat/new-feature
git branch -d feat/new-feature
```

## AI Commit Message Guidelines

When suggesting commit messages:

1. **Use imperative mood** - "add feature" not "added feature"
2. **Keep first line under 50 characters** - For better readability
3. **Use lowercase** - Except for proper nouns and acronyms
4. **Be specific and descriptive** - Explain what the change does
5. **Include scope when relevant** - Helps with code organization
6. **Reference issues when applicable** - Use "Closes #123" or "Fixes #456"
7. **Use conventional types** - Always use the standard types listed above
8. **Add body for complex changes** - Explain why and how for significant changes

### Examples by Change Type

#### New Features

```bash
git commit -m "feat: add dark mode toggle to header"
git commit -m "feat(auth): implement social login with Google"
git commit -m "feat(dashboard): add real-time analytics charts"
```

#### Bug Fixes

```bash
git commit -m "fix: resolve mobile menu not closing on route change"
git commit -m "fix(forms): handle validation errors properly"
git commit -m "fix(api): prevent duplicate user registration"
```

#### Performance Improvements

```bash
git commit -m "perf: implement image lazy loading for gallery"
git commit -m "perf(api): add database query optimization"
git commit -m "perf: reduce bundle size with dynamic imports"
```

#### Refactoring

```bash
git commit -m "refactor: extract common form validation logic"
git commit -m "refactor(components): simplify button component API"
git commit -m "refactor: move auth utilities to separate module"
```

#### Documentation

```bash
git commit -m "docs: add installation guide to README"
git commit -m "docs(api): update endpoint documentation"
git commit -m "docs: add contributing guidelines"
```

#### Dependencies and Configuration

```bash
git commit -m "chore: update Next.js to version 15"
git commit -m "chore(deps): bump security dependencies"
git commit -m "chore: configure ESLint and Prettier"
```

## AI Integration Rules

1. **Always suggest conventional commits** - Use the proper format
2. **Include appropriate scope** - When the change affects a specific area
3. **Write clear descriptions** - Make the purpose of the change obvious
4. **Use present tense imperative** - "add" not "added" or "adds"
5. **Be consistent with existing patterns** - Match the project's commit history
6. **Include breaking change notation** - Use "BREAKING CHANGE:" in footer when applicable
7. **Reference related issues** - Include issue numbers when relevant
8. **Keep commits atomic** - One logical change per commit
