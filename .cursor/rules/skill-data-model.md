---
description: Enforces the skill data model in app.js. Apply when adding, editing, or reviewing skills in the skills array.
globs:
  - app.js
---

# Skill Data Model

Every entry in the `skills` array **must** have these fields:

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `id` | string | yes | Unique identifier (`fy-N` for For You, `pop-N` for Popular) |
| `emoji` | string | yes | Fallback emoji (kept for data completeness) |
| `name` | string | yes | Human-readable skill name |
| `desc` | string | yes | One-sentence description — also used as the SKILL.md `description` frontmatter |
| `longDesc` | string | yes | Expanded description for the detail view |
| `category` | string | yes | Must be one of: `Coding`, `Writing`, `Research`, `Design`, `Productivity`, `Data` |
| `source` | string | yes | Origin label: `Official`, `Community`, or `Cursor` |
| `section` | string | yes | `"forYou"` or `"popular"` |
| `features` | string[] | yes | 3–5 bullet points describing capabilities |
| `prompt` | string | yes | The full system prompt — this is what gets copied |

## SKILL.md Compatibility

The `formatAsSkillMd(skill)` function generates valid SKILL.md output from any skill:

```
---
name: <slugified skill.name>
description: <skill.desc>
---

# <skill.name>

<skill.prompt>
```

### Rules

- `name` must slugify to a valid SKILL.md name: max 64 chars, lowercase letters/numbers/hyphens only.
- `desc` must be ≤ 1024 chars and written in third person ("Analyzes code…" not "I analyze code…").
- `prompt` must be self-contained — it should work as a standalone system instruction without any other context.
- Never include YAML frontmatter inside `prompt` — the app wraps it automatically.

## Icon Requirement

Every skill `id` must have a matching entry in `ICON_MAP` with:
- `grad`: two-color gradient array (muted earth tones)
- `path`: white SVG line-art illustration (viewBox 0 0 48 48)
