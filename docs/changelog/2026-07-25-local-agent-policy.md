# Local agent-instruction policy

- **Date:** 2026-07-25
- **Status:** Implemented
- **Commit:** `cfb6bd1`

## Summary

Changed `.gitignore` so the root `AGENTS.md` remains a local project-control
file rather than a tracked product file.

## Reason

The development environment consumes the instructions locally, while the
repository's durable public-facing policies live in tracked project
documentation.

## Dynamic SPD comparison

- **Reference paths:** none; this is workspace-agent configuration rather than
  a game or build system.
- **What Dynamic SPD does:** no corresponding agent-instruction convention is
  part of the reference implementation.
- **Decision here:** no runtime comparison applies. Architectural rules from
  the local file are duplicated where needed in tracked documentation,
  especially `docs/IMPLEMENTATION.md` and this changelog policy.
- **Divergence level:** none.

## System fit

Ignoring the file keeps local automation concerns outside the shipped game
while ensuring the important SPD gate and research rules still have tracked
counterparts.

## Research and assets

None.

## Validation

`git check-ignore AGENTS.md` confirms the intended ignore rule.
