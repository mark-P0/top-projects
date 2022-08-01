import Grid from './grid.js';

////////////////
////////////////
////////////////

function addResetListener() {
  const resetButton = document.querySelector('#reset');

  const callback = () => {
    Grid.recreateGrid();
  };

  resetButton.addEventListener('click', callback);
}
addResetListener();
