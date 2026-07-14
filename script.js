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
