(function () {
  const selector = 'a[href^="definitions/"][href$=".html"], a[href^="explanations/"][href$=".html"]';
  const cache = new Map();
  let popover;
  let hideTimer;

  function ensurePopover() {
    if (popover) return popover;

    popover = document.createElement('aside');
    popover.className = 'link-preview';
    popover.setAttribute('role', 'dialog');
    popover.setAttribute('aria-live', 'polite');
    popover.hidden = true;

    popover.addEventListener('mouseenter', () => clearTimeout(hideTimer));
    popover.addEventListener('mouseleave', scheduleHide);
    document.body.appendChild(popover);
    return popover;
  }

  async function fetchPreview(url) {
    if (cache.has(url)) return cache.get(url);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Could not load ${url}`);

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const header = doc.querySelector('header');
    const title = header ? header.textContent.trim() : doc.title;
    if (header) header.remove();
    doc.querySelectorAll('script, nav#TOC').forEach((node) => node.remove());

    const body = doc.body.innerHTML.trim();
    const content = `<div class="link-preview-title">${escapeHtml(title)}</div><div class="link-preview-body">${body}</div>`;
    cache.set(url, content);
    return content;
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[char]);
  }

  function positionPopover(anchor) {
    const box = ensurePopover();
    const rect = anchor.getBoundingClientRect();
    const margin = 12;
    const width = Math.min(420, window.innerWidth - margin * 2);

    box.style.width = `${width}px`;
    box.hidden = false;

    const height = box.offsetHeight;
    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY + 8;

    if (left + width > window.scrollX + window.innerWidth - margin) {
      left = window.scrollX + window.innerWidth - width - margin;
    }
    if (left < window.scrollX + margin) {
      left = window.scrollX + margin;
    }
    if (top + height > window.scrollY + window.innerHeight - margin) {
      top = rect.top + window.scrollY - height - 8;
    }
    if (top < window.scrollY + margin) {
      top = window.scrollY + margin;
    }

    box.style.left = `${left}px`;
    box.style.top = `${top}px`;
  }

  async function showPreview(anchor) {
    clearTimeout(hideTimer);
    const box = ensurePopover();
    box.innerHTML = '<div class="link-preview-title">Loading</div>';
    positionPopover(anchor);

    try {
      box.innerHTML = await fetchPreview(anchor.getAttribute('href'));
      positionPopover(anchor);
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([box]);
      }
    } catch {
      box.innerHTML = '<div class="link-preview-title">Preview unavailable</div>';
      positionPopover(anchor);
    }
  }

  function scheduleHide() {
    hideTimer = window.setTimeout(() => {
      if (popover) popover.hidden = true;
    }, 180);
  }

  function enhanceLinks() {
    document.querySelectorAll(selector).forEach((anchor) => {
      if (anchor.dataset.previewReady === 'true') return;
      anchor.dataset.previewReady = 'true';
      anchor.classList.add('has-preview');
      anchor.addEventListener('mouseenter', () => showPreview(anchor));
      anchor.addEventListener('focus', () => showPreview(anchor));
      anchor.addEventListener('mouseleave', scheduleHide);
      anchor.addEventListener('blur', scheduleHide);
    });
  }

  function enhanceMathBlocks(root) {
    const environmentSelector = [
      'div.definition',
      'div.theorem',
      'div.proposition',
      'div.corollary',
      'div.remark',
      'div.example'
    ].join(', ');

    root.querySelectorAll(environmentSelector).forEach((block) => {
      if (block.classList.contains('math-block')) return;

      const type = ['definition', 'theorem', 'proposition', 'corollary', 'remark', 'example']
        .find((name) => block.classList.contains(name));
      if (!type) return;

      block.classList.add('math-block', `math-block-${type}`);

      const label = block.querySelector(':scope > p:first-child > strong:first-child');
      if (!label) return;

      const next = label.nextSibling;
      if (next && next.nodeType === Node.TEXT_NODE) {
        next.textContent = next.textContent.replace(/^\.\s*/, '');
      }
    });

    root.querySelectorAll('p').forEach((paragraph) => {
      if (paragraph.closest(environmentSelector)) return;

      const label = paragraph.querySelector(':scope > strong:first-child');
      if (!label) return;

      const text = label.textContent.trim();
      const match = text.match(/^(Definition|Theorem|Proposition|Corollary|Remark|Example)\b/);
      if (!match) return;

      paragraph.classList.add('math-block', `math-block-${match[1].toLowerCase()}`);

      const next = label.nextSibling;
      if (next && next.nodeType === Node.TEXT_NODE) {
        next.textContent = next.textContent.replace(/^\.\s*/, '');
      }
    });
  }

  enhanceMathBlocks(document);
  enhanceLinks();

  if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
    window.MathJax.startup.promise.then(enhanceLinks);
  }
})();
