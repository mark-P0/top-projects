import GridProperties from './grid-properties.js';

////////////////
////////////////
////////////////

function addToggleListener() {
  const toggleButton = document.querySelector('#toggle');

  const callback = () => {
    const borderStyleSettings = Object.values(GridProperties.borderStyles);
    for (const setting of borderStyleSettings) {
      setting.isEnabled = !setting.isEnabled;
    }

    GridProperties.applyBorderStyles();
  };

  toggleButton.addEventListener('click', callback);
}
addToggleListener();
