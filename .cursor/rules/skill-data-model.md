---
description: Enforces the skill data model in app.js per the Agent Skills spec (agentskills.io/specification). Apply when adding, editing, or reviewing skills in the skills array.
globs:
  - app.js
---

# Skill Data Model

Every entry in the `skills` array **must** have these fields:

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `id` | string | yes | Unique identifier (`fy-N` for For You, `pop-N` for Popular) |
| `emoji` | string | yes | Fallback emoji (kept for data completeness) |
| `name` | string | yes | Human-readable skill name — slugified for SKILL.md `name` field |
| `desc` | string | yes | One-sentence description — used as SKILL.md `description` frontmatter |
| `longDesc` | string | yes | Expanded description for the detail view |
| `category` | string | yes | One of: `Coding`, `Writing`, `Research`, `Design`, `Productivity`, `Data` |
| `source` | string | yes | Origin label: `Official`, `Community`, or `Cursor` |
| `section` | string | yes | `"forYou"` or `"popular"` |
| `features` | string[] | yes | 3–5 bullet points describing capabilities |
| `prompt` | string | yes | The full system prompt — this is what gets copied |

## Agent Skills Spec Compliance

The app generates SKILL.md output via `formatAsSkillMd(skill)`. All skills must comply with the [Agent Skills specification](https://agentskills.io/specification):

### `name` field (derived from `skill.name` via `toSkillSlug`)

- Max 64 characters
- Lowercase letters, numbers, and hyphens only (`a-z`, `0-9`, `-`)
- Must NOT start or end with a hyphen
- Must NOT contain consecutive hyphens (`--`)
- Keep `skill.name` concise so the slug stays under 64 chars

### `description` field (from `skill.desc`)

- Max 1024 characters
- Written in third person ("Analyzes code…" not "I analyze code…")
- Must describe both WHAT the skill does and WHEN to use it
- Include specific keywords that help agents identify relevant tasks

### `prompt` field (becomes the markdown body)

- Self-contained — must work as a standalone system instruction
- Never include YAML frontmatter inside `prompt` — the app wraps it automatically
- Keep under 500 lines for optimal agent performance (per spec's progressive disclosure guidance)

## Generated SKILL.md Format

```
---
name: <toSkillSlug(skill.name)>
description: <skill.desc, truncated to 1024 chars>
---

# <skill.name>

<skill.prompt>
```

## Icon Requirement

Every skill `id` must have a matching entry in `ICON_MAP` with:
- `grad`: two-color gradient array (muted earth tones)
- `path`: white SVG line-art illustration (viewBox 0 0 48 48)
