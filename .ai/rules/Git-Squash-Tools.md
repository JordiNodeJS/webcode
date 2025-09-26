---
trigger: manual
---

# Git Squash Tools WebSnack

## Git Squash Strategy and Merge Compatibility

### Script Capabilities

- `git-squash-branch.sh` and `git-rebase-squash.sh` support merging with main branch by preserving common ancestry via reset --soft and rebase methods
- `git-simple-squash.sh` originally created orphan branches (no common history), breaking merge capability, but has been updated to use reset --soft, making it merge-compatible

### Standardized Process for Workflow Compatibility

1. **Problem Identification**: Detect merge incompatibility after squash operations
2. **Script Analysis**: Examine automation scripts for implementation methods
3. **Root Cause Diagnosis**: Identify lack of common history in orphan branches as root cause
4. **Solution Assessment**: Compare methods: orphan (incompatible) vs. reset/rebase (compatible)
5. **Recommendation**: Use reset --soft or rebase for merge-compatible squashing
6. **Implementation**: Modify scripts to adopt reset --soft approach
7. **Automated Testing**: Validate in isolated environment
8. **Production Validation**: Test in real repository with actual branches
9. **Final Verification**: Confirm merge capability and history preservation
10. **Documentation**: Record findings and best practices

## Available Scripts

### git-simple-squash.sh

- **Purpose**: Simple squash operation with merge compatibility
- **Method**: Uses reset --soft (updated from orphan branch)
- **Use case**: Quick squash operations while preserving history

### git-squash-branch.sh

- **Purpose**: Safe squash with automatic backups
- **Method**: reset --soft with branch backup
- **Use case**: Important branches requiring safety measures

### git-rebase-squash.sh

- **Purpose**: Interactive rebase squash
- **Method**: rebase -i with squash commits
- **Use case**: Standard workflow integration with commit message editing

## Best Practices

1. **Backup important branches**: Before using any squash operation on critical branches

```bash
git branch backup-branch-name
```

2. **Avoid squashing shared branches**: Do not squash branches being used by other team members without coordination

3. **Use appropriate scripts for context**:
   - Use `git-simple-squash.sh` for experimental branches
   - Use `git-squash-branch.sh` for important branches (creates automatic backups)
   - Use `git-rebase-squash.sh` for standard workflow integration

## Example Usage

```bash
# Simple squash (with backup)
./scripts/git-simple-squash.sh feature/new-button

# Safe squash with automatic backup
./scripts/git-squash-branch.sh feature/user-authentication

# Interactive rebase squash
./scripts/git-rebase-squash.sh feature/api-integration
```

## Merge Compatibility Verification

After any squash operation, verify merge capability:

```bash
# Check if branch can merge with main
git checkout main
git merge --no-ff --no-commit your-squashed-branch
git merge --abort  # Cancel the test merge
```

## Troubleshooting

### Problem: Merge conflicts after squash

**Solution**: Ensure common history is preserved using reset --soft method

### Problem: Orphan branch created

**Solution**: Use updated scripts that implement reset --soft instead of --orphan

### Problem: Lost commit history

**Solution**: Restore from backup branch created by git-squash-branch.sh

## Related Files

- `scripts/git-simple-squash.sh`
- `scripts/git-squash-branch.sh`
- `scripts/git-rebase-squash.sh`
- `scripts/test-git-simple-squash.sh`
