/*
 *  <div
 *    class="vh-100 bg-primary d-flex justify-content-center pt-4 overflow-hidden"
 *    id="main"
 *  >
 *    <div class="flex-center flex-column">
 */

import './styles.css';
import { E, buildElementTree } from '../__dom__.js';
import ContentNav from '../content-nav';
import Home from '../home';

const navData = ['Home', 'Menu', 'Contact'].map((text) => ({
  text,
  id: `${text.toLowerCase()}-nav`,
}));

const __inner__ = (() => {
  const attributes = { class: 'flex-center flex-column' };

  const dummyContent = navData.slice(1).map(({ id }) => {
    const attributes = {
      class: 'd-none h-100',
      'data-nav': id,
    };
    return E('div', { attributes, content: id });
  });
  /* prettier-ignore */
  const children = [
    E(ContentNav(navData)),
    Home,
    ...dummyContent,
  ];

  return E('div', { attributes, children });
})();

const Main = (() => {
  const attributes = {
    id: 'main',
    class:
      'vh-100 bg-primary d-flex justify-content-center pt-4 overflow-hidden',
  };
  const children = [__inner__];

  return E('div', { attributes, children });
})();

export default buildElementTree(Main);
