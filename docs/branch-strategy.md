# Branch Strategy

A simple two-tier structure optimized for rapid development.

## Branch Structure
- `main`: Production branch, always deployable
- `feature/*`: Feature development branches, branch from and merge directly to `main`

## Development Flow
- Major features: Create `feature/*` branch
- Minor changes: Commit directly to `main`
- Releases: Managed with tags (`v1.0.0`, `v1.0.1`, etc.)

## Commit Messages
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Test code
- `chore:` Build and tools
