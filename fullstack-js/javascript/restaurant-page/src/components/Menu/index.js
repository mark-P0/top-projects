import './styles.css';
import { E } from 'src/__dom__.js';
import Logo from 'src/components/Logo';
import images from 'res/images';

const CAROUSEL_INTERVAL_MS = 3000;
const CAROUSEL_ACTIVE_IDX = 1;
const CAROUSEL_DATA = [
  { label: 'Shawarma rice bowl selection', image: images.BOWL_MENU },
  { label: 'Shawarma pita doner selection', image: images.DONER_MENU },
  { label: 'Shawarma rice box selection', image: images.BOX_MENU },
];

const CarouselIndicatorButton = (label, idx, target) => {
  const attributes = {
    type: 'button',
    'data-bs-target': `#${target}`,
    'data-bs-slide-to': idx,
    'aria-label': label,
  };
  if (idx === CAROUSEL_ACTIVE_IDX) {
    attributes['class'] = 'active';
    attributes['aria-current'] = true;
  }

  return E('button', { attributes });
};
const CarouselIndicators = (carouselId) => {
  const attributes = { class: 'carousel-indicators' };
  const children = CAROUSEL_DATA.map(({ label }, idx) =>
    CarouselIndicatorButton(label, idx, carouselId)
  );

  return E('div', { attributes, children });
};

const CarouselItem = (image, idx) => {
  const attributes = {
    class: 'carousel-item',
    'data-bs-interval': CAROUSEL_INTERVAL_MS,
  };
  if (idx === CAROUSEL_ACTIVE_IDX) {
    attributes.class = `${attributes.class} active`;
  }

  const img = E('img', { attributes: { class: 'd-block w-100', src: image } });
  const children = [img];

  return E('div', { attributes, children });
};
const CarouselItems = (() => {
  const attributes = { class: 'carousel-inner' };
  const children = CAROUSEL_DATA.map(({ image }, idx) =>
    CarouselItem(image, idx)
  );

  return E('div', { attributes, children });
})();

const CarouselControl = (label, target) => {
  const code = label.slice(0, 4).toLowerCase();
  const cls = `carousel-control-${code}`;

  const attributes = {
    type: 'button',
    'data-bs-target': `#${target}`,
    class: cls,
    'data-bs-slide': code,
  };
  const children = [
    E('span', { attributes: { class: `${cls}-icon`, 'aria-hidden': true } }),
    E('span', { attributes: { class: 'visually-hidden' }, content: label }),
  ];

  return E('button', { attributes, children });
};

const Carousel = (() => {
  const attributes = {
    id: 'menu-carousel',
    class: 'carousel slide',
    'data-bs-ride': 'true',
  };
  const children = [
    CarouselIndicators(attributes.id),
    CarouselItems,
    CarouselControl('Previous', attributes.id),
    CarouselControl('Next', attributes.id),
  ];

  return E('div', { attributes, children });
})();

const __inner__ = (() => {
  const attributes = { class: 'content px-4 pb-4 flex-center' };
  const children = [Logo, Carousel];

  return E('div', { attributes, children });
})();
const Menu = (() => {
  const attributes = { class: 'd-none h-100', 'data-nav': 'menu-nav' };
  const children = [__inner__];

  return E('div', { attributes, children });
})();

export default Menu;
