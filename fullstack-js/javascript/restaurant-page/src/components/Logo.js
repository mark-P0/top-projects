import { E } from 'src/__dom__.js';
import images from 'res/images.js';

const Logo = (() => {
  const attributes = { class: 'px-3 logo' };

  const img = E('img', {
    attributes: { class: 'img-fluid', src: images.LOGO },
  });
  const children = [img];

  return E('div', { attributes, children });
})();

export default Logo;
