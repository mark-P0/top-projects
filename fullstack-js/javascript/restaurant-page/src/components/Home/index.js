import './styles.css';
import { E } from 'src/__dom__.js';
import Logo from 'src/components/Logo';
import images from 'res/images.js';

const FoodEntry = (name, image) => {
  const attributes = { class: 'vstack gap-2 align-items-center food-entry' };

  const img = E('img', {
    attributes: { class: 'img-fluid food-icon', src: image },
  });
  const label = E('div', {
    attributes: { class: 'font-stylized' },
    content: name,
  });
  const children = [img, label];

  return E('div', { attributes, children });
};
const FoodEntries = (() => {
  const attributes = { class: 'flex-maximize text-center user-select-none' };
  const children = [
    FoodEntry('Bowl', images.BOWL_ICON),
    FoodEntry('Doner', images.DONER_ICON),
    FoodEntry('Box', images.BOX_ICON),
  ];

  return E('div', { attributes, children });
})();

const Footer = (() => {
  const attributes = { class: 'w-100 position-relative font-regular' };

  /* The following `div` acts like a background banner that spans the full page width */
  const banner = E('div', {
    attributes: {
      class:
        'position-absolute h-100 vw-100 bg-dark start-50 translate-middle-x',
    },
  });
  const text = (() => {
    const attributes = {
      class: 'position-absolute h-100 text-white flex-center text-center',
    };
    const content =
      '13th Shawarma is a small local food business established by a young couple aspiring to become entrepreneurs.';

    return E('p', { attributes, content });
  })();
  const children = [banner, text];

  return E('footer', { attributes, children });
})();

const __inner__ = (() => {
  const attributes = { class: 'content px-4 flex-maximize' };

  /* prettier-ignore */
  const children = [
    E('div', { attributes: { class: 'flex-center flex-column' }, children: [
      Logo,
      FoodEntries,
    ]}),
    Footer,
  ];

  return E('div', { attributes, children });
})();
const Home = (() => {
  const attributes = {
    class: 'd-none h-100',
    'data-nav': 'home-nav',
  };
  const children = [__inner__];

  return E('div', { attributes, children });
})();

export default Home;
