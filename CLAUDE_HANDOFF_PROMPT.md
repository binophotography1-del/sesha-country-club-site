# Claude Code collaborator prompt

Copy everything below this line into Claude Code.

---

You are taking over the Sesha Dasari event website. Pull the complete current project from its private GitHub repository and make changes without losing existing work.

Repository:
https://github.com/siddchauhan77/sesha-country-club-site

Production:
https://sesha-country-club-site.netlify.app/

Current stable source tag:
`v0.3.18-collaborator-handoff`

## Before starting

1. Confirm I have collaborator access to the private GitHub repository.
2. Confirm GitHub CLI is installed and authenticated by running:

```bash
gh auth status
```

3. If access fails, stop and tell me Sidd must add my GitHub username as a repository collaborator.
4. Do not create a replacement repository or download only part of the site.

If the project is not on this computer:

```bash
gh repo clone siddchauhan77/sesha-country-club-site
cd sesha-country-club-site
```

If the project folder already exists:

1. Enter it.
2. Run `git status`.
3. If there are local changes, stop and show them. Do not overwrite, discard, stash, or reset them without approval.

Then sync safely:

```bash
git fetch --all --tags --prune
git switch main
git pull --ff-only origin main
git status
```

Read these files completely before editing:

• `HANDOFF.md`
• `README.md`
• `VERSION_HISTORY.md`
• `index.html`
• `c-services.html`
• `c-contact.html`
• `variants.css`
• `c-site.js`

Install the local tools:

```bash
npm install
npx playwright install chromium
```

Start the site:

```bash
npm start
```

Open http://localhost:8798/.

## Project rules

• `main` is the source of truth.
• Create a short-lived branch before editing:

```bash
git switch -c abin/short-change-name
```

Replace `abin` with your name if needed.

• Keep the live palette ivory, charcoal, cream, and restrained gold. Do not add blue or red without team approval.
• Keep the main navigation limited to Services and Contact Us.
• Do not publish prices. Sesha provides custom quotes.
• Keep Sesha as the main contact.
• Do not publish client names, testimonials, view counts, or event totals without verified proof and approval.
• Do not imply Scarlett Johansson endorses the service.
• Get usage approval and preferred credits for every new image or video.
• Do not commit large video files. Use approved public YouTube, Instagram, or hosted links.
• Do not commit Netlify tokens, passwords, form exports, personal lead data, `.env` files, `data/inquiries.jsonl`, `node_modules`, or `netlify-dist`.
• Do not rename or remove the Netlify form name, hidden `form-name` field, honeypot, or success behavior without testing submissions.
• Preserve service-specific form preselection.
• Keep historical variation files unless the team explicitly asks to remove them.
• Make the smallest edit needed. Do not rewrite unrelated files.

## For each requested change

1. Restate the requested outcome.
2. List the files you expect to edit.
3. Inspect the existing implementation.
4. Make the change.
5. Test desktop and mobile layouts.
6. Keep one `h1` per page, no horizontal overflow, no broken images, valid links, and labeled form controls.
7. Run the full QA while `npm start` is running:

```bash
npm test
```

8. If the test updates screenshots for pages you did not intentionally change, review and restore only those unrelated screenshots.
9. Run:

```bash
git diff --check
git diff
git status
```

10. Summarize what changed, what passed, and any unverified claims or missing assets.
11. Do not deploy or merge until the team approves the preview.

Commit after approval:

```bash
git add <only-the-intended-files>
git commit -m "Describe the user-facing outcome"
git push -u origin <your-branch-name>
```

Send the branch or pull-request link to Sidd, Sesha, and Abin for review.

## Deployment rules

• GitHub does not automatically deploy to Netlify.
• Netlify access is separate from GitHub access.
• Only deploy after the approved branch is merged into `main`.
• Package with:

```bash
npm run package:netlify
```

First-time Netlify setup:

```bash
npx --yes netlify-cli@latest login
npx --yes netlify-cli@latest link --name sesha-country-club-site
```

Production deploy:

```bash
npx --yes netlify-cli@latest deploy --prod --no-build --dir netlify-dist --message "Describe the release" --json
```

After deployment:

• Verify Home, Services, Team, Contact, mobile layout, form handoff, and the production URL.
• Submit a labeled test inquiry only when form behavior changes.
• Confirm the test appears in Netlify Forms and that Sesha receives the notification email.
• Never retry an uncertain form submission or deployment without checking whether the first attempt succeeded.

Start by completing the access checks, syncing `main`, reading the handoff files, installing dependencies, running the local site and `npm test`, and reporting the baseline. Do not make design or copy changes until I provide the first requested change.

## Access Sidd must grant separately

• GitHub collaborator access for the private repository.
• Netlify site or team access for deployment.
• Netlify Forms access only if the collaborator should see personal lead data.

---
