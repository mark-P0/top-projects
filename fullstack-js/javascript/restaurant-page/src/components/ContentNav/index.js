/*
 *  <nav class="btn-group gap-4 font-regular" role="group" aria-label="Content navigation" id="content-nav" data-nav>
 *    <input type="radio" class="btn-check" name="content-nav" id="home-nav" autocomplete="off" checked />
 *    <label class="btn fs-5" for="home-nav" data-text="Home">Home</label>
 *
 *    <input type="radio" class="btn-check" name="content-nav" id="menu-nav" autocomplete="off" />
 *    <label class="btn fs-5" for="menu-nav" data-text="Menu">Menu</label>
 *
 *    <input type="radio" class="btn-check" name="content-nav" id="contact-nav" autocomplete="off" />
 *    <label class="btn fs-5" for="contact-nav" data-text="Contact">Contact</label>
 *  </nav>
 */

import './styles.css';
import { E, buildElementTree } from 'src/__dom__.js';

const NavButtonLink = (text, id, groupName, isDefault = false) => {
  const input = (() => {
    const attributes = {
      id,
      class: 'btn-check',
      type: 'radio',
      name: groupName,
      autocomplete: 'off',
    };
    if (isDefault) attributes.checked = true;

    return E('input', { attributes });
  })();

  const label = (() => {
    const attributes = {
      class: 'btn fs-5',
      for: id,
      'data-text': text,
    };
    const content = text;

    return E('label', { attributes, content });
  })();

  return [input, label];
};

const ContentNav = (data) => {
  const attributes = {
    id: 'content-nav',
    class: 'btn-group gap-4 font-regular',
    role: 'group',
    'aria-label': 'Content navigation',

    /*  Initialize `nav` data for later use. Really unnecessary;
     *  only denotes that there will be a value here in the future.
     */
    'data-nav': '',
  };

  const childArgs = data.map(({ text, id }, idx) => {
    const args = [text, id, attributes.id];
    if (idx === 0) args.push(true);
    return args;
  });
  const children = childArgs.map((args) => NavButtonLink(...args)).flat();

  const element = buildElementTree(E('nav', { attributes, children }));
  element.addEventListener('click', ({ target }) => {
    if (!target.classList.contains('btn-check')) return;
    element.dataset.nav = target.id;
  });

  /* Initial content shown dependent on which nav button is checked */
  element
    .querySelector('[checked]')
    .dispatchEvent(new Event('click', { bubbles: true }));

  return element;
};

export default ContentNav;
