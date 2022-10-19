import { E, buildElementTree } from './__dom__.js';
import { GameEvents } from './__events__.js';

const GrowingSpinner = buildElementTree(
  E('div', { class: 'spinner-grow', role: 'status' }, null, null)
);

const Loading = {
  __element__: document.getElementById('loading'),
  get __innerContainer__() {
    return this.__element__.firstElementChild;
  },

  show() {
    this.__innerContainer__.appendChild(GrowingSpinner);
    this.__element__.classList.remove('invisible');
  },
  hide() {
    this.__element__.classList.add('invisible');
    this.__innerContainer__.replaceChildren();
  },
};

document.addEventListener(GameEvents.TURN_AI, () => {
  Loading.show();
});
document.addEventListener(GameEvents.TURN_PROVIDER, () => {
  Loading.hide();
});
