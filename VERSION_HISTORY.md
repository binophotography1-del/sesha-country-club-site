# Version history

This repository starts with honest source checkpoints. The labels below do not claim earlier Git history that never existed.

## v0.1.1-vercel-release

First public Vercel deployment package.

• Deploys the selected Clear Concierge pages and assets.
• Excludes the design archive, QA screenshots, local server, and inquiry records from the public package.
• Adds production security headers and long-lived asset caching.
• Keeps the GitHub repository private.

Known limitation: the Vercel deployment does not provide durable inquiry storage. Phone and email remain the working contact paths until hosted form storage and alerts are connected.

## v0.1.0-private-checkpoint

Private collaboration checkpoint.

• Promoted Clear Concierge to `index.html`.
• Removed the A/B/C design selector from the customer homepage.
• Preserved the comparison page as `design-archive.html`.
• Preserved Variations A, B, and the earlier C page as design explorations.
• Updated every public Home link and the local server root.
• Added country-club event language to the homepage.
• Kept the inquiry form local-only and documented the public-release gates.

Tested surfaces: desktop and mobile page loading, internal links, service filters, preselected services, form validation, local inquiry capture, and blocked access to inquiry records.

Open risks: roster approval, image rights and credits, hosted form storage and alerts, verified proof links, and field-level form errors.

## v0.0.1-pre-release-source

First Git snapshot of the source before release cleanup.

• Preserves the original A/B/C design comparison at `index.html` in this tag.
• Preserves all three standalone design explorations.
• Includes the multi-page Clear Concierge build, local form endpoint, selected assets, and QA screenshots.

This is a source checkpoint, not a public release.

## Restore a checkpoint

```bash
git switch --detach v0.0.1-pre-release-source
```

Return to current work with:

```bash
git switch main
```
