const contentNav = document.getElementById('content-nav');
contentNav.addEventListener('click', ({ target }) => {
  if (!target.classList.contains('btn-check')) return;
  contentNav.dataset.nav = target.id;
});
contentNav
  .querySelector('[checked]')
  .dispatchEvent(new Event('click', { bubbles: true }));
