const contentNav = document.getElementById('content-nav');
contentNav.addEventListener('click', ({ target }) => {
  console.log(target);
  if (!target.classList.contains('btn-check')) return;
  contentNav.dataset.nav = target.id;
  console.log(target);
});
contentNav
  .querySelector('[checked]')
  .dispatchEvent(new Event('click', { bubbles: true }));
