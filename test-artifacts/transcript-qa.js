const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const pages = ['index.html', 'c-services.html', 'c-team.html', 'c-contact.html', 'thanks.html', 'service-hosting.html', 'service-comedy.html', 'service-dance.html', 'service-media.html', 'service-music.html'];
  const widths = [1440, 1024, 768, 390, 375];
  const results = [];

  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const path of pages) {
      const response = await page.goto(`http://127.0.0.1:8798/${path}`, { waitUntil: 'networkidle' });
      const audit = await page.evaluate(() => ({
        h1: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).length,
        emptyLinks: [...document.querySelectorAll('a')].filter((link) => !link.getAttribute('href')).length,
        currentNav: document.querySelectorAll('.site-top [aria-current="page"]').length
      }));
      results.push({ width, path, status: response.status(), ...audit });
    }
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://127.0.0.1:8798/c-services.html', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Dance' }).click();
  const filter = await page.evaluate(() => ({
    status: document.querySelector('#filter-status').textContent,
    visible: [...document.querySelectorAll('[data-category]')].filter((card) => !card.hidden).length,
    pressed: document.querySelector('[data-filter="dance"]').getAttribute('aria-pressed')
  }));
  await page.screenshot({ path: 'test-artifacts/c-services-transcript.png', fullPage: true });

  await page.goto('http://127.0.0.1:8798/c-contact.html?service=dance', { waitUntil: 'networkidle' });
  const form = await page.evaluate(() => ({
    selected: document.querySelector('#service').value,
    controls: document.querySelectorAll('input:not([type="hidden"]), select, textarea').length,
    labeled: [...document.querySelectorAll('input:not([type="hidden"]), select, textarea')].filter((control) => control.labels && control.labels.length).length,
    required: [...document.querySelectorAll('[required]')].map((control) => control.id)
  }));
  await page.screenshot({ path: 'test-artifacts/c-contact-transcript.png', fullPage: true });

  await page.goto('http://127.0.0.1:8798/index.html', { waitUntil: 'networkidle' });
  await page.fill('#starter-organization', 'Sample Country Club');
  await page.fill('#starter-email', 'events@example.com');
  await page.fill('#starter-date', '2026-10-24');
  await page.selectOption('#starter-service', 'dance');
  await Promise.all([
    page.waitForURL(/c-contact\.html\?/),
    page.getByRole('button', { name: 'Continue my event brief' }).click()
  ]);
  const starter = await page.evaluate(() => ({
    organization: document.querySelector('#organization').value,
    email: document.querySelector('#email').value,
    eventDate: document.querySelector('#event-date').value,
    service: document.querySelector('#service').value,
    hash: window.location.hash,
    formTarget: Boolean(document.querySelector('#event-brief'))
  }));

  const ctaPages = ['service-hosting.html', 'service-comedy.html', 'service-dance.html', 'service-media.html', 'service-music.html'];
  const ctaRouting = [];
  for (const path of ctaPages) {
    await page.goto(`http://127.0.0.1:8798/${path}`, { waitUntil: 'networkidle' });
    const routes = await page.evaluate(() => [...document.querySelectorAll('.nav-action, .primary-button')].map((link) => link.getAttribute('href')));
    ctaRouting.push({ path, routes, allReachForm: routes.every((route) => route && route.includes('#event-brief')) });
  }

  await page.goto('http://127.0.0.1:8798/index.html', { waitUntil: 'networkidle' });
  const homeRouting = await page.evaluate(() => ({
    hero: document.querySelector('.hero-c .primary-button').getAttribute('href'),
    starterTarget: Boolean(document.querySelector('#home-event-brief')),
    action: document.querySelector('.home-quote-form').getAttribute('action')
  }));

  await page.goto('http://127.0.0.1:8798/service-hosting.html', { waitUntil: 'networkidle' });
  const hostingReel = await page.evaluate(() => {
    const link = document.querySelector('a[href="https://youtube.com/shorts/qSvW5weyFE4"]');
    return {
      present: Boolean(link),
      target: link?.getAttribute('target'),
      rel: link?.getAttribute('rel'),
      imageLoaded: Boolean(link?.querySelector('img')?.complete && link.querySelector('img').naturalWidth)
    };
  });

  await page.goto('http://127.0.0.1:8798/service-dance.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'test-artifacts/service-dance.png', fullPage: true });
  await page.goto('http://127.0.0.1:8798/index.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'test-artifacts/variation-c-transcript.png', fullPage: true });

  const pagesWithoutCurrentNav = new Set([
    'c-team.html',
    'thanks.html',
    'service-hosting.html',
    'service-comedy.html',
    'service-dance.html',
    'service-media.html',
    'service-music.html'
  ]);
  const failures = results.filter((item) => item.status !== 200 || item.h1 !== 1 || item.overflow || item.brokenImages || item.emptyLinks || item.currentNav !== (pagesWithoutCurrentNav.has(item.path) ? 0 : 1));
  console.log(JSON.stringify({ failures, filter, form, starter, ctaRouting, homeRouting, hostingReel, tested: results.length }, null, 2));
  await browser.close();
  if (failures.length || filter.visible !== 2 || filter.pressed !== 'true' || form.selected !== 'dance' || form.controls !== form.labeled || starter.organization !== 'Sample Country Club' || starter.email !== 'events@example.com' || starter.eventDate !== '2026-10-24' || starter.service !== 'dance' || starter.hash !== '#event-brief' || !starter.formTarget || ctaRouting.some((item) => !item.allReachForm) || homeRouting.hero !== '#home-event-brief' || !homeRouting.starterTarget || homeRouting.action !== 'c-contact.html#event-brief' || !hostingReel.present || hostingReel.target !== '_blank' || hostingReel.rel !== 'noreferrer' || !hostingReel.imageLoaded) process.exit(1);
})();
