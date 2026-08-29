# Sesha Dasari Event Site

Private collaboration checkpoint for a country-club and private-event booking site.

## Chosen direction

Clear Concierge uses DM Serif Display and IBM Plex Sans. It now uses separate pages:

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
• Deep navy `#23395B` carries navigation, hero sections, and selected states.
• Burgundy `#7A263A` marks quote and booking actions.
• Muted gold `#C5A46D` is limited to borders, cards, and large accent sections.

Primary reading pairs exceed WCAG AAA contrast. Navy on muted gold measures `4.93:1` and is reserved for large or bold interface text. Color does not carry meaning without text, borders, or state labels.

## Transcript-confirmed decisions

• Sesha is the main lead, creative producer, and contact.
• The public site shows no prices. Each event receives a custom quote.
• The site states a 24-hour response time.
• Sesha's public phone and email appear for direct contact.
• Services include hosting, MC work, red-carpet interviews, live event coverage, podcast facilitation, entertainment journalism, comedy, improv, games, coaching, dance, photography, videography, livestreaming, DJ services, music-performer sourcing, showcases, weddings, private parties, corporate events, and retreats.
• The Services filters narrow the list by service lane.
• Service links preselect the matching option in the inquiry form.
• People work across multiple lanes. Sesha leads hosting, comedy, coaching, interviews, and production. Rick performs comedy. Yuvhan and Abin lead dance work. Charlie and Sidd handle photo, video, social coverage, and livestream production. The extended roster adds DJs, musicians, teaching artists, comedians, dancers, and other specialists per event.
• Video proof will link to YouTube or unlisted YouTube. The site will not host large video files.

## Form behavior

The form sends event details to the local Node server. The server validates the request and stores one JSON record per line in `data/inquiries.jsonl`.

The browser shows a receipt with a reference ID. Phone and email remain visible as fallback contact options. The lead file stays outside the public web routes and is excluded from Git.

This is local capture, not a hosted CRM. Before public launch, connect the same endpoint to durable storage and an email or text alert for Sesha.

## Public-release gates

• Approved public link for Rick's comedy reel.
• Approved public dance reel for Yuvhan and Abin.
• Approved photography and video portfolio links for Charlie and Sidd.
• Rights and preferred credits for every image and clip.
• Written approval to use the Scarlett Johansson photo as the homepage hero without implying endorsement.
• Confirmed team roster. Newer group-chat notes conflict with the current media and music assignments.
• Hosted form storage plus an email or text alert for Sesha.
• Field-level form errors and focus handling.
• Final travel range, AV needs, clean-content standard, set lengths, and quote rules.

The discussed claims about social views and completed events remain unpublished because the transcript did not verify the numbers.

## Messages asset selection

The live site uses work-focused assets from the Sesha, Abin, and Sidd group chat:

• Sesha holding a microphone on a live red carpet.
• Sesha actively interviewing a red-carpet guest.
• Sesha photographed with Scarlett Johansson, selected by the team for the homepage hero.
• Sesha performing comedy.
• Rick performing stand-up and his portrait.
• A two-person dance performance and a solo dance performance.

Other celebrity and networking selfies were reviewed but excluded. Large `.mov` files remain off the site. The hosting page links the public Instagram reel shared in the chat.

## Run

```bash
node server.mjs
```

Open `http://localhost:8798/`.

Submitted leads appear in `data/inquiries.jsonl` after the first valid request.
