# Version history

This repository starts with honest source checkpoints. The labels below do not claim earlier Git history that never existed.

## v0.3.8-dance-instagram-reel

Dance Reel preview release.

• Adds the supplied Instagram Reel to the Dance page.
• Uses the approved solo-stage image as a fast, consistent preview thumbnail.
• Opens the Reel in a new tab without loading Instagram tracking scripts inside the site.
• Labels the destination and external-tab behavior for screen-reader users.
• Avoids unverified performer or Reel-content claims because Instagram blocked metadata fetching.

Tested surfaces: Reel URL response, desktop and mobile preview layout, keyboard focus, external-link attributes, public-page checks, production packaging, and live deployment.

## v0.3.7-sesha-service-tabs

Direct-message requirements release.

• Replaces the generic top navigation with Comedy, Dance, Visuals, Music, Hosting, and Inquiry.
• Uses a six-column desktop row and a labeled three-by-two mobile grid without horizontal scrolling.
• Adds a complete Music service page.
• Names Abin, Yuvhan, and Jai as the three lead choreographers and reserves separate approved-headshot placements.
• Updates the visual media team to Ashwin, Charlie, and Sidd.
• Adds honest placeholders for Sesha's comedy reel, the combined Rick reel, and the celebrity hosting reel.
• Preserves the approved ivory, charcoal, cream, and gold palette.
• Records the pre-change source at `checkpoint-before-sesha-direct-messages-2026-08-31`.

Tested surfaces: 50 page and viewport combinations, service filtering, homepage brief handoff, form labels, desktop and mobile navigation, image loading, responsive overflow, production packaging, and live deployment.

## v0.3.6-team-hero-sesha-scarlett

Team-page hero update.

• Uses the existing higher-resolution Sesha Dasari and Scarlett Johansson image as the Team-page hero.
• Adds a Team-specific crop so both subjects remain visible on desktop and mobile.
• Updates the image dimensions and alt text to match the selected asset.
• Leaves the two requested Team-page placeholder frames unchanged.

Tested surfaces: desktop and mobile Team-page crops, responsive overflow, image loading, public-page checks, production packaging, and live deployment.

## v0.3.5-team-photo-placeholders

Interim Team-page asset correction.

• Removes the incorrect dance image from the Yuvhan and Abin roster card.
• Removes the incorrect second image from the lower Team-page proof section.
• Replaces both with deliberate ivory, cream, charcoal, and gold placeholder frames.
• Labels the missing assets without implying that a broken image failed to load.
• Adds both replacement images to the public-release gate.

Tested surfaces: desktop and mobile Team pages, responsive overflow, semantic structure, internal links, public-page checks, production packaging, and live deployment.

## v0.3.4-sesha-red-carpet-montage

Sesha hosting and red-carpet proof update.

• Adds two supplied red-carpet images to the production asset set.
• Reuses the higher-resolution existing Scarlett Johansson and outdoor microphone images instead of storing duplicates.
• Builds a responsive four-image montage on the Hosting page.
• Keeps Sesha as the visual focus and pairs the montage with factual hosting proof.
• Uses image-specific alt text and lazy loading.

Tested surfaces: image loading, desktop and mobile Hosting pages, responsive overflow, all public-page checks, production packaging, and live deployment.

## v0.3.3-dance-ensemble-photo

Dance proof update.

• Adds the supplied ensemble performance photo to the production asset set.
• Places it on the Dance page as live-stage proof.
• Uses factual alt text without identifying unverified performers.
• Adds event-planning copy for performer count, performance length, stage needs, and audience participation.

Tested surfaces: image loading, desktop and mobile Dance pages, responsive overflow, production packaging, and live deployment.

## v0.3.2-ivory-gold-palette

Selected public-site palette release.

• Removes visible navy and burgundy from the selected public direction.
• Uses warm ivory for page space and cream for cards, forms, and proof sections.
• Uses charcoal for text, navigation, major hero contrast, footers, and secondary actions.
• Reserves muted gold for primary actions, selected states, borders, and restrained accents.
• Restyles form feedback without red or green status fills while retaining text labels.
• Keeps focus rings and form controls visible against each surface.

Tested surfaces: desktop and mobile screenshots, internal navigation, service filters, form controls, responsive overflow, production packaging, and live deployment.

## v0.3.1-abin-handoff

Operational handoff release. This release does not change the public site.

• Adds one takeover guide for Abin.
• Documents the source map, local setup, browser QA, and Git workflow.
• Records the manual Netlify deployment and verification steps.
• Defines form ownership, data boundaries, asset rules, and rollback steps.
• Lists the GitHub, Netlify, lead-data, and approval access Abin still needs.
• Records the remaining release risks and operating gaps.

Tested surfaces: documentation links, production packaging, Git whitespace checks, and repository status.

## v0.3.0-netlify-forms

Native hosted lead capture release.

• Deploys the selected public site to Netlify.
• Adds native Netlify Forms capture for the complete event brief.
• Stores verified submissions in the Netlify dashboard.
• Sends verified-submission email alerts to `seshadasari@gmail.com`.
• Adds a honeypot field, AJAX success state, and no-JavaScript thank-you page.
• Adds a curated Netlify production package and security headers.
• Keeps local JSONL capture for development.
• Routes completed briefs from non-Netlify production hosts into Netlify Forms.

Tested surfaces: 45 page and viewport combinations, homepage-to-brief prefill, production form detection, all 11 detected fields, honeypot recognition, live success state, and notification-hook configuration.

QA note: the automated headless submission reached Netlify and updated the form timestamp, then Netlify excluded it from verified submissions as automation. No QA notification was sent to Sesha.

## v0.2.1-homepage-quote-starter

Homepage event-brief handoff.

• Adds a short quote starter directly below the homepage hero.
• Collects club name, work email, event date, and primary service.
• Carries all four values into the complete event brief for review.
• Keeps the storage boundary explicit. The starter does not claim to submit or store a lead.
• Adds automated coverage for the homepage-to-contact-page handoff.

Tested surfaces: desktop at 1440 pixels, mobile at 390 and 375 pixels, responsive overflow, and all four prefilled fields.

Known limitation: the Vercel deployment still needs hosted form storage and lead notifications. Phone and email remain the working contact paths.

## v0.2.0-country-club-copy

Country-club positioning and copy release.

• Reframes the homepage around member programming and one point of contact.
• Rewrites services around club calendars, member socials, cultural programming, workshops, and signature events.
• Adds club-operations language such as expected attendance, audience fit, event schedule, run of show, and deliverables.
• Rewrites the event brief and service calls to action in plain language.
• Removes internal source language, generic creative slogans, and unsupported sales claims.
• Applies AIDA, copy-editing, De-AI-ify, AntiSlop, and anti-AI writing checks.

Tested surfaces: 40 page and viewport combinations, internal links, responsive overflow, images, service filters, preselected services, and form labeling.

Known limitation: the Vercel deployment still needs hosted form storage and lead notifications. Phone and email remain the working contact paths.

## v0.1.2-roster-assets

Group-chat roster and portfolio update.

• Adds clean Ashwin DJ and Abin camera photos from the Sesha, Abin, and Sidd chat.
• Updates the current media roster to Charlie, Ashwin, and Abin.
• Moves Sidd to DJ, MC, music entertainment, and performer sourcing based on the newer team brief.
• Adds four public Instagram profiles shared for the dance roster.
• Holds Google Drive reels from the public site until public link access and usage approval are verified.

Tested surfaces: desktop and mobile team page, internal links, service filters, preselected services, and form labeling.

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
