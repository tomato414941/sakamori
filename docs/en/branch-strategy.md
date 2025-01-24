# Branch Strategy

We adopt a simple two-layer structure optimized for rapid development.

## Branch Structure
- `main`: Production branch (always maintained in a deployable state)
- `feature/*`: Feature development branches (branched from `main` and merged directly back to `main`)

## Development Flow
- Major feature development: Create a `feature/*` branch
- Minor changes: Commit directly to `main`
- Release management: Managed with tags (e.g., `v1.0.0`, `v1.0.1`)

## Commit Message Convention
- `feat:` Add new features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Add or modify test code
- `chore:` Changes to build process or tools
