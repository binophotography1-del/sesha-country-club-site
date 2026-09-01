# Abin Takeover Guide

This file is the operating guide for the Sesha Dasari event site.

## Current state

• Source of truth: the `main` branch in the private GitHub repository.
• Current release tag: `v0.3.14-remove-hero-label`.
• Production site: https://sesha-country-club-site.netlify.app/
• Netlify project: https://app.netlify.com/projects/sesha-country-club-site
• Netlify Forms: https://app.netlify.com/projects/sesha-country-club-site/forms
• Main contact and creative producer: Sesha Dasari.
• Lead notification email: `seshadasari@gmail.com`.

GitHub access and Netlify access are separate. Abin needs both to own the full release process.

## Project map

• `index.html`: public homepage and short quote starter.
• `c-services.html`: filterable services page.
• `c-team.html`: team roster and service assignments.
• `c-contact.html`: complete event brief and Netlify form.
• `service-*.html`: individual Comedy, Dance, Visuals, Music, and Hosting pages.
• `c-site.js`: shared navigation, service filters, and form behavior.
• `variants.css`: shared public-site styles and color tokens.
• `assets/`: approved web images.
• `server.mjs`: local development server and local form endpoint.
• `netlify.toml`: production build and publish settings.
• `scripts/package-netlify.sh`: creates the curated production folder.
• `VERSION_HISTORY.md`: release notes and restore points.
• `test-artifacts/transcript-qa.js`: browser QA for the selected public pages.

## Local setup

Clone the private repository, enter its folder, and run:

```bash
node server.mjs
```

Open `http://localhost:8798/`.

The local form stores valid development submissions in `data/inquiries.jsonl`. That file is ignored by Git. Do not commit real lead data.

## Change workflow

1. Pull `main` and create a short-lived branch.
2. Make the smallest needed edit.
3. Run the browser QA:

```bash
node test-artifacts/transcript-qa.js
```

4. The QA script updates tracked screenshots. Restore them when the visual change does not require new reference images:

```bash
git restore -- test-artifacts/c-contact-transcript.png test-artifacts/c-services-transcript.png test-artifacts/service-dance.png test-artifacts/variation-c-transcript.png
```

5. Check whitespace and review the exact change:

```bash
git diff --check
git diff
```

6. Commit with an outcome-based subject and a body listing the customer-facing change, test coverage, and known risk.
7. Push the branch for review. Merge into `main` after approval.

## Production deployment

The GitHub repository does not currently trigger automatic Netlify deployments. Deploy from an authenticated terminal after merging `main`.

First-time setup:

```bash
npx --yes netlify-cli@latest login
npx --yes netlify-cli@latest link --name sesha-country-club-site
```

Package and deploy:

```bash
bash scripts/package-netlify.sh
npx --yes netlify-cli@latest deploy --prod --no-build --dir netlify-dist --message "Describe the release" --json
```

After deployment:

• Open the production URL and check Home, Services, Team, and Contact.
• Test the homepage quote starter and confirm its values reach the full event brief.
• Submit a clearly labeled test only when form behavior changed.
• Confirm the submission in the Netlify Forms dashboard.
• Confirm Sesha received the notification email.

## Form ownership

The complete event brief is a native Netlify form named `event-brief`.

Do not remove or rename these elements without updating and retesting Netlify:

• `name="event-brief"`
• the hidden `form-name` field
• the honeypot field
• the production form action and success behavior

Netlify stores verified submissions. Email alerts target `seshadasari@gmail.com`. The homepage starter does not store a lead. It preloads the complete form.

Never place Netlify tokens, email passwords, lead exports, or private contact data in Git.

## Content and asset rules

• Do not publish prices. Sesha provides a custom quote for each event.
• Keep the stated response time at 24 hours unless Sesha changes the operating commitment.
• Publish client names, view counts, testimonials, and event totals only after source verification and approval.
• Get rights and preferred credits for each new photo, reel, and clip.
• Keep large video files outside Git. Link approved YouTube, Instagram, or hosted video pages.
• The Scarlett Johansson image requires written usage approval. Avoid language that implies endorsement.
• Keep Sesha as the main contact. Team members may serve more than one service lane.
• Keep the selected palette to ivory, charcoal, cream, and restrained gold. Do not reintroduce blue or red without team approval.

## Rollback

Use Git tags to inspect a stable source release:

```bash
git switch --detach v0.3.0-netlify-forms
```

Return to current work:

```bash
git switch main
```

For a production rollback, use the Netlify Deploys page to publish the last known good deploy. Then create a Git commit that matches the restored production state. Do not leave Git and production out of sync.

## Access Abin needs

• GitHub collaborator access to the private repository.
• Netlify team or site access for `sesha-country-club-site`.
• Approval to view form submissions, since they contain personal data.
• Confirmation from Sesha that form-alert emails reach her inbox.
• The approved asset and reel links that remain outside Git.

## Open items

• Replace the Comedy reel placeholders after Sesha supplies durable public video links or approved hosted files.
• Confirm whether Abin already combined Rick's three comedy clips before creating a second edit.
• Replace the Abin Thomas, Yuvhan Suresh, and Jai headshot placeholders after approved portraits arrive. Confirm Jai's preferred full name before expanding his public label.
• Connect GitHub to Netlify if the team wants automatic deploys after merges.
• Connect a custom domain when the team selects one.
• Confirm the Netlify notification email reaches Sesha outside the test environment.
• Close the image-rights and public-link approvals listed in `README.md`.
• Add field-level form errors and focus handling before paid traffic.
