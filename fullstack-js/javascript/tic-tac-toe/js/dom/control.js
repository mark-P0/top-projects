import { E, buildElementTree } from './__dom__.js';
import { GameEvents } from './__events__.js';

const ControlButton = (icon, label, eventTypeToDispatch) => {
  const classes = `btn btn-light fs-5 bi bi-${icon}`;
  const button = buildElementTree(
    E('button', { class: classes, 'aria-label': label }, null, null)
  );

  button.addEventListener('click', () => {
    document.dispatchEvent(new Event(eventTypeToDispatch));
  });

  return button;
};

const Control = {
  __element__: document.getElementById('control'),
  buttons: undefined, // Will be an array of `ControlButton`

  initialize() {
    this.buttons ??= [
      ['arrow-clockwise', 'Restart game', GameEvents.CONTROL_RESTART],
    ].map((args) => {
      const button = ControlButton(...args);
      this.__element__.appendChild(button);
      return button;
    });
  },
};

Control.initialize();
