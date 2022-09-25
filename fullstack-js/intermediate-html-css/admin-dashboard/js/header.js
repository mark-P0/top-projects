import { Element, ClassList, buildDOM } from './build-dom.js';
import { UserData } from '../data.js';

const HeaderSection = (...children) => {
  return Element('div', { class: 'header-section' }, null, children);
};
const Search = HeaderSection(
  Element(
    'label',
    { for: 'header-search', class: ClassList('mdi', 'mdi-magnify') },
    null,
    null
  ),
  Element(
    'input',
    { type: 'search', name: 'searchQuery', id: 'header-search' },
    null,
    null
  )
);
const User = HeaderSection(
  Element(
    'span',
    {
      class: ClassList(
        'mdi',
        'mdi-bell-ring-outline',
        'icon-button',
        'clickable'
      ),
    },
    null,
    null
  ),
  Element('div', { class: 'user-picture' }, null, null),
  Element('div', { class: 'user-name' }, UserData.name, null)
);
const Greeting = HeaderSection(
  Element('div', { class: 'user-picture' }, null, null),
  Element('div', null, null, [
    Element('div', { class: 'user-greeting' }, UserData.greeting, null),
    Element(
      'div',
      { class: 'user-name' },
      `${UserData.name} (${UserData.handle})`,
      null
    ),
  ])
);
const Actions = HeaderSection(
  ...['New', 'Upload', 'Share'].map((text) => {
    return Element(
      'button',
      { type: 'button', class: 'clickable' },
      text,
      null
    );
  })
);

const Header = Element(document.querySelector('#header'), null, null, [
  Search,
  User,
  Greeting,
  Actions,
]);

buildDOM(Header);
