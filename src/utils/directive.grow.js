const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const grow = entry.isIntersecting ? 1 : 0;
    entry.target.style.setProperty('--grow', grow);
  });
});

export default {
  mounted(el) {
    el.classList.add('growable');
    observer.observe(el);
  },
};
