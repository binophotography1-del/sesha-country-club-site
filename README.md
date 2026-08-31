# Sesha Dasari Event Site

Private source repository for a country-club and private-event booking site deployed on Netlify.

## Team handoff

Start with `HANDOFF.md` before editing or deploying. It covers the project map, local QA, Netlify release process, form ownership, access requirements, rollback, and open risks.

## Chosen direction

Clear Concierge uses DM Serif Display and IBM Plex Sans. The public copy positions Sesha as one point of contact for country-club member programming. It uses separate pages:

• `index.html` is the customer-facing Home page.
• `c-services.html` is the filterable Services page.
• `c-team.html` is the flexible Team roster.
• `c-contact.html` is the custom-quote inquiry form.
• `service-hosting.html` is Hosting.
• `service-comedy.html` is Comedy.
• `service-dance.html` is Dance.
• `service-media.html` is Photography and Video.
• `design-archive.html` compares the three early design directions.
• `variation-a.html`, `variation-b.html`, and `variation-c.html` preserve the original explorations.

See `VERSION_HISTORY.md` for checkpoints, tags, tested surfaces, and open risks.

## Private-club color system

• Warm ivory `#FAF9F6` is the main background.
• Charcoal `#1C1C1C` is the main reading color.
• Cream `#F4EFE5` separates cards, forms, and proof sections from the page.
• Muted gold `#C5A46D` marks quote actions, selected states, borders, and restrained accents.
• Charcoal carries navigation, hero sections, footers, and secondary actions.

The selected public direction uses no blue or red. Charcoal text on muted gold measures about `7.2:1`. Ivory text on charcoal measures about `16.2:1`. Color does not carry meaning without text, borders, or state labels.

## Transcript-confirmed decisions

• Sesha is the main lead, creative producer, and contact.
• The public site shows no prices. Each event receives a custom quote.
• The site states a 24-hour response time.
• Sesha's public phone and email appear for direct contact.
• Services include hosting, MC work, red-carpet interviews, live event coverage, podcast facilitation, entertainment journalism, comedy, improv, games, coaching, dance, photography, videography, livestreaming, DJ services, music-performer sourcing, showcases, weddings, private parties, corporate events, and retreats.
• The Services filters narrow the list by programming category.
• Service links preselect the matching option in the inquiry form.
• People work across multiple lanes. Sesha leads hosting, comedy, coaching, interviews, and production. Rick performs comedy. Yuvhan and Abin lead dance work. Charlie, Ashwin, and Abin support media work. Sidd supports DJ, MC, music entertainment, and performer sourcing. The extended roster adds musicians, teaching artists, comedians, dancers, and other specialists per event.
• Video proof will link to YouTube or unlisted YouTube. The site will not host large video files.

## Form behavior

The homepage includes a short quote starter for the club name, work email, event date, and primary service. It passes those details into the complete event brief on `c-contact.html`, where the visitor reviews and finishes the request.

On Netlify, the complete event brief uses native Netlify Forms. Verified submissions appear in the Netlify Forms dashboard and trigger an email notification to `seshadasari@gmail.com`. The form includes a honeypot field and a no-JavaScript success page.

During local development, the form sends event details to the local Node server. The server validates the request and stores one JSON record per line in `data/inquiries.jsonl`. The local lead file stays outside the public web routes and is excluded from Git.

The homepage starter does not store a lead by itself. It hands the visitor to the complete brief. The Vercel deployment posts completed briefs to the Netlify form endpoint as a fallback.

## Public-release gates

• Approved public link for Rick's comedy reel.
• Approved public dance reel for Yuvhan and Abin.
• Approved photography and video portfolio links for Charlie, Ashwin, and Abin.
• Rights and preferred credits for every image and clip.
• Written approval to use the Scarlett Johansson photo as the homepage hero without implying endorsement.
• Final team approval for the current media, music, and dance assignments.
• Field-level form errors and focus handling.
• Final travel range, AV needs, clean-content standard, set lengths, and quote rules.

The discussed claims about social views and completed events remain unpublished because the transcript did not verify the numbers.

## Country-club copy direction

The public pages lead with the needs of general managers, member-experience teams, and event staff:

• Member programming and the club calendar.
• One point of contact for the roster.
• Audience, venue, schedule, and run-of-show fit.
• Expected attendance and service mix in the event brief.
• Photo, video, livestream, and social deliverables after the event.

The copy avoids unverified club clients, attendance results, testimonials, content-suitability promises, and operational guarantees.

## Messages asset selection

The live site uses work-focused assets from the Sesha, Abin, and Sidd group chat:

• Sesha holding a microphone on a live red carpet.
• Sesha actively interviewing a red-carpet guest.
• Sesha photographed with Scarlett Johansson, selected by the team for the homepage hero.
• Sesha performing comedy.
• Rick performing stand-up and his portrait.
• A two-person dance performance and a solo dance performance.
• Ashwin performing a DJ set.
• Abin holding a professional camera.

Other celebrity and networking selfies were reviewed but excluded. Large `.mov` files remain off the site. The hosting page links the public Instagram reel shared in the chat.

## Run

```bash
node server.mjs
```

Open `http://localhost:8798/`.

Submitted leads appear in `data/inquiries.jsonl` after the first valid request.

## Netlify deployment

`scripts/package-netlify.sh` creates the curated production directory configured by `netlify.toml`. It includes only the selected public pages, scripts, styles, headers, and approved assets.

Production: `https://sesha-country-club-site.netlify.app/`
