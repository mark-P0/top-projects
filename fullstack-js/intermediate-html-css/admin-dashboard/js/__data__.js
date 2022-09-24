/* cspell:disable */

const Project = (title, description) => ({ title, description });
const UserData = {
  name: 'Morgan Oakley',
  handle: '@morgan',
  greeting: 'Hi there,',

  projects: [
    Project(
      'Super Cool Project',
      'Sed tempus ut lacus ut scelerisque. Suspendisse sollicitudin nibh erat, id facilisis felis accumsan nec.'
    ),
    Project(
      'Less Cool Project',
      'Nullam condimentum ipsum ut lectus vehicula consectetur. Quisque sed dolor tincidunt, consectetur sapient et, facilisis dolor. Duis sem purus, dignissim ut sapien in, varius pellentesque lacus.'
    ),
    Project(
      'Impossible App',
      'In hac habitasse platea doctumst. Vivamus dictum rutrum arcu, a placerat velit sagittis id.'
    ),
    Project(
      'Easy Peasy App',
      'Etiam cursus eros ac efficitur fringilla. Vestibulumdignissim urna eget accumsan aliquam. Curabitur dignissim nisi in tortor commodo, ac bibendum magna tincidunt.'
    ),
    Project(
      'Ad Blocker',
      'Quisque eget rutrum nisl. Nam augue justo, cursus vitae metus vel, pharetra henderit felis. Aliquam sed malesuada eros.'
    ),
    Project(
      'Money Maker',
      'Praesent convallis, libero quis congue elementum, nunc ante faucibus sapien, ac scelerisque tortor purus sit amet ex. Pelientesque mollis nec sem vel aliquam.'
    ),
  ],
};

const Announcement = (title, description) => ({ title, description });
const AnnouncementData = [
  Announcement(
    'Site Maintenance',
    'Vestibulum condimentum tellus lacus, in accumsan elit maximus ac.Donec henderit sodales congue more text after this should betruncated'
  ),
  Announcement(
    'Community Share Day',
    'Nam vel lectus tincidunt, rutrum nulla eu, ornare libero. Aliquamdictum accumsan porttitor more text after this should be truncated'
  ),
  Announcement(
    'Updated Privacy Policy',
    'Phasellus efficitur nisi eget elit consectetur, eget condimentum ante auctor. Cras fringilla sagittis sem in mattis more text after this should be truncated'
  ),
];

/* prettier-ignore */
const Trend = (project, author, image = null) => ({ project, author, image });
/* prettier-ignore */
const TrendData = [
  Trend('World Peace Builder', '@tegan'  ),
  Trend('Super Cool Project',  '@morgan' ),
  Trend('Life Changing App',   '@kendall'),
  Trend('No Traffic Maker',    '@alex'   ),
];

export { UserData, AnnouncementData, TrendData };
