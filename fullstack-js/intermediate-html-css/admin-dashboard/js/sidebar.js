import { Element, ClassList, buildDOM } from './build-dom.js';

const SidebarItem = (text, mdiSuffix) => {
  return Element('div', { class: 'sidebar-item' }, null, [
    Element(
      'span',
      { class: ClassList(`mdi`, `mdi-${mdiSuffix}`) },
      null,
      null
    ),
    Element('span', null, text, null),
  ]);
};

const SidebarSection = (...items) => {
  return Element('div', { class: 'sidebar-section' }, null, items);
};

const Sidebar = Element(document.querySelector('#sidebar'), null, null, [
  SidebarSection(SidebarItem('Dashboard', 'view-dashboard')),
  SidebarSection(
    SidebarItem('Home', 'home'),
    SidebarItem('Profile', 'card-account-details-outline'),
    SidebarItem('Messages', 'message-reply'),
    SidebarItem('History', 'clock-time-three'),
    SidebarItem('Tasks', 'file-multiple'),
    SidebarItem('Communities', 'account-group')
  ),
  SidebarSection(
    SidebarItem('Settings', 'cog'),
    SidebarItem('Support', 'help-box'),
    SidebarItem('Privacy', 'shield-check')
  ),
]);

buildDOM(Sidebar);
