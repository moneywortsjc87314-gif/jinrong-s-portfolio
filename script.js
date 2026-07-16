(() => {
  const tabList = document.querySelector('.search-tabs');
  if (!tabList) return;

  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
  let activeIndex = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
  let transitionToken = 0;

  tabList.dataset.activeIndex = String(activeIndex);

  const activate = (nextIndex, moveFocus = false) => {
    if (nextIndex === activeIndex || nextIndex < 0 || nextIndex >= tabs.length) {
      if (moveFocus && tabs[nextIndex]) tabs[nextIndex].focus({ preventScroll: true });
      return;
    }

    const token = ++transitionToken;
    const scrollY = window.scrollY;
    const direction = nextIndex > activeIndex ? 1 : -1;
    const previousTab = tabs[activeIndex];
    const nextTab = tabs[nextIndex];
    const previousPanel = panels[activeIndex];
    const nextPanel = panels[nextIndex];

    panels.forEach((panel) => {
      panel.classList.remove('from-left', 'from-right', 'to-left', 'to-right');
      if (panel !== previousPanel && panel !== nextPanel) panel.classList.remove('is-active');
    });

    tabs.forEach((tab, index) => {
      const selected = index === nextIndex;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    tabList.dataset.activeIndex = String(nextIndex);

    previousPanel.classList.add(direction > 0 ? 'to-left' : 'to-right');
    previousPanel.setAttribute('aria-hidden', 'true');
    previousPanel.inert = true;

    nextPanel.classList.remove('is-active');
    nextPanel.classList.add(direction > 0 ? 'from-right' : 'from-left', 'is-active');
    nextPanel.removeAttribute('aria-hidden');
    nextPanel.inert = false;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (token !== transitionToken) return;
        nextPanel.classList.remove('from-left', 'from-right');
        window.scrollTo({ top: scrollY, left: window.scrollX, behavior: 'instant' });
      });
    });

    window.setTimeout(() => {
      if (token !== transitionToken) return;
      previousPanel.classList.remove('is-active', 'to-left', 'to-right');
    }, 340);

    activeIndex = nextIndex;
    if (moveFocus) nextTab.focus({ preventScroll: true });
    previousTab.blur();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = null;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      activate(nextIndex, true);
    });
  });
})();

(() => {
  const track = document.querySelector('.content06-track');
  const stage = track?.querySelector('.content06');
  if (!track || !stage) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const easeOutCubic = (value) => 1 - Math.pow(1 - clamp(value), 3);

  const render = () => {
    frame = 0;
    if (reducedMotion.matches) {
      stage.style.setProperty('--card-01-progress', '1');
      stage.style.setProperty('--card-02-progress', '1');
      return;
    }

    const rect = track.getBoundingClientRect();
    const runway = Math.max(1, track.offsetHeight - stage.offsetHeight);
    const progress = clamp(-rect.top / runway);
    const card02 = easeOutCubic(progress / 0.35);
    const card01 = easeOutCubic((progress - 0.35) / 0.35);

    stage.style.setProperty('--card-02-progress', card02.toFixed(4));
    stage.style.setProperty('--card-01-progress', card01.toFixed(4));
  };

  const requestRender = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) requestRender();
  }, { rootMargin: '100% 0px' });

  observer.observe(track);
  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', requestRender, { passive: true });
  reducedMotion.addEventListener('change', requestRender);
  render();
})();

(() => {
  const carousel = document.querySelector('.right-case-carousel');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-case-slide]')];
  const dots = [...carousel.querySelectorAll('[data-case-dot]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let timer = 0;
  let isVisible = true;

  const show = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const active = index === activeIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, index) => {
      const active = index === activeIndex;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = 0;
  };

  const start = () => {
    stop();
    if (!isVisible || reducedMotion.matches) return;
    timer = window.setInterval(() => show(activeIndex + 1), 3000);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      show(index);
      start();
    });
  });

  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible) start();
    else stop();
  }, { threshold: 0.15 });

  observer.observe(carousel);
  reducedMotion.addEventListener('change', start);
  show(0);
  start();
})();
