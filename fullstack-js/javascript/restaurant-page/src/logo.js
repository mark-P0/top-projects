import { E } from './__dom__.js';
import Images from './images.js';

const Logo = (() => {
  const attributes = { class: 'px-3 logo' };

  const img = E('img', {
    attributes: { class: 'img-fluid', src: Images.LOGO },
  });
  const children = [img];

  return E('div', { attributes, children });
})();

export default Logo;
