// ==========================================================================
// main.js
// Loads content.yaml and renders the whole page from it. No copy lives in
// this file or in index.html — only structure and behaviour do.
// ==========================================================================

const CHAR_POOLS = {
  latin: 'abcdefghijklmnopqrstuvwxyz0123456789',
  greek: 'αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
  katakana: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
};

// -------------------------------------------------------------- scramble --
class TextScramble {
  constructor(el) {
    this.el = el;
    this.queue = [];
    this.frame = 0;
    this.frameRequest = null;
    this.resolve = null;
    this.pool = CHAR_POOLS.latin;
  }
  setText(newText, poolKey = 'latin') {
    const oldText = this.el.textContent;
    const length = Math.max(oldText.length, newText.length);
    this.pool = CHAR_POOLS[poolKey] || CHAR_POOLS.latin;
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 16);
      const end = start + 6 + Math.floor(Math.random() * 14);
      this.queue.push({ from, to, start, end, char: null });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this._update();
    return promise;
  }
  _update() {
    let output = '';
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      const item = this.queue[i];
      if (this.frame >= item.end) {
        complete++;
        output += item.to;
      } else if (this.frame >= item.start) {
        if (!item.char || Math.random() < 0.3) {
          item.char = this.pool[Math.floor(Math.random() * this.pool.length)];
        }
        output += `<span class="char">${item.char}</span>`;
      } else {
        output += item.from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frame++;
      this.frameRequest = requestAnimationFrame(() => this._update());
    }
  }
}

function initNameScramble(content) {
  const el = document.getElementById('hero-name');
  if (!el) return;
  const original = content.home.name;
  const variants = content.home.name_variants || {};
  const fx = new TextScramble(el);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  el.addEventListener('mouseenter', (e) => {
    if (reduced) return;
    const rect = el.getBoundingClientRect();
    const fromTop = e.clientY < rect.top + rect.height / 2;
    if (fromTop && variants.from_top) {
      fx.setText(variants.from_top, 'greek');
    } else if (!fromTop && variants.from_bottom) {
      fx.setText(variants.from_bottom, 'katakana');
    }
  });

  el.addEventListener('mouseleave', () => {
    if (reduced) return;
    fx.setText(original, 'latin');
  });
}

// ---------------------------------------------------------------- render --
function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === 'html') node.innerHTML = v;
    else if (k === 'class') node.className = v;
    else node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c) node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

function paragraphs(text) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((block) => el('p', {}, block.trim()));
}

// Renders a heading + body + any nested subsections at increasing depth.
function renderTextNode(node, depth = 2) {
  const tag = `h${Math.min(depth, 6)}`;
  const wrap = el('div', { class: 'nested-section' });
  wrap.appendChild(el(tag, {}, node.heading));
  if (node.content) paragraphs(node.content).forEach((p) => wrap.appendChild(p));
  (node.subsections || []).forEach((sub) => wrap.appendChild(renderTextNode(sub, depth + 1)));
  return wrap;
}

function renderNav(content) {
  const nav = document.getElementById('nav');
  Object.entries(content.nav).forEach(([id, label]) => {
    nav.appendChild(el('a', { class: 'nav__link', href: `#${id}` }, label));
  });
}

function renderHome(content) {
  const s = content.home;
  return el('section', { id: 'home', class: 'hero' }, [
    el('h1', { class: 'hero__name', id: 'hero-name' }, s.name),
    el('p', { class: 'hero__tagline' }, s.tagline),
  ]);
}

function renderAbout(content) {
  const s = content.about;
  const section = el('section', { id: 'about' }, [el('h2', {}, s.heading)]);
  if (s.content) paragraphs(s.content).forEach((p) => section.appendChild(p));
  (s.subsections || []).forEach((sub) => section.appendChild(renderTextNode(sub, 3)));
  return section;
}

function renderSkills(content) {
  const s = content.skills;
  const section = el('section', { id: 'skills' }, [el('h2', {}, s.heading)]);
  s.categories.forEach((cat) => {
    const block = el('div', { class: 'skills__category' }, [el('h3', {}, cat.name)]);
    const list = el('ul', { class: 'chip-list' });
    cat.items.forEach((item) => list.appendChild(el('li', { class: 'chip' }, item)));
    block.appendChild(list);
    section.appendChild(block);
  });
  return section;
}

function renderProjects(content) {
  const s = content.projects;
  const section = el('section', { id: 'projects' }, [el('h2', {}, s.heading)]);
  s.items.forEach((p) => {
    const card = el('div', { class: 'project' }, [
      el('h3', {}, p.title),
      el('p', {}, p.description.trim()),
    ]);
    if (p.link) card.appendChild(el('a', { href: p.link, target: '_blank', rel: 'noopener' }, 'View project →'));
    section.appendChild(card);
  });
  return section;
}

function renderExperience(content) {
  const s = content.experience;
  const section = el('section', { id: 'experience' }, [el('h2', {}, s.heading)]);
  s.items.forEach((x) => {
    section.appendChild(
      el('div', { class: 'timeline__item' }, [
        el('h3', {}, `${x.role} · ${x.company}`),
        el('div', { class: 'timeline__meta' }, x.period),
        el('p', {}, x.description),
      ])
    );
  });
  return section;
}

function renderContact(content) {
  const s = content.contact;
  const list = el('ul', { class: 'contact__links' }, [
    el('li', {}, el('a', { href: `mailto:${s.email}` }, [el('i', { class: 'fa-solid fa-envelope' }), ` ${s.email}`])),
    el('li', {}, el('a', { href: s.github, target: '_blank', rel: 'noopener' }, [el('i', { class: 'fa-brands fa-github' }), ' GitHub'])),
    el('li', {}, el('a', { href: s.linkedin, target: '_blank', rel: 'noopener' }, [el('i', { class: 'fa-brands fa-linkedin' }), ' LinkedIn'])),
    el('li', {}, el('a', { href: s.resume, download: '' }, [el('i', { class: 'fa-solid fa-file-arrow-down' }), ' Resume'])),
  ]);
  return el('section', { id: 'contact' }, [el('h2', {}, s.heading), list]);
}

function renderPage(content) {
  document.title = content.meta.title;
  renderNav(content);
  const main = document.getElementById('main');
  main.appendChild(renderHome(content));
  main.appendChild(renderAbout(content));
  main.appendChild(renderSkills(content));
  main.appendChild(renderProjects(content));
  main.appendChild(renderExperience(content));
  main.appendChild(renderContact(content));
  document.getElementById('footer').textContent = content.footer.text;
  initNameScramble(content);
}

// ------------------------------------------------------------ theme toggle
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const root = document.documentElement;

  const apply = (theme) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      icon.className = 'fa-solid fa-moon';
      toggle.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      icon.className = 'fa-solid fa-sun';
      toggle.setAttribute('aria-pressed', 'false');
    }
  };

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(saved || (prefersDark ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem('theme', next);
  });
}

// --------------------------------------------------------------- bootstrap
async function init() {
  initThemeToggle();
  try {
    const res = await fetch('content.yaml');
    if (!res.ok) throw new Error('content.yaml not found');
    const text = await res.text();
    const content = jsyaml.load(text);
    renderPage(content);
  } catch (err) {
    document.getElementById('main').innerHTML =
      '<section><h2>Could not load content.yaml</h2>' +
      '<p>Browsers block local file reads over <code>file://</code>. Serve this folder with a ' +
      'local server, e.g. <code>python3 -m http.server</code> in this directory, then open ' +
      '<code>http://localhost:8000</code>.</p></section>';
    console.error(err);
  }
}

init();
