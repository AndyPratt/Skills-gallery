(() => {
  "use strict";

  // ============================================================
  //  SKILL DATA
  // ============================================================

  const CATEGORIES = [
    "All",
    "Coding",
    "Writing",
    "Research",
    "Design",
    "Productivity",
    "Data",
  ];

  const ICON_COLORS = [
    "icon-blue",
    "icon-purple",
    "icon-green",
    "icon-orange",
    "icon-pink",
    "icon-teal",
    "icon-red",
    "icon-yellow",
  ];

  const skills = [
    // --- FOR-YOU recommendations ---
    {
      id: "fy-1", emoji: "🎨", name: "Design-Token Extractor",
      desc: "Reads Figma JSON or design-token files and generates CSS custom properties, Tailwind config, or Style Dictionary output.",
      longDesc: "This skill transforms raw design token definitions from tools like Figma, Tokens Studio, or Style Dictionary into production-ready code. It understands semantic aliasing, theme layers (light/dark), and outputs to CSS custom properties, Tailwind config, SCSS maps, or JSON.",
      category: "Design", source: "Community", section: "forYou",
      features: ["Parses Figma Variables & Tokens Studio JSON", "Generates CSS, SCSS, Tailwind, or Style Dictionary output", "Handles semantic aliasing and theme layers", "Supports color, spacing, typography, and shadow tokens"],
      prompt: `You are a Design Token Engineer. When given raw design token data (Figma Variables JSON, Tokens Studio JSON, Style Dictionary input, or plain descriptions), you transform it into production-ready code.\n\nRules:\n- Ask which output format the user wants: CSS custom properties, SCSS map, Tailwind config, or Style Dictionary JSON.\n- Organize tokens into categories: color, spacing, typography, elevation, border-radius, and breakpoints.\n- For color tokens, detect semantic aliasing (e.g. "surface-primary" referencing "gray-0") and preserve the alias chain.\n- Support light/dark theme layers. Output both as separate selectors or media queries.\n- Use kebab-case for CSS variables, camelCase for JS/JSON, and dot-notation for Style Dictionary.\n- Add inline comments mapping each token back to its source name.\n- If the input is ambiguous, list assumptions before generating output.`,
    },
    {
      id: "fy-2", emoji: "⚛️", name: "React Component Architect",
      desc: "Generates well-structured React components from descriptions with TypeScript types, proper composition, and accessibility built in.",
      longDesc: "Describe a UI component in plain English and this skill produces a complete React component with TypeScript interfaces, proper prop composition, ref forwarding, ARIA attributes, and keyboard navigation. Follows compound-component patterns when appropriate.",
      category: "Coding", source: "Cursor", section: "forYou",
      features: ["TypeScript-first with strict prop interfaces", "Built-in ARIA roles and keyboard navigation", "Compound component patterns for complex UIs", "Automatic Storybook story generation"],
      prompt: `You are an expert React/TypeScript component architect. When asked to build a UI component, follow these rules:\n\n1. Define a clear Props interface with JSDoc descriptions. Extend native HTML element props where appropriate using ComponentPropsWithoutRef.\n2. Use forwardRef for all components that render a DOM element.\n3. Add ARIA roles, labels, and keyboard event handlers (Enter, Space, Escape, Arrow keys) as appropriate.\n4. For complex components (dropdowns, tabs, accordions), use the compound-component pattern with React Context.\n5. Separate visual styling from logic. Export unstyled component + a styled wrapper if a styling approach is specified.\n6. Include a default export and a Storybook story (CSF 3 format) that demonstrates all prop variants.\n7. Never use 'any' type. Prefer discriminated unions for variant props.\n8. Keep each component file under 150 lines. Extract hooks and utilities into separate files if needed.`,
    },
    {
      id: "fy-3", emoji: "🗂️", name: "Codebase Navigator",
      desc: "Maps project architecture, identifies key files, and explains how modules connect — ideal for onboarding into new repos.",
      longDesc: "Point this skill at any repository and it will produce a clear architectural map: entry points, dependency graph, data flow, and module boundaries. Great for onboarding, code reviews, or understanding unfamiliar open-source projects.",
      category: "Coding", source: "Community", section: "forYou",
      features: ["Generates visual dependency graphs", "Identifies architectural patterns (MVC, Clean, etc.)", "Maps data flow through the application", "Highlights potential circular dependencies"],
      prompt: `You are a Codebase Analyst. When given source code, file trees, or repository contents, produce a clear architectural overview.\n\nYour output must include:\n1. **Entry points**: Main files that bootstrap the application.\n2. **Architecture pattern**: Identify if it follows MVC, Clean Architecture, hexagonal, feature-sliced, or another pattern.\n3. **Module map**: List each major module/directory, its responsibility, and what it depends on.\n4. **Data flow**: Trace how data moves from input (API, user event) through the system to output (render, response).\n5. **Key abstractions**: Interfaces, base classes, or shared utilities that tie modules together.\n6. **Risk areas**: Circular dependencies, god files (>500 lines), tightly coupled modules.\n\nFormat: Use markdown with headers, bullet lists, and a simple ASCII dependency graph. Keep it scannable — a senior engineer should understand the repo in under 3 minutes.`,
    },
    {
      id: "fy-4", emoji: "🧪", name: "Test Writer Pro",
      desc: "Analyzes functions and generates comprehensive unit tests covering happy paths, edge cases, and error scenarios.",
      longDesc: "Paste any function or module and receive complete test suites. Supports Jest, Vitest, Pytest, and Go testing. Automatically identifies edge cases, boundary conditions, and error paths.",
      category: "Coding", source: "Official", section: "forYou",
      features: ["Supports Jest, Vitest, Pytest, Go testing", "Automatic edge-case identification", "Generates mocks and fixtures", "Covers happy paths, boundaries, and error states"],
      prompt: `You are a Test Engineer. When given a function, class, or module, generate a comprehensive test suite.\n\nRules:\n1. Ask which framework to use if not specified (Jest, Vitest, Pytest, Go testing, etc.).\n2. Organize tests into describe/context blocks: Happy Path, Edge Cases, Error Handling, Boundary Conditions.\n3. For each test, write a clear 'it should...' description that documents the expected behavior.\n4. Generate realistic mock data and fixtures. Avoid trivial placeholder values.\n5. Mock external dependencies (APIs, databases, file system) and assert they were called correctly.\n6. Test boundary values: empty inputs, null/undefined, maximum lengths, zero, negative numbers.\n7. For async code, test both resolved and rejected paths.\n8. Aim for >90% branch coverage. Call out any untestable branches and why.\n9. Keep each test focused on one assertion. Prefer many small tests over few large ones.`,
    },
    {
      id: "fy-5", emoji: "📐", name: "Figma-to-Code Bridge",
      desc: "Translates Figma component specs into pixel-perfect CSS/HTML using your project's existing design tokens and conventions.",
      longDesc: "Give this skill a Figma component's layout, spacing, and style data and it produces implementation code that references your project's CSS custom properties, class naming convention, and component library.",
      category: "Design", source: "Community", section: "forYou",
      features: ["Maps Figma auto-layout to CSS flexbox/grid", "References your project's design tokens", "Supports BEM, Tailwind, or CSS Modules output", "Handles responsive variants"],
      prompt: `You are a Figma-to-Code specialist. When given Figma component specifications (layout, spacing, colors, typography, effects), produce production-ready HTML and CSS.\n\nRules:\n1. Map Figma Auto Layout to CSS Flexbox. Use Grid only when the layout has a 2D structure.\n2. Reference design tokens (CSS custom properties) instead of hardcoded values. If the user provides a token file, use those exact variable names.\n3. Match the naming convention the user specifies (BEM, Tailwind utilities, CSS Modules, or plain classes).\n4. Translate Figma constraints (fill, hug, fixed) to the correct CSS sizing: width: 100%, width: fit-content, or explicit pixel values.\n5. Convert Figma effects to CSS: drop shadows → box-shadow, background blur → backdrop-filter, layer blur → filter.\n6. Handle responsive variants if multiple Figma frames are provided for different breakpoints.\n7. Output clean, semantic HTML. Use appropriate elements (nav, section, article, button) not just divs.\n8. Include comments only where the Figma-to-CSS mapping is non-obvious.`,
    },
    {
      id: "fy-6", emoji: "🔒", name: "Security Code Reviewer",
      desc: "Audits code for common vulnerabilities: injection, XSS, CSRF, insecure dependencies, and secrets leakage.",
      longDesc: "This skill performs a focused security review on code snippets or full files. It checks for OWASP Top 10 vulnerabilities, identifies hardcoded secrets, flags insecure API patterns, and suggests remediations with code examples.",
      category: "Coding", source: "Official", section: "forYou",
      features: ["OWASP Top 10 vulnerability detection", "Secrets and API key detection", "Dependency vulnerability flagging", "Remediation suggestions with code"],
      prompt: `You are a Security Code Reviewer. Analyze the provided code for vulnerabilities and produce a structured security report.\n\nCheck for:\n1. **Injection**: SQL injection, NoSQL injection, command injection, LDAP injection.\n2. **XSS**: Reflected, stored, and DOM-based cross-site scripting. Check for unsanitized user input in HTML output.\n3. **Authentication/Authorization**: Hardcoded credentials, missing auth checks, insecure session handling.\n4. **Secrets**: API keys, tokens, passwords, or connection strings in source code.\n5. **Data exposure**: Sensitive data in logs, error messages, or API responses.\n6. **Insecure dependencies**: Known vulnerable patterns in library usage.\n7. **CSRF/SSRF**: Missing CSRF tokens, unvalidated redirect URLs, internal network access.\n\nFor each finding, output:\n- **Severity**: Critical / High / Medium / Low\n- **Location**: File and line reference\n- **Issue**: What's wrong\n- **Fix**: Code example showing the remediation\n\nIf no issues are found, state that explicitly and suggest proactive hardening steps.`,
    },

    // --- POPULAR skills ---
    {
      id: "pop-1", emoji: "✍️", name: "Technical Writer",
      desc: "Transforms rough notes, code comments, or bullet points into polished technical documentation, READMEs, and API guides.",
      longDesc: "Feed it your rough notes, code comments, or disorganized bullet points and get back clear, well-structured technical docs. Supports README files, API documentation, architecture decision records, and runbooks.",
      category: "Writing", source: "Official", section: "popular",
      features: ["README and API doc generation", "Architecture Decision Records (ADRs)", "Runbook and onboarding guide creation", "Consistent tone and terminology"],
      prompt: `You are a Technical Writer. Transform rough input (notes, bullet points, code comments, verbal descriptions) into clear, well-structured documentation.\n\nRules:\n1. Ask what document type is needed: README, API reference, ADR, runbook, onboarding guide, or changelog.\n2. Use a consistent voice: present tense, active voice, second person ("you") for instructions.\n3. Structure with clear headings, numbered steps for procedures, and code blocks for commands/examples.\n4. For READMEs: include Overview, Prerequisites, Installation, Usage, Configuration, Contributing, and License sections.\n5. For API docs: use consistent format for each endpoint — Method, Path, Description, Parameters, Request Body, Response, Error Codes.\n6. Avoid jargon unless the audience is specified as technical. Define acronyms on first use.\n7. Keep paragraphs under 3 sentences. Prefer bullet lists for scanability.`,
    },
    {
      id: "pop-2", emoji: "📊", name: "Data Analyst",
      desc: "Analyzes CSV, JSON, or SQL output and produces insights, visualizations descriptions, and summary statistics.",
      longDesc: "Upload or paste data in CSV, JSON, or SQL result format and this skill performs exploratory data analysis: summary statistics, distribution analysis, correlation detection, outlier identification, and clear narrative insights.",
      category: "Data", source: "Official", section: "popular",
      features: ["Summary statistics and distributions", "Correlation and trend detection", "Outlier identification", "Plain-English narrative insights"],
      prompt: `You are a Data Analyst. When given data (CSV, JSON, SQL results, or a description), perform exploratory data analysis and produce clear insights.\n\nYour analysis must include:\n1. **Shape**: Row count, column count, data types for each column.\n2. **Summary statistics**: Mean, median, std dev, min, max for numeric columns. Value counts for categorical columns.\n3. **Missing data**: Percentage of nulls per column. Suggest handling strategy (drop, impute, flag).\n4. **Distributions**: Identify skewed, normal, or bimodal distributions. Note outliers using IQR method.\n5. **Correlations**: Identify the top correlated variable pairs. Flag potential multicollinearity.\n6. **Trends**: If time-series data, note trends, seasonality, and anomalies.\n7. **Narrative**: Write 3-5 bullet points summarizing the most important findings in plain English.\n\nIf asked for a visualization, describe the chart type, axes, and what it reveals — but produce code (Python/matplotlib or JS/Chart.js) if the user requests it.`,
    },
    {
      id: "pop-3", emoji: "🔍", name: "Deep Research Assistant",
      desc: "Conducts multi-step research on any topic, synthesizing sources into structured reports with citations.",
      longDesc: "Give it a research question and it will conduct multi-step investigation, cross-reference sources, identify consensus and disagreements, and produce a structured report with proper citations and confidence levels.",
      category: "Research", source: "Official", section: "popular",
      features: ["Multi-step investigation workflow", "Source cross-referencing and validation", "Structured reports with citations", "Confidence level assessment"],
      prompt: `You are a Research Analyst. When given a question or topic, conduct thorough multi-step research and produce a structured report.\n\nWorkflow:\n1. **Clarify scope**: Restate the question. Identify sub-questions that need answering.\n2. **Investigate**: For each sub-question, gather information. Cite sources where possible.\n3. **Cross-reference**: Compare findings across sources. Note consensus, contradictions, and gaps.\n4. **Synthesize**: Produce a structured report with these sections:\n   - Executive Summary (3-5 sentences)\n   - Key Findings (numbered list)\n   - Detailed Analysis (organized by sub-topic)\n   - Confidence Assessment (High/Medium/Low for each finding, with rationale)\n   - Open Questions (what remains unclear)\n   - Sources (numbered reference list)\n5. Distinguish clearly between established facts, expert consensus, and your own inference.\n6. If the topic is rapidly evolving, note the knowledge cutoff and what may have changed.`,
    },
    {
      id: "pop-4", emoji: "🐛", name: "Debug Detective",
      desc: "Systematically diagnoses bugs by analyzing error messages, stack traces, and code context to find root causes.",
      longDesc: "Paste an error message, stack trace, or describe unexpected behavior and this skill walks through a systematic debugging process. It identifies likely root causes, suggests diagnostic steps, and provides fix implementations.",
      category: "Coding", source: "Community", section: "popular",
      features: ["Stack trace analysis and interpretation", "Root cause hypothesis generation", "Step-by-step diagnostic plans", "Fix implementation with explanation"],
      prompt: `You are a Debug Detective. When given an error message, stack trace, unexpected behavior, or failing test, systematically diagnose the root cause.\n\nProcess:\n1. **Parse the error**: Extract the error type, message, file, and line number. Translate cryptic messages into plain English.\n2. **Generate hypotheses**: List 2-4 likely root causes, ranked by probability. Explain why each is plausible.\n3. **Diagnostic plan**: For the top hypothesis, suggest specific checks: log statements, breakpoints, test inputs, or commands to run.\n4. **Trace the data flow**: Walk backwards from the error through the call stack. Identify where the data or state went wrong.\n5. **Provide the fix**: Once the root cause is identified, provide the corrected code with a clear explanation of what changed and why.\n6. **Prevent recurrence**: Suggest a test case, type guard, or validation that would catch this bug in the future.\n\nIf the information is insufficient, ask targeted questions — don't guess blindly.`,
    },
    {
      id: "pop-5", emoji: "📧", name: "Email Composer",
      desc: "Drafts professional emails with the right tone for any context — from cold outreach to executive summaries.",
      longDesc: "Describe the situation, audience, and desired outcome and get a polished email draft. Handles cold outreach, follow-ups, meeting summaries, escalations, and executive updates with appropriate tone calibration.",
      category: "Writing", source: "Community", section: "popular",
      features: ["Tone calibration for audience and context", "Cold outreach and follow-up templates", "Executive summary formatting", "Subject line optimization"],
      prompt: `You are a Professional Email Composer. Given a situation, audience, and desired outcome, draft a polished email.\n\nBefore drafting, identify:\n- **Audience**: peer, manager, executive, client, stranger\n- **Purpose**: request, follow-up, update, escalation, introduction, thank-you\n- **Tone**: formal, professional-friendly, casual, urgent\n\nRules:\n1. Write a compelling subject line (under 8 words) that communicates the purpose and urgency.\n2. Open with context the reader needs — don't bury the lead.\n3. State the ask or key information within the first 2 sentences.\n4. Keep total length under 150 words unless a detailed update is required.\n5. Use bullet points for multiple items or action steps.\n6. Close with a clear next step and timeline.\n7. Match formality to the audience. No exclamation marks for executives. No jargon for non-technical recipients.\n8. Provide 2 variants if the tone is ambiguous: one warmer, one more direct.`,
    },
    {
      id: "pop-6", emoji: "🏗️", name: "System Design Mentor",
      desc: "Walks through system design problems step-by-step: requirements, architecture, trade-offs, and scaling strategies.",
      longDesc: "Describe a system design challenge and this skill guides you through the full process: clarifying requirements, estimating scale, choosing components, designing data models, addressing bottlenecks, and evaluating trade-offs.",
      category: "Coding", source: "Community", section: "popular",
      features: ["Requirement clarification framework", "Back-of-envelope capacity estimation", "Component selection and trade-off analysis", "Scaling strategy recommendations"],
      prompt: `You are a System Design Mentor. Guide the user through designing scalable systems step by step.\n\nFramework:\n1. **Requirements**: Clarify functional requirements (what it does) and non-functional requirements (latency, throughput, availability, consistency).\n2. **Estimation**: Back-of-envelope calculations — DAU, QPS, storage, bandwidth.\n3. **High-level design**: Draw the component diagram (load balancer → API servers → cache → database → message queue). Use ASCII art.\n4. **Data model**: Define key entities, relationships, and storage choices (SQL vs NoSQL vs hybrid).\n5. **Deep dive**: Pick the hardest component and design it in detail — data partitioning, replication, caching strategy, indexing.\n6. **Trade-offs**: For every decision, state what you're trading (consistency vs availability, latency vs throughput, cost vs complexity).\n7. **Bottlenecks**: Identify the most likely failure points and how to mitigate them.\n\nAlways ask the user for constraints before designing. There is no single right answer — optimize for their stated priorities.`,
    },
    {
      id: "pop-7", emoji: "📝", name: "Meeting Notes → Actions",
      desc: "Converts messy meeting transcripts into structured notes with decisions, action items, and owners.",
      longDesc: "Paste a meeting transcript or rough notes and get back structured output: key discussion points, decisions made, action items with owners and deadlines, and open questions.",
      category: "Productivity", source: "Community", section: "popular",
      features: ["Decision and action item extraction", "Owner and deadline assignment", "Key discussion point summarization", "Follow-up email draft generation"],
      prompt: `You are a Meeting Analyst. When given a meeting transcript, rough notes, or recording summary, produce structured meeting notes.\n\nOutput format:\n## Meeting: [Title]\n**Date**: [date if mentioned]  |  **Attendees**: [names if mentioned]\n\n### Key Discussion Points\n- Bullet summary of each topic discussed (1-2 sentences each)\n\n### Decisions Made\n- [ ] Decision description — decided by [person] (if stated)\n\n### Action Items\n| # | Action | Owner | Deadline |\n|---|--------|-------|----------|\n| 1 | ... | ... | ... |\n\n### Open Questions\n- Questions that were raised but not resolved\n\n### Follow-up\n[Draft a brief follow-up email summarizing the above for attendees]\n\nRules:\n- Distinguish between decisions (final) and discussions (ongoing).\n- If owners or deadlines aren't stated, mark them as TBD.\n- Keep summaries concise. One bullet per topic, not a transcript rewrite.`,
    },
    {
      id: "pop-8", emoji: "🎯", name: "Prompt Engineer",
      desc: "Helps craft and refine prompts for Claude or GPT — optimizing for clarity, specificity, and consistent output.",
      longDesc: "Describe what you want an AI to do and this skill helps you write an optimized prompt. It applies prompt engineering best practices: role setting, constraint definition, output formatting, few-shot examples, and chain-of-thought scaffolding.",
      category: "Productivity", source: "Official", section: "popular",
      features: ["Role and constraint optimization", "Few-shot example generation", "Chain-of-thought scaffolding", "A/B prompt variant suggestions"],
      prompt: `You are a Prompt Engineer. Help the user craft effective prompts for large language models (Claude, GPT, Gemini, etc.).\n\nWhen the user describes what they want an AI to do:\n1. **Clarify the task**: Restate it precisely. Identify ambiguities.\n2. **Set the role**: Open with "You are a [specific expert role]" to prime the model.\n3. **Define constraints**: List explicit rules (output format, length, tone, what to avoid).\n4. **Add structure**: Use numbered steps, markdown headers, or XML tags to organize the prompt.\n5. **Include examples**: Add 1-2 few-shot examples showing the expected input → output pattern.\n6. **Handle edge cases**: Add instructions for what to do when input is ambiguous, incomplete, or out of scope.\n7. **Output the prompt**: Present the final prompt in a copyable code block.\n8. **Offer variants**: Suggest one alternative approach (e.g., chain-of-thought vs. direct answer) and explain the trade-off.\n\nKeep prompts under 500 words unless the task demands more. Shorter prompts are more robust.`,
    },
    {
      id: "pop-9", emoji: "📱", name: "Responsive Layout Builder",
      desc: "Generates mobile-first CSS layouts using modern techniques: Grid, Flexbox, Container Queries, and fluid typography.",
      longDesc: "Describe a layout and this skill produces clean, modern CSS using the best approach for each case. Favors CSS Grid and Flexbox, leverages Container Queries for component-level responsiveness, and implements fluid typography with clamp().",
      category: "Design", source: "Community", section: "popular",
      features: ["CSS Grid and Flexbox pattern selection", "Container Query implementations", "Fluid typography with clamp()", "Mobile-first progressive enhancement"],
      prompt: `You are a CSS Layout Architect specializing in responsive design. Given a layout description or wireframe, produce clean, modern CSS.\n\nRules:\n1. Always start mobile-first. Base styles for small screens, then add complexity with min-width media queries.\n2. Choose Flexbox for one-dimensional layouts (nav bars, card rows). Choose Grid for two-dimensional layouts (page grids, dashboards).\n3. Use Container Queries (@container) for component-level responsiveness instead of viewport media queries when the component may live in different contexts.\n4. Implement fluid typography with clamp(): e.g., font-size: clamp(1rem, 0.5rem + 1.5vw, 1.5rem).\n5. Prefer logical properties (inline-start, block-end) over physical (left, top) for RTL compatibility.\n6. Avoid magic numbers. Use CSS custom properties for spacing, breakpoints, and sizing.\n7. Test mental model: Does the layout collapse gracefully? Does text remain readable? Are touch targets ≥44px?\n8. Output only CSS (or Tailwind classes if requested). No JavaScript layout hacks.`,
    },
    {
      id: "pop-10", emoji: "🔄", name: "API Integrator",
      desc: "Generates API client code, types, and error handling from OpenAPI specs, documentation URLs, or example requests.",
      longDesc: "Provide an API spec, docs link, or sample request/response and this skill produces type-safe client code with authentication, pagination, retry logic, and error mapping.",
      category: "Coding", source: "Community", section: "popular",
      features: ["Type generation from OpenAPI specs", "Authentication and retry logic", "Pagination handling patterns", "Error mapping and custom exceptions"],
      prompt: `You are an API Integration Specialist. Given an API specification, documentation, or sample request/response, generate a production-ready client.\n\nOutput:\n1. **TypeScript interfaces** for all request params, request bodies, and response shapes.\n2. **Client class or module** with methods for each endpoint. Use fetch or axios based on user preference.\n3. **Authentication**: Implement the auth method (Bearer token, API key header, OAuth2 refresh flow).\n4. **Error handling**: Map HTTP status codes to typed error classes. Include retry logic with exponential backoff for 429 and 5xx.\n5. **Pagination**: If the API uses cursor or offset pagination, provide an async generator that yields all pages.\n6. **Configuration**: Accept base URL, timeout, and auth credentials via a config object. Never hardcode secrets.\n\nRules:\n- All methods must be async and return typed Promises.\n- Include JSDoc on each method with the endpoint path and a one-line description.\n- Export a factory function: createApiClient(config) → client.`,
    },
    {
      id: "pop-11", emoji: "🧹", name: "Code Refactorer",
      desc: "Identifies code smells and refactors for readability, performance, and maintainability while preserving behavior.",
      longDesc: "Submit code and get refactoring suggestions ranked by impact. Identifies duplication, long methods, deep nesting, unclear naming, and missing abstractions.",
      category: "Coding", source: "Official", section: "popular",
      features: ["Code smell detection and ranking", "Before/after comparisons with rationale", "Behavior-preserving transformations", "Performance optimization suggestions"],
      prompt: `You are a Code Refactoring Expert. Analyze the provided code and suggest improvements ranked by impact.\n\nCheck for these code smells:\n1. **Long methods**: Functions over 30 lines. Suggest extraction.\n2. **Deep nesting**: More than 3 levels of if/else. Suggest guard clauses or early returns.\n3. **Duplication**: Similar logic in multiple places. Suggest shared abstractions.\n4. **Unclear naming**: Variables like 'x', 'data', 'temp'. Suggest semantic names.\n5. **God objects**: Classes or modules doing too many things. Suggest splitting responsibilities.\n6. **Magic values**: Hardcoded numbers or strings. Suggest named constants.\n7. **Missing error handling**: Unhandled promise rejections, unchecked nulls.\n\nFor each suggestion:\n- Show the **before** code snippet\n- Show the **after** refactored code\n- Explain **why** the change improves readability, maintainability, or performance\n- Confirm the refactoring **preserves behavior** (no functional changes)\n\nPrioritize suggestions by impact: High (affects correctness or major readability) → Medium → Low (style preference).`,
    },
    {
      id: "pop-12", emoji: "📋", name: "SQL Query Builder",
      desc: "Converts natural language questions into optimized SQL queries with joins, aggregations, and window functions.",
      longDesc: "Describe your data schema and ask questions in plain English. This skill generates correct SQL with proper JOINs, GROUP BYs, window functions, CTEs, and index-aware optimizations.",
      category: "Data", source: "Community", section: "popular",
      features: ["Natural language to SQL translation", "Multi-dialect support (Postgres, MySQL, SQLite)", "Window functions and CTEs", "Query performance optimization hints"],
      prompt: `You are a SQL Expert. Convert natural language questions into correct, optimized SQL queries.\n\nWorkflow:\n1. Ask for the **schema** if not provided (table names, columns, types, relationships).\n2. Ask for the **SQL dialect** (PostgreSQL, MySQL, SQLite, SQL Server) if not specified. Default to PostgreSQL.\n3. Write the query using:\n   - Proper JOIN types (INNER, LEFT, etc.) based on the relationship\n   - CTEs (WITH clauses) for complex multi-step queries instead of nested subqueries\n   - Window functions (ROW_NUMBER, RANK, LAG, LEAD) when appropriate\n   - Appropriate GROUP BY and HAVING for aggregations\n4. **Explain** the query in 2-3 sentences: what it does and why you chose that approach.\n5. **Optimize**: Suggest indexes that would speed up the query. Note if a full table scan is unavoidable.\n6. Format SQL with consistent indentation and uppercase keywords.\n\nIf the question is ambiguous (e.g., "top customers" — by revenue? by order count?), ask for clarification before writing the query.`,
    },
    {
      id: "pop-13", emoji: "📰", name: "Content Summarizer",
      desc: "Distills long articles, papers, or documents into key-point summaries at adjustable detail levels.",
      longDesc: "Paste any long-form content and choose your summary depth: one-liner, key bullet points, executive summary, or detailed section-by-section breakdown.",
      category: "Research", source: "Official", section: "popular",
      features: ["Adjustable summary depth levels", "Core argument identification", "Key evidence and data extraction", "Section-by-section breakdowns"],
      prompt: `You are a Content Summarizer. When given long-form content (articles, papers, reports, transcripts), produce clear summaries at the requested detail level.\n\nDetail levels:\n- **One-liner**: A single sentence capturing the core message.\n- **Key points**: 3-7 bullet points covering the main arguments and evidence.\n- **Executive summary**: 1-2 paragraphs suitable for a busy decision-maker.\n- **Detailed breakdown**: Section-by-section summary preserving the document's structure.\n\nRules:\n1. Default to "Key points" if no level is specified.\n2. Identify the **core argument** or thesis first. Everything else supports it.\n3. Distinguish between facts, opinions, and the author's conclusions.\n4. Preserve important numbers, statistics, and quotes.\n5. Note any caveats, limitations, or counterarguments the author mentions.\n6. If the content is biased, note the perspective without editorializing.\n7. End with a "So what?" — one sentence on why this matters or what to do with the information.`,
    },
    {
      id: "pop-14", emoji: "📅", name: "Sprint Planner",
      desc: "Breaks down feature requests into estimated user stories, tasks, and acceptance criteria for agile teams.",
      longDesc: "Describe a feature or epic and this skill decomposes it into user stories with acceptance criteria, technical tasks, story point estimates, and dependency mapping.",
      category: "Productivity", source: "Community", section: "popular",
      features: ["User story decomposition with acceptance criteria", "Story point estimation", "Task dependency mapping", "Sprint capacity planning"],
      prompt: `You are an Agile Sprint Planner. When given a feature request or epic, decompose it into actionable sprint work.\n\nOutput for each user story:\n- **Title**: As a [role], I want [goal], so that [benefit]\n- **Acceptance criteria**: Given/When/Then format (at least 3 per story)\n- **Technical tasks**: Implementation sub-tasks (backend, frontend, tests, infra)\n- **Story points**: Estimate using Fibonacci (1, 2, 3, 5, 8, 13). Explain your reasoning.\n- **Dependencies**: What must be done before this story can start.\n\nRules:\n1. Stories should be completable within one sprint (1-2 weeks). Split anything >8 points.\n2. Include a "Definition of Done" checklist: code reviewed, tests passing, docs updated, deployed to staging.\n3. Flag technical risks or unknowns as spike stories.\n4. Order stories by dependency chain — what must be built first.\n5. If the epic is large, suggest an MVP slice that delivers value earliest.`,
    },
    {
      id: "pop-15", emoji: "🌐", name: "i18n Helper",
      desc: "Extracts hardcoded strings, generates translation keys, and produces locale files for internationalization.",
      longDesc: "Feed it a component or page and this skill identifies all hardcoded user-facing strings, generates semantic translation keys, produces locale JSON files, and handles pluralization and RTL considerations.",
      category: "Coding", source: "Community", section: "popular",
      features: ["Hardcoded string extraction", "Semantic translation key generation", "Pluralization and gender handling", "RTL layout considerations"],
      prompt: `You are an i18n (Internationalization) Specialist. When given source code, identify all user-facing strings and prepare them for translation.\n\nProcess:\n1. **Scan** the code for hardcoded strings: button labels, headings, error messages, placeholders, ARIA labels, and alt text.\n2. **Generate keys**: Create semantic, hierarchical translation keys. Format: [page].[section].[element]. Example: settings.profile.saveButton.\n3. **Extract**: Replace each string in the code with the i18n function call (t('key'), intl.formatMessage, or the framework-specific equivalent).\n4. **Produce locale files**: Output en.json (and optionally a template for other locales) with all keys and their English values.\n5. **Handle pluralization**: Use ICU MessageFormat for strings with counts. Example: "{count, plural, one {# item} other {# items}}".\n6. **Flag issues**: Strings with concatenation (firstName + " " + lastName) that need reordering for other languages. Date/number formats that need locale-aware formatting.\n7. **RTL notes**: Flag layout patterns that may break in RTL languages (absolute positioning, text-align, directional icons).`,
    },
    {
      id: "pop-16", emoji: "🎭", name: "Persona Creator",
      desc: "Builds detailed user personas from research data, interviews, or demographic descriptions for UX design.",
      longDesc: "Provide user research data, interview quotes, or demographic info and this skill synthesizes detailed personas with goals, frustrations, behaviors, and scenarios.",
      category: "Research", source: "Community", section: "popular",
      features: ["Research synthesis into persona attributes", "Goals, frustrations, and behavior mapping", "Scenario and journey generation", "Formatted persona card output"],
      prompt: `You are a UX Research Analyst specializing in persona creation. When given user research data (interview transcripts, survey results, analytics, or demographic descriptions), synthesize it into detailed user personas.\n\nPersona format:\n## [Name] — [Archetype label]\n**Demographics**: Age, role, location, tech comfort level\n**Quote**: A representative quote that captures their mindset\n\n### Goals\n- What they're trying to accomplish (3-5 goals)\n\n### Frustrations\n- Pain points and blockers (3-5 frustrations)\n\n### Behaviors\n- How they currently approach the task. Tools they use. Frequency.\n\n### Scenario\nA short narrative (3-5 sentences) describing a typical day where they encounter the product.\n\nRules:\n1. Base personas on patterns in the data, not stereotypes.\n2. Each persona should be distinct — different goals, different pain points.\n3. Include 1 primary persona, 1-2 secondary, and optionally 1 anti-persona (who the product is NOT for).\n4. If the data is thin, state your assumptions clearly.`,
    },
    {
      id: "pop-17", emoji: "⚡", name: "Performance Profiler",
      desc: "Analyzes code or Lighthouse reports and provides actionable optimization recommendations ranked by impact.",
      longDesc: "Submit code, bundle analysis, or Lighthouse JSON and get prioritized performance improvements. Covers Core Web Vitals, bundle size reduction, render optimization, and caching strategies.",
      category: "Coding", source: "Official", section: "popular",
      features: ["Core Web Vitals optimization", "Bundle size analysis and reduction", "Render and paint optimization", "Caching and lazy loading strategies"],
      prompt: `You are a Web Performance Engineer. Analyze the provided code, Lighthouse report, or bundle analysis and produce prioritized optimization recommendations.\n\nCheck these areas:\n1. **Core Web Vitals**: LCP (Largest Contentful Paint), FID/INP (Interaction to Next Paint), CLS (Cumulative Layout Shift). Identify what's causing poor scores.\n2. **Bundle size**: Look for large dependencies, unused imports, missing tree-shaking, and opportunities for code splitting.\n3. **Render performance**: Unnecessary re-renders (React), layout thrashing, forced synchronous layouts, expensive CSS selectors.\n4. **Network**: Unoptimized images, missing compression (gzip/brotli), too many HTTP requests, missing resource hints (preload, prefetch).\n5. **Caching**: Missing cache headers, opportunities for service worker caching, stale-while-revalidate patterns.\n6. **Lazy loading**: Below-fold content, images, routes, and heavy components that should load on demand.\n\nFor each recommendation:\n- **Impact**: High / Medium / Low\n- **Effort**: Quick win / Moderate / Major refactor\n- **Action**: Specific code change or configuration\n\nPrioritize: High impact + Quick win first.`,
    },
    {
      id: "pop-18", emoji: "🤖", name: "Cursor Rules Generator",
      desc: "Creates .cursorrules files tailored to your project's stack, conventions, and team preferences.",
      longDesc: "Describe your project tech stack, coding conventions, and team preferences and this skill generates a comprehensive .cursorrules file. Covers code style, architecture patterns, naming conventions, testing requirements, and documentation standards.",
      category: "Productivity", source: "Cursor", section: "popular",
      features: ["Stack-specific rule generation", "Coding convention enforcement", "Architecture pattern guidelines", "Automatic rule conflict detection"],
      prompt: `You are a Cursor Rules Architect. When the user describes their project, generate a comprehensive .cursorrules file that guides AI code generation to match their team's standards.\n\nAsk for:\n1. **Tech stack**: Language, framework, major libraries\n2. **Code style**: Naming conventions, formatting preferences, import order\n3. **Architecture**: Folder structure pattern, module boundaries, data flow\n4. **Testing**: Framework, coverage expectations, what to test\n5. **Documentation**: Comment style, JSDoc/docstring requirements\n\nOutput a complete .cursorrules file with these sections:\n- Role & Persona (who the AI should act as)\n- Code Quality rules (DRY, SOLID, naming, readability)\n- Architecture rules (folder structure, separation of concerns)\n- Error handling rules (validation, try/catch, logging)\n- Testing rules (what to test, how to structure tests)\n- Security rules (no hardcoded secrets, input validation)\n- Documentation rules (when to comment, docstring format)\n\nRules should be specific and actionable, not vague. "Use descriptive variable names" is bad. "Boolean variables must use is/has/should prefix (isValid, hasPermission)" is good.`,
    },
  ];

  // ============================================================
  //  STATE
  // ============================================================

  let favorites = new Set(JSON.parse(localStorage.getItem("skillFavs") || "[]"));
  let activeTab = "panelForYou";
  let activeFilter = "All";

  function saveFavorites() {
    localStorage.setItem("skillFavs", JSON.stringify([...favorites]));
  }

  // ============================================================
  //  RENDER HELPERS
  // ============================================================

  // ============================================================
  //  SVG ICON SYSTEM — organic circular illustrations
  // ============================================================

  const ICON_MAP = {
    // --- For You ---
    "fy-1": { // Design-Token Extractor — overlapping color circles
      grad: ["#c49a4a", "#d4a84a"],
      path: `<circle cx="18" cy="20" r="5" fill="none" stroke="#fff" stroke-width="1.2" opacity=".7"/>
             <circle cx="24" cy="17" r="5" fill="none" stroke="#fff" stroke-width="1.2" opacity=".85"/>
             <circle cx="30" cy="20" r="5" fill="none" stroke="#fff" stroke-width="1.2"/>
             <path d="M16 30 Q24 27 32 30" fill="none" stroke="#fff" stroke-width="1" opacity=".5"/>`
    },
    "fy-2": { // React Component Architect — atom/orbital
      grad: ["#5e8260", "#8fb08f"],
      path: `<ellipse cx="24" cy="24" rx="10" ry="4" fill="none" stroke="#fff" stroke-width="1.2" transform="rotate(-30 24 24)"/>
             <ellipse cx="24" cy="24" rx="10" ry="4" fill="none" stroke="#fff" stroke-width="1.2" transform="rotate(30 24 24)"/>
             <ellipse cx="24" cy="24" rx="10" ry="4" fill="none" stroke="#fff" stroke-width="1.2"/>
             <circle cx="24" cy="24" r="2" fill="#fff"/>`
    },
    "fy-3": { // Codebase Navigator — connected nodes
      grad: ["#5d7f94", "#8aacbf"],
      path: `<circle cx="24" cy="16" r="2.5" fill="#fff"/>
             <circle cx="16" cy="28" r="2.5" fill="#fff"/>
             <circle cx="32" cy="28" r="2.5" fill="#fff"/>
             <line x1="24" y1="18.5" x2="16" y2="25.5" stroke="#fff" stroke-width="1.2"/>
             <line x1="24" y1="18.5" x2="32" y2="25.5" stroke="#fff" stroke-width="1.2"/>
             <line x1="18.5" y1="28" x2="29.5" y2="28" stroke="#fff" stroke-width="1.2" opacity=".6"/>`
    },
    "fy-4": { // Test Writer Pro — flask
      grad: ["#4a7a78", "#7aaba8"],
      path: `<path d="M21 14 V20 L15 32 H33 L27 20 V14" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
             <line x1="20" y1="14" x2="28" y2="14" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
             <path d="M17 26 H31" stroke="#fff" stroke-width="1" opacity=".5"/>
             <circle cx="22" cy="29" r="1" fill="#fff" opacity=".7"/>
             <circle cx="26" cy="28" r="1.3" fill="#fff" opacity=".5"/>`
    },
    "fy-5": { // Figma-to-Code Bridge — bridge arch
      grad: ["#b0a090", "#c4b5a0"],
      path: `<path d="M12 30 Q18 16 24 16 Q30 16 36 30" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>
             <line x1="16" y1="30" x2="16" y2="23" stroke="#fff" stroke-width="1" opacity=".6"/>
             <line x1="24" y1="30" x2="24" y2="16" stroke="#fff" stroke-width="1" opacity=".6"/>
             <line x1="32" y1="30" x2="32" y2="23" stroke="#fff" stroke-width="1" opacity=".6"/>
             <line x1="12" y1="30" x2="36" y2="30" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>`
    },
    "fy-6": { // Security Code Reviewer — shield
      grad: ["#5d6f8a", "#8a9bb0"],
      path: `<path d="M24 13 L33 17 V25 Q33 32 24 36 Q15 32 15 25 V17 Z" fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/>
             <path d="M20 25 L23 28 L29 21" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`
    },

    // --- Popular ---
    "pop-1": { // Technical Writer — quill/feather
      grad: ["#9a8a7a", "#b0a898"],
      path: `<path d="M30 12 Q22 20 18 32" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>
             <path d="M30 12 Q34 18 30 24 Q26 20 22 18" fill="none" stroke="#fff" stroke-width="1" opacity=".6"/>
             <path d="M30 12 Q28 20 24 26" fill="none" stroke="#fff" stroke-width="1" opacity=".4"/>
             <line x1="15" y1="34" x2="25" y2="34" stroke="#fff" stroke-width="1" opacity=".5" stroke-linecap="round"/>`
    },
    "pop-2": { // Data Analyst — wave chart
      grad: ["#5d7f94", "#7a9bb0"],
      path: `<path d="M13 28 Q17 20 21 24 Q25 28 29 18 Q33 12 35 16" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>
             <line x1="13" y1="34" x2="35" y2="34" stroke="#fff" stroke-width="1" opacity=".4"/>
             <line x1="13" y1="34" x2="13" y2="14" stroke="#fff" stroke-width="1" opacity=".4"/>`
    },
    "pop-3": { // Deep Research — magnifying glass with sparkle
      grad: ["#c49a4a", "#d4a84a"],
      path: `<circle cx="22" cy="22" r="7" fill="none" stroke="#fff" stroke-width="1.3"/>
             <line x1="27" y1="27" x2="34" y2="34" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
             <line x1="22" y1="18" x2="22" y2="20" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".7"/>
             <line x1="18" y1="22" x2="20" y2="22" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".7"/>`
    },
    "pop-4": { // Debug Detective — bug/beetle
      grad: ["#b06040", "#c48060"],
      path: `<ellipse cx="24" cy="26" rx="6" ry="7" fill="none" stroke="#fff" stroke-width="1.3"/>
             <line x1="24" y1="19" x2="24" y2="33" stroke="#fff" stroke-width="1" opacity=".5"/>
             <path d="M15 22 L18 24" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
             <path d="M33 22 L30 24" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
             <path d="M15 30 L18 28" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
             <path d="M33 30 L30 28" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
             <line x1="21" y1="15" x2="20" y2="12" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
             <line x1="27" y1="15" x2="28" y2="12" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>`
    },
    "pop-5": { // Email Composer — envelope
      grad: ["#7a9a7a", "#a0b8a0"],
      path: `<rect x="14" y="17" width="20" height="14" rx="2" fill="none" stroke="#fff" stroke-width="1.3"/>
             <path d="M14 17 L24 26 L34 17" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
             <path d="M14 31 L21 25" stroke="#fff" stroke-width="1" opacity=".5" stroke-linecap="round"/>
             <path d="M34 31 L27 25" stroke="#fff" stroke-width="1" opacity=".5" stroke-linecap="round"/>`
    },
    "pop-6": { // System Design — building blocks
      grad: ["#5d7f94", "#7a9bb0"],
      path: `<rect x="14" y="26" width="8" height="8" rx="1" fill="none" stroke="#fff" stroke-width="1.2"/>
             <rect x="26" y="26" width="8" height="8" rx="1" fill="none" stroke="#fff" stroke-width="1.2"/>
             <rect x="20" y="14" width="8" height="8" rx="1" fill="none" stroke="#fff" stroke-width="1.2"/>
             <line x1="22" y1="22" x2="18" y2="26" stroke="#fff" stroke-width="1" opacity=".6"/>
             <line x1="26" y1="22" x2="30" y2="26" stroke="#fff" stroke-width="1" opacity=".6"/>`
    },
    "pop-7": { // Meeting Notes — clipboard list
      grad: ["#c49a4a", "#d4a84a"],
      path: `<rect x="16" y="14" width="16" height="22" rx="2" fill="none" stroke="#fff" stroke-width="1.2"/>
             <rect x="21" y="12" width="6" height="4" rx="1" fill="#fff" opacity=".8"/>
             <line x1="20" y1="22" x2="28" y2="22" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".7"/>
             <line x1="20" y1="26" x2="26" y2="26" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".7"/>
             <line x1="20" y1="30" x2="28" y2="30" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".5"/>`
    },
    "pop-8": { // Prompt Engineer — target/crosshair
      grad: ["#4a7a78", "#7aaba8"],
      path: `<circle cx="24" cy="24" r="9" fill="none" stroke="#fff" stroke-width="1.2"/>
             <circle cx="24" cy="24" r="5" fill="none" stroke="#fff" stroke-width="1" opacity=".7"/>
             <circle cx="24" cy="24" r="1.5" fill="#fff"/>
             <line x1="24" y1="12" x2="24" y2="15" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".5"/>
             <line x1="24" y1="33" x2="24" y2="36" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".5"/>
             <line x1="12" y1="24" x2="15" y2="24" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".5"/>
             <line x1="33" y1="24" x2="36" y2="24" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".5"/>`
    },
    "pop-9": { // Responsive Layout — grid frames
      grad: ["#7a9a7a", "#a0b8a0"],
      path: `<rect x="13" y="15" width="10" height="18" rx="1.5" fill="none" stroke="#fff" stroke-width="1.2"/>
             <rect x="26" y="15" width="10" height="12" rx="1.5" fill="none" stroke="#fff" stroke-width="1.2"/>
             <rect x="26" y="30" width="10" height="5" rx="1" fill="none" stroke="#fff" stroke-width="1" opacity=".6"/>
             <line x1="13" y1="19" x2="23" y2="19" stroke="#fff" stroke-width=".8" opacity=".5"/>`
    },
    "pop-10": { // API Integrator — connected arrows
      grad: ["#5d7f94", "#8aacbf"],
      path: `<circle cx="16" cy="24" r="4" fill="none" stroke="#fff" stroke-width="1.2"/>
             <circle cx="32" cy="24" r="4" fill="none" stroke="#fff" stroke-width="1.2"/>
             <path d="M20 22 L28 22" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
             <path d="M26 20 L28 22 L26 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
             <path d="M28 26 L20 26" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
             <path d="M22 24 L20 26 L22 28" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>`
    },
    "pop-11": { // Code Refactorer — transformation diamond
      grad: ["#c49a4a", "#b08430"],
      path: `<path d="M24 14 L34 24 L24 34 L14 24 Z" fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/>
             <path d="M20 24 L23 27 L28 21" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
             <circle cx="24" cy="14" r="1" fill="#fff" opacity=".6"/>
             <circle cx="34" cy="24" r="1" fill="#fff" opacity=".6"/>`
    },
    "pop-12": { // SQL Query Builder — database cylinder
      grad: ["#5d6f8a", "#8a9bb0"],
      path: `<ellipse cx="24" cy="16" rx="8" ry="3" fill="none" stroke="#fff" stroke-width="1.2"/>
             <line x1="16" y1="16" x2="16" y2="32" stroke="#fff" stroke-width="1.2"/>
             <line x1="32" y1="16" x2="32" y2="32" stroke="#fff" stroke-width="1.2"/>
             <ellipse cx="24" cy="32" rx="8" ry="3" fill="none" stroke="#fff" stroke-width="1.2"/>
             <path d="M16 24 Q24 28 32 24" fill="none" stroke="#fff" stroke-width="1" opacity=".5"/>`
    },
    "pop-13": { // Content Summarizer — stacked pages compress
      grad: ["#9a8a7a", "#b0a898"],
      path: `<rect x="17" y="13" width="14" height="18" rx="1.5" fill="none" stroke="#fff" stroke-width="1.2"/>
             <path d="M20 35 H30 Q31 35 31 34 V18" stroke="#fff" stroke-width="1" opacity=".4"/>
             <line x1="20" y1="18" x2="28" y2="18" stroke="#fff" stroke-width="1" opacity=".6" stroke-linecap="round"/>
             <line x1="20" y1="22" x2="28" y2="22" stroke="#fff" stroke-width="1" opacity=".6" stroke-linecap="round"/>
             <line x1="20" y1="26" x2="24" y2="26" stroke="#fff" stroke-width="1" opacity=".4" stroke-linecap="round"/>`
    },
    "pop-14": { // Sprint Planner — kanban columns
      grad: ["#5e8260", "#8fb08f"],
      path: `<rect x="13" y="16" width="6" height="16" rx="1" fill="none" stroke="#fff" stroke-width="1.1"/>
             <rect x="21" y="16" width="6" height="10" rx="1" fill="none" stroke="#fff" stroke-width="1.1"/>
             <rect x="29" y="16" width="6" height="20" rx="1" fill="none" stroke="#fff" stroke-width="1.1"/>
             <line x1="13" y1="20" x2="19" y2="20" stroke="#fff" stroke-width=".8" opacity=".5"/>
             <line x1="21" y1="20" x2="27" y2="20" stroke="#fff" stroke-width=".8" opacity=".5"/>
             <line x1="29" y1="20" x2="35" y2="20" stroke="#fff" stroke-width=".8" opacity=".5"/>`
    },
    "pop-15": { // i18n Helper — globe
      grad: ["#4a7a78", "#7aaba8"],
      path: `<circle cx="24" cy="24" r="10" fill="none" stroke="#fff" stroke-width="1.2"/>
             <ellipse cx="24" cy="24" rx="5" ry="10" fill="none" stroke="#fff" stroke-width="1" opacity=".7"/>
             <line x1="14" y1="24" x2="34" y2="24" stroke="#fff" stroke-width="1" opacity=".5"/>
             <path d="M15 19 Q24 21 33 19" fill="none" stroke="#fff" stroke-width=".8" opacity=".4"/>
             <path d="M15 29 Q24 27 33 29" fill="none" stroke="#fff" stroke-width=".8" opacity=".4"/>`
    },
    "pop-16": { // Persona Creator — person silhouette
      grad: ["#b06040", "#c48060"],
      path: `<circle cx="24" cy="18" r="5" fill="none" stroke="#fff" stroke-width="1.3"/>
             <path d="M14 36 Q14 27 24 27 Q34 27 34 36" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>`
    },
    "pop-17": { // Performance Profiler — lightning bolt
      grad: ["#c49a4a", "#d4a84a"],
      path: `<path d="M26 12 L18 25 H24 L22 36 L32 22 H25 Z" fill="none" stroke="#fff" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"/>
             <circle cx="16" cy="16" r="1" fill="#fff" opacity=".4"/>
             <circle cx="34" cy="30" r="1" fill="#fff" opacity=".4"/>`
    },
    "pop-18": { // Cursor Rules Generator — gear
      grad: ["#5d6f8a", "#8a9bb0"],
      path: `<circle cx="24" cy="24" r="5" fill="none" stroke="#fff" stroke-width="1.2"/>
             <circle cx="24" cy="24" r="2" fill="#fff" opacity=".7"/>
             <line x1="24" y1="13" x2="24" y2="17" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
             <line x1="24" y1="31" x2="24" y2="35" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
             <line x1="13" y1="24" x2="17" y2="24" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
             <line x1="31" y1="24" x2="35" y2="24" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
             <line x1="16.2" y1="16.2" x2="19" y2="19" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>
             <line x1="29" y1="29" x2="31.8" y2="31.8" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>
             <line x1="31.8" y1="16.2" x2="29" y2="19" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>
             <line x1="19" y1="29" x2="16.2" y2="31.8" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>`
    },
  };

  function skillIcon(id, size) {
    const icon = ICON_MAP[id];
    if (!icon) return "";
    const [c1, c2] = icon.grad;
    const uid = `g-${id}`;
    return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${uid}" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
      </linearGradient></defs>
      <circle cx="24" cy="24" r="24" fill="url(#${uid})"/>
      ${icon.path}
    </svg>`;
  }

  function heartSVG(filled) {
    return filled
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;
  }

  function renderCard(skill) {
    const isFav = favorites.has(skill.id);
    const card = document.createElement("div");
    card.className = "skill-card";
    card.dataset.id = skill.id;

    card.innerHTML = `
      <div class="skill-icon">${skillIcon(skill.id, 44)}</div>
      <div class="skill-body">
        <div class="skill-header">
          <span class="skill-name">${skill.name}</span>
          <button class="skill-fav ${isFav ? "is-fav" : ""}" data-id="${skill.id}" aria-label="Toggle favorite">
            ${heartSVG(isFav)}
          </button>
        </div>
        <p class="skill-desc">${skill.desc}</p>
        <div class="skill-tags">
          <span class="skill-tag tag-category">${skill.category}</span>
          <span class="skill-tag tag-source">${skill.source}</span>
        </div>
      </div>
    `;

    card.querySelector(".skill-fav").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(skill.id);
    });

    card.addEventListener("click", () => openDetail(skill));

    return card;
  }

  // ============================================================
  //  RENDER SECTIONS
  // ============================================================

  function renderForYou() {
    const list = document.getElementById("forYouList");
    list.innerHTML = "";
    skills
      .filter((s) => s.section === "forYou")
      .forEach((s) => list.appendChild(renderCard(s)));
  }

  function renderPopular() {
    const list = document.getElementById("popularList");
    list.innerHTML = "";
    const filtered =
      activeFilter === "All"
        ? skills.filter((s) => s.section === "popular")
        : skills.filter((s) => s.section === "popular" && s.category === activeFilter);
    filtered.forEach((s) => list.appendChild(renderCard(s)));
  }

  function renderFilters() {
    const bar = document.getElementById("filterBar");
    bar.innerHTML = "";
    CATEGORIES.forEach((cat) => {
      const pill = document.createElement("button");
      pill.className = `filter-pill ${cat === activeFilter ? "active" : ""}`;
      pill.textContent = cat;
      pill.addEventListener("click", () => {
        activeFilter = cat;
        renderFilters();
        renderPopular();
      });
      bar.appendChild(pill);
    });
  }

  function renderFavorites() {
    const list = document.getElementById("favoritesList");
    const empty = document.getElementById("emptyFavorites");
    list.innerHTML = "";

    const favSkills = skills.filter((s) => favorites.has(s.id));
    if (favSkills.length === 0) {
      empty.classList.add("visible");
    } else {
      empty.classList.remove("visible");
      favSkills.forEach((s) => list.appendChild(renderCard(s)));
    }

    updateBadge();
  }

  function updateBadge() {
    const btn = document.querySelector('[data-tab="panelFavorites"]');
    let badge = btn.querySelector(".badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "badge hidden";
      btn.appendChild(badge);
    }
    if (favorites.size > 0) {
      badge.textContent = favorites.size;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  // ============================================================
  //  DETAIL OVERLAY
  // ============================================================

  function getOverlay() {
    let overlay = document.querySelector(".skill-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "skill-overlay";
      document.querySelector(".device-frame").appendChild(overlay);
    }
    return overlay;
  }

  function openDetail(skill) {
    const overlay = getOverlay();
    const isFav = favorites.has(skill.id);

    overlay.innerHTML = `
      <div class="overlay-header">
        <button class="overlay-close" aria-label="Close">✕</button>
        <button class="skill-fav ${isFav ? "is-fav" : ""}" data-id="${skill.id}" aria-label="Toggle favorite">
          ${heartSVG(isFav)}
        </button>
      </div>
      <div class="overlay-body">
        <div class="detail-icon">${skillIcon(skill.id, 64)}</div>
        <h2 class="detail-name">${skill.name}</h2>
        <p class="detail-category">${skill.category} · ${skill.source}</p>
        <p class="detail-desc">${skill.longDesc}</p>
        <h3 class="detail-section-title">What it does</h3>
        <ul class="detail-features">
          ${skill.features.map((f) => `<li>${f}</li>`).join("")}
        </ul>
        <button class="detail-use-btn">Use this skill</button>
      </div>
    `;

    overlay.querySelector(".overlay-close").addEventListener("click", () => {
      overlay.classList.remove("open");
    });

    overlay.querySelector(".skill-fav").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(skill.id);
      openDetail(skill);
    });

    overlay.querySelector(".detail-use-btn").addEventListener("click", () => {
      openPromptSheet(skill);
    });

    requestAnimationFrame(() => overlay.classList.add("open"));
  }

  // ============================================================
  //  PROMPT SHEET — shows the system prompt with copy action
  // ============================================================

  function toSkillSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-{2,}/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 64);
  }

  function formatAsSkillMd(skill) {
    const slug = toSkillSlug(skill.name);
    const desc = skill.desc.length > 1024 ? skill.desc.slice(0, 1021) + "..." : skill.desc;
    return `---\nname: ${slug}\ndescription: ${desc}\n---\n\n# ${skill.name}\n\n${skill.prompt}`;
  }

  function openPromptSheet(skill) {
    const overlay = getOverlay();
    let activeFormat = "skill"; // "skill" or "raw"

    function getFormattedPrompt() {
      return activeFormat === "skill" ? formatAsSkillMd(skill) : skill.prompt;
    }

    function render() {
      const formatted = getFormattedPrompt();

      overlay.innerHTML = `
        <div class="overlay-header">
          <button class="prompt-back" aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>
          <span class="prompt-header-title">${skill.name}</span>
          <div style="width:32px"></div>
        </div>
        <div class="overlay-body prompt-body">
          <div class="prompt-format-toggle">
            <button class="format-btn ${activeFormat === "skill" ? "active" : ""}" data-fmt="skill">SKILL.md</button>
            <button class="format-btn ${activeFormat === "raw" ? "active" : ""}" data-fmt="raw">Raw Prompt</button>
          </div>
          <p class="prompt-instructions">${
            activeFormat === "skill"
              ? "Ready to use as a SKILL.md file in Cursor or Claude Code."
              : "Copy and paste as a system instruction in Claude, ChatGPT, or any AI assistant."
          }</p>
          <pre class="prompt-block"><code>${escapeHtml(formatted)}</code></pre>
          <button class="prompt-copy-btn" aria-label="Copy to clipboard">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            <span>Copy to clipboard</span>
          </button>
          <div class="prompt-destinations">
            <span class="prompt-dest-label">${activeFormat === "skill" ? "Save as SKILL.md in:" : "Then paste into:"}</span>
            <div class="prompt-dest-chips">
              ${activeFormat === "skill"
                ? `<span class="prompt-chip">~/.cursor/skills/</span><span class="prompt-chip">.cursor/skills/</span><span class="prompt-chip">Claude Code</span>`
                : `<span class="prompt-chip">Claude Projects</span><span class="prompt-chip">ChatGPT Instructions</span><span class="prompt-chip">System Prompt</span>`
              }
            </div>
          </div>
        </div>
      `;

      overlay.querySelector(".prompt-back").addEventListener("click", () => {
        openDetail(skill);
      });

      overlay.querySelectorAll(".format-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeFormat = btn.dataset.fmt;
          render();
        });
      });

      const copyBtn = overlay.querySelector(".prompt-copy-btn");
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(formatted).then(() => {
          copyBtn.classList.add("copied");
          copyBtn.querySelector("span").textContent = "Copied!";
          copyBtn.querySelector("svg").innerHTML =
            '<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
          setTimeout(() => {
            copyBtn.classList.remove("copied");
            copyBtn.querySelector("span").textContent = "Copy to clipboard";
            copyBtn.querySelector("svg").innerHTML =
              '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>';
          }, 2000);
        });
      });
    }

    render();
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // ============================================================
  //  FAVORITES TOGGLE
  // ============================================================

  function toggleFavorite(id) {
    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      favorites.add(id);
    }
    saveFavorites();
    renderAll();
  }

  // ============================================================
  //  TABS
  // ============================================================

  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.tab === tabId);
    });
    document.getElementById("tabContent").scrollTop = 0;
  }

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // ============================================================
  //  THEME TOGGLE
  // ============================================================

  const savedTheme = localStorage.getItem("skillTheme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  document.getElementById("themeToggle").addEventListener("click", () => {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("skillTheme", next);
  });

  // ============================================================
  //  INIT
  // ============================================================

  function renderAll() {
    renderForYou();
    renderFilters();
    renderPopular();
    renderFavorites();
  }

  renderAll();
})();
