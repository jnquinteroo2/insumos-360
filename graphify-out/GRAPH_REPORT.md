# Graph Report - insumos-360  (2026-07-28)

## Corpus Check
- 53 files · ~3,485,327 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 262 nodes · 297 edges · 27 communities (17 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2f3f2416`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- navbar.tsx
- cn
- dependencies
- What You Must Do When Invoked
- prisma.ts
- devDependencies
- nosotros/page.tsx
- compilerOptions
- package.json
- include
- graphify reference: extra exports and benchmark
- graphify reference: query, path, explain
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- README.md
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- seed.ts
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- update-product-images.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 18 edges
2. `compilerOptions` - 16 edges
3. `What You Must Do When Invoked` - 12 edges
4. `/graphify` - 10 edges
5. `useCartStore` - 9 edges
6. `Footer()` - 8 edges
7. `graphify reference: extra exports and benchmark` - 8 edges
8. `include` - 7 edges
9. `scripts` - 5 edges
10. `graphify reference: query, path, explain` - 5 edges

## Surprising Connections (you probably didn't know these)
- `CheckoutPage()` --calls--> `useCartStore`  [EXTRACTED]
  app/checkout/page.tsx → store/cartStore.ts
- `SuccessPage()` --calls--> `useCartStore`  [EXTRACTED]
  app/checkout/success/page.tsx → store/cartStore.ts
- `ProductList()` --calls--> `useCartStore`  [EXTRACTED]
  app/comfort-360/ProductList.tsx → store/cartStore.ts
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `BorderBeam()` --calls--> `cn()`  [EXTRACTED]
  components/magicui/border-beam.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (27 total, 10 thin omitted)

### Community 0 - "navbar.tsx"
Cohesion: 0.13
Nodes (11): CheckoutPage(), Window, SuccessPage(), ProductList(), Lottie, Footer(), GlassNavbar(), CartItem (+3 more)

### Community 1 - "cn"
Cohesion: 0.09
Nodes (17): metadata, montserrat, playfair, RootLayout(), BentoCard(), BentoGrid(), NumberTicker(), ShimmerButton (+9 more)

### Community 2 - "dependencies"
Cohesion: 0.07
Nodes (29): class-variance-authority, clsx, framer-motion, lottie-react, lucide-react, next, nodemailer, dependencies (+21 more)

### Community 3 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 4 - "prisma.ts"
Cohesion: 0.14
Nodes (4): InsufficientStockError, NOTE: only orders created after the stock-reservation-at-checkout deploy ever, resend, globalForPrisma

### Community 5 - "devDependencies"
Cohesion: 0.08
Nodes (25): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, prisma, @prisma/client, tailwindcss (+17 more)

### Community 6 - "nosotros/page.tsx"
Cohesion: 0.28
Nodes (3): BorderBeam(), BorderBeamProps, About()

### Community 7 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 8 - "package.json"
Cohesion: 0.18
Nodes (10): name, prisma, seed, private, scripts, build, dev, lint (+2 more)

### Community 9 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 10 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 11 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 12 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 13 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 14 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 15 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **125 isolated node(s):** `resend`, `Window`, `playfair`, `montserrat`, `metadata` (+120 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `navbar.tsx`, `nosotros/page.tsx`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `resend`, `Window`, `playfair` to the rest of the system?**
  _125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `navbar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12807881773399016 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.09269162210338681 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._