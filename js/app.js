function createEl(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c) node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

function createParagraphs(text) {
  if (!text) return [];
  return text.trim().split(/\n\s*\n/).map(block => createEl('p', {}, block.trim()));
}

function switchSection(secId) {
  if (!secId) return;
  const allViews = document.querySelectorAll('.page-view');
  const allSpans = document.querySelectorAll('.title-char');
  const bracketEl = document.getElementById('current-section-bracket');

  let targetSec = CONTENT.sections.find(s => s.id === secId);
  if (!targetSec || targetSec.type === 'none') {
    targetSec = CONTENT.sections[0];
    secId = targetSec.id;
  }

  allViews.forEach(v => v.classList.remove('active-page'));
  allSpans.forEach(s => s.classList.remove('active-char'));

  const activeView = document.getElementById(`view-${secId}`);
  if (activeView) activeView.classList.add('active-page');

  const activeSpan = document.querySelector(`.title-char[data-id="${secId}"]`);
  if (activeSpan) activeSpan.classList.add('active-char');

  if (bracketEl) bracketEl.textContent = `[ ${targetSec.title} ]`;

  try {
    window.location.hash = secId;
  } catch (err) {}
}

function initInteractiveTitle() {
  const container = document.getElementById('interactive-title');
  if (!container) return;

  CONTENT.sections.forEach((sec) => {
    const isActionable = Boolean(sec.id && sec.type !== 'none');
    const spanClass = `title-char ${isActionable ? 'clickable' : 'no-action'}`;
    const props = { class: spanClass };
    if (isActionable) props['data-id'] = sec.id;

    const span = createEl('span', props, sec.latin);

    if (isActionable) {
      span.addEventListener('mouseenter', () => {
        span.textContent = sec.katakana;
      });

      span.addEventListener('mouseleave', () => {
        span.textContent = sec.latin;
      });

      span.addEventListener('click', () => {
        switchSection(sec.id);
      });
    }

    container.appendChild(span);
  });
}

function renderApp() {
  document.title = CONTENT.meta.title;
  const viewsContainer = document.getElementById('content-views');

  initInteractiveTitle();

  CONTENT.sections.forEach((sec) => {
    if (!sec.id || sec.type === 'none') return;

    const view = createEl('div', { id: `view-${sec.id}`, class: 'page-view' });
    view.appendChild(createEl('h2', { class: 'section-heading' }, sec.heading));

    if (sec.type === 'home') {
      view.appendChild(createEl('p', { style: 'font-weight: 500;' }, sec.tagline));
      createParagraphs(sec.content).forEach(p => view.appendChild(p));
    } else if (sec.type === 'about') {
      createParagraphs(sec.content).forEach(p => view.appendChild(p));
    } else if (sec.type === 'skills') {
      sec.categories.forEach(cat => {
        const group = createEl('div', { class: 'skills-group' }, [createEl('h3', {}, cat.name)]);
        const list = createEl('ul', { class: 'skills-list' });
        cat.items.forEach(item => list.appendChild(createEl('li', { class: 'skill-tag' }, item)));
        group.appendChild(list);
        view.appendChild(group);
      });
    } else if (sec.type === 'projects') {
      sec.items.forEach(p => {
        const card = createEl('div', { class: 'item-card' }, [
          createEl('h3', {}, p.title),
          createEl('p', {}, p.description)
        ]);
        if (p.link) {
          card.appendChild(createEl('a', { href: p.link, target: '_blank', rel: 'noopener' }, 'View source →'));
        }
        view.appendChild(card);
      });
    } else if (sec.type === 'experience') {
      sec.items.forEach(x => {
        view.appendChild(createEl('div', { class: 'item-card' }, [
          createEl('h3', {}, `${x.role} · ${x.company}`),
          createEl('div', { class: 'item-meta' }, x.period),
          createEl('p', { style: 'margin-bottom:0;' }, x.description)
        ]));
      });
    } else if (sec.type === 'contact') {
      const contactList = createEl('ul', { class: 'contact-list' }, [
        createEl('li', {}, createEl('a', { href: `mailto:${sec.email}` }, [createEl('i', { class: 'fa-solid fa-envelope' }), ` ${sec.email}`])),
        createEl('li', {}, createEl('a', { href: sec.github, target: '_blank', rel: 'noopener' }, [createEl('i', { class: 'fa-brands fa-github' }), ' GitHub'])),
        createEl('li', {}, createEl('a', { href: sec.linkedin, target: '_blank', rel: 'noopener' }, [createEl('i', { class: 'fa-brands fa-linkedin' }), ' LinkedIn'])),
        createEl('li', {}, createEl('a', { href: sec.resume, download: '' }, [createEl('i', { class: 'fa-solid fa-file-arrow-down' }), ' Resume']))
      ]);
      view.appendChild(contactList);
    }

    viewsContainer.appendChild(view);
  });

  let initialHash = 'whoami';
  try {
    initialHash = window.location.hash.replace('#', '') || 'whoami';
  } catch (e) {}
  switchSection(initialHash);
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const root = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      icon.className = 'fa-solid fa-toggle-on';
    } else {
      root.removeAttribute('data-theme');
      icon.className = 'fa-solid fa-toggle-off';
    }
  };

  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  btn.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

window.addEventListener('hashchange', () => {
  try {
    const hash = window.location.hash.replace('#', '') || 'whoami';
    switchSection(hash);
  } catch (e) {}
});

window.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  renderApp();
});
