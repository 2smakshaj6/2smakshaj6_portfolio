const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setSelected(tabEl, tablist) {
  tablist.querySelectorAll('.fnav-tab').forEach(t => {
    const selected = t === tabEl;
    t.setAttribute('aria-selected', selected ? 'true' : 'false');
    t.tabIndex = selected ? 0 : -1;
  });
}

function animateSwap(outEl, inEl) {
  if (!outEl || !inEl || isReduced) {
    if (outEl) outEl.hidden = true;
    if (inEl) inEl.hidden = false;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    outEl.classList.remove('fnav-enter','fnav-enter-active');
    outEl.classList.add('fnav-exit');
    inEl.classList.add('fnav-enter'); inEl.hidden = false;
    requestAnimationFrame(() => {
      outEl.classList.add('fnav-exit-active');
      inEl.classList.add('fnav-enter-active');
      const done = () => {
        outEl.classList.remove('fnav-exit','fnav-exit-active');
        inEl.classList.remove('fnav-enter','fnav-enter-active');
        outEl.hidden = true;
        resolve();
      };
      const dur = parseFloat(getComputedStyle(inEl).transitionDuration || '0') || 0.38;
      setTimeout(done, dur * 1000 + 20);
    });
  });
}

function initTablist() {
  const tablist = document.querySelector('.folderNav');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll('.fnav-tab'));

  tablist.setAttribute('role','tablist');
  tabs.forEach(t => {
    t.setAttribute('role','tab');
    t.setAttribute('aria-selected','false');
    t.tabIndex = -1;
    const target = t.dataset.fnavTarget;
    if (target) {
      const panel = document.getElementById(target);
      if (panel) panel.setAttribute('role','tabpanel');
    }
  });

  function activate(tab) {
    const target = tab?.dataset?.fnavTarget;
    setSelected(tab, tablist);
    const inEl = target && document.getElementById(target);
    const outEl = document.querySelector('.fnav-section:not([hidden])');
    if (inEl) animateSwap(outEl, inEl);
  }

  tablist.addEventListener('keydown', (e) => {
    const current = document.activeElement;
    const idx = tabs.indexOf(current);
    if (idx === -1) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(idx + dir + tabs.length) % tabs.length];
      next.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      current.click();
    }
  });

  tablist.addEventListener('click', async (e) => {
    const a = e.target.closest('a.fnav-tab');
    if (!a) return;
    const target = a.dataset.fnavTarget;
    const hasPanel = target && document.getElementById(target);
    if (hasPanel) {
      e.preventDefault();
      history.replaceState({}, '', a.getAttribute('href'));
      activate(a);
    }
  });

  let initial = tabs.find(t => (location.hash && `#${t.dataset.fnavTarget}` === location.hash))
             || tabs.find(t => t.dataset.fnavTarget === 'home')
             || tabs[0];
  const panels = Array.from(document.querySelectorAll('.fnav-section'));
  if (panels.length) panels.forEach(p => p.hidden = p.id !== initial.dataset.fnavTarget);

  setSelected(initial, tablist);
  if (initial.dataset.fnavTarget) activate(initial);
}

document.addEventListener('DOMContentLoaded', initTablist);


