import { Element, ClassList, buildDOM } from './build-dom.js';
import { UserData, AnnouncementData, TrendData } from './__data__.js';

const ContentSection = (heading, contentClass, content) => {
  const nameAffix = heading.split(' ').at(-1).toLowerCase();
  const idSection = `content-${nameAffix}`;
  const idContentList = `${nameAffix}-list`;

  return Element('section', { id: idSection }, null, [
    Element('h4', null, heading, null),
    Element('div', { id: idContentList, class: contentClass }, null, content),
  ]);
};

const ProjectAction = (mdiSuffix) => {
  const cls = ClassList('mdi', `mdi-${mdiSuffix}`, 'icon-button', 'clickable');
  return Element('div', { class: cls }, null, null);
};
const Projects = ContentSection(
  'Your Projects',
  'masked-overflow',
  UserData.projects.map(({ title, description }) => {
    return Element('div', { class: 'card' }, null, [
      Element('div', null, null, [
        Element('h4', null, title, null),
        Element('p', { class: 'content-text-secondary' }, description, null),
      ]),
      Element('div', { class: 'project-actions' }, null, [
        ProjectAction('star-plus-outline'),
        ProjectAction('eye-plus-outline'),
        ProjectAction('source-fork'),
      ]),
    ]);
  })
);

function interleave(array, ...items) {
  return array.slice(1).reduce(
    (acml, elem) => {
      for (const item of items) acml.push(item);
      acml.push(elem);
      return acml;
    },
    [array[0]]
  );
}
const AnnouncementElements = AnnouncementData.map(({ title, description }) => {
  return Element('article', null, null, [
    Element('h6', null, title, null),
    Element('p', { class: 'content-text-secondary' }, description, null),
  ]);
});
const Announcements = ContentSection(
  'Announcements',
  'card',
  interleave(AnnouncementElements, Element('hr', null, null, null))
);

const Trending = ContentSection(
  'Trending',
  'card',
  TrendData.map(({ project, author }) => {
    return Element('div', { class: 'trending-project' }, null, [
      Element('div', { class: 'user-picture' }, null, null),
      Element('div', { class: 'project-info' }, null, [
        Element('div', null, author, null),
        Element('div', { class: 'content-text-secondary' }, project, null),
      ]),
    ]);
  })
);

const Content = Element(document.querySelector('#content'), null, null, [
  Projects,
  Announcements,
  Trending,
]);
buildDOM(Content);
