import { GameEvents } from './__events__.js';

const main = {
  __element__: document.querySelector('#main'),
};

document.addEventListener(GameEvents.TURN_AI, () => {
  main.__element__.classList.add('loading');
});
document.addEventListener(GameEvents.TURN_PROVIDER, () => {
  main.__element__.classList.remove('loading');
});
