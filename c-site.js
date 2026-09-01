(() => {
  const servicesLink = [...document.querySelectorAll('.site-top nav > a')].find((link) => {
    const pathname = new URL(link.href, window.location.href).pathname.replace(/\/$/, '');
    return pathname.endsWith('/c-services') || pathname.endsWith('/c-services.html');
  });
  if (servicesLink) {
    const menu = document.createElement('div');
    menu.className = 'services-menu';

    const toggle = document.createElement('button');
    toggle.className = 'services-menu-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'services-subnav');
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.innerHTML = 'Services <span aria-hidden="true"><svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-left:4px"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

    const subnav = document.createElement('div');
    subnav.className = 'services-subnav';
    subnav.id = 'services-subnav';
    subnav.setAttribute('aria-label', 'Service pages');

    const servicePages = [
      ['All Services', 'c-services.html'],
      ['Live Entertainment', 'c-services.html#entertainment'],
      ['Media', 'c-services.html#media'],
      ['Workshops', 'c-services.html#workshops']
    ];
    const currentPage = (window.location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');
    servicePages.forEach(([label, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (currentPage === href.replace(/\.html$/, '')) link.setAttribute('aria-current', 'page');
      subnav.append(link);
    });

    menu.append(toggle, subnav);
    servicesLink.replaceWith(menu);

    const closeMenu = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const willOpen = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
    });

    menu.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      closeMenu();
      toggle.focus();
    });

    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target)) closeMenu();
    });
  }

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  const filterStatus = document.querySelector('#filter-status');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      let visible = 0;
      cards.forEach((card) => {
        const show = selected === 'all' || card.dataset.category === selected;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (filterStatus) {
        const label = button.textContent.trim();
        filterStatus.textContent = selected === 'all' ? `Showing all ${visible} services.` : `Showing ${visible} ${label.toLowerCase()} service${visible === 1 ? '' : 's'}.`;
      }
    });
  });

  const form = document.querySelector('#quote-form');
  const serviceSelect = document.querySelector('#service');
  if (!form || !serviceSelect) return;

  const query = new URLSearchParams(window.location.search);
  const requestedService = query.get('service');
  if (requestedService && [...serviceSelect.options].some((option) => option.value === requestedService)) serviceSelect.value = requestedService;

  const prefilledFields = {
    organization: 'organization',
    email: 'email',
    eventDate: 'event-date'
  };
  Object.entries(prefilledFields).forEach(([parameter, fieldId]) => {
    const value = query.get(parameter);
    const field = document.getElementById(fieldId);
    if (value && field) field.value = value;
  });

  const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const isNetlify = window.location.hostname.endsWith('.netlify.app');
  if (!isLocal && !isNetlify) {
    form.action = 'https://sesha-country-club-site.netlify.app/thanks.html';
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const status = document.querySelector('#form-status');
    const originalButtonText = submitButton.textContent;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const selectedLabel = serviceSelect.options[serviceSelect.selectedIndex].text;
    const payload = { ...data, serviceLabel: selectedLabel, sourcePage: `${window.location.pathname}${window.location.search}` };

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    status.className = 'form-status';
    status.textContent = 'Sending your event details…';

    try {
      let response;
      let receipt = '';

      if (isLocal) {
        response = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'The request did not go through.');
        receipt = result.id ? ` Reference: ${result.id}.` : '';
      } else {
        const netlifyData = new URLSearchParams();
        Object.entries(payload).forEach(([key, value]) => netlifyData.set(key, value));
        netlifyData.set('form-name', form.getAttribute('name'));
        response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: netlifyData.toString()
        });
        if (!response.ok) throw new Error('The request did not go through.');
      }

      const preservedService = serviceSelect.value;
      form.reset();
      serviceSelect.value = preservedService;
      status.className = 'form-status is-success';
      status.textContent = `Thanks. Your event brief was received.${receipt} Sesha will reply within 24 hours.`;
      status.focus();
    } catch (error) {
      status.className = 'form-status is-error';
      status.textContent = `${error.message} Please try again, call 512-538-8146, or email seshadasari@gmail.com.`;
      status.focus();
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
})();
