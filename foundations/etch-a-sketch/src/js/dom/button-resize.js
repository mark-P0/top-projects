import Grid from './grid.js';
import GridProperties from './grid-properties.js';

////////////////
////////////////
////////////////

function getNewGridSize(min = 1, max = 100) {
  const promptMsg = [
    `Enter new grid size between ${min} and ${max}:`,
    '(e.g. "16" for a 16x16 grid)',
  ].join('\n');

  let input = undefined;
  while (true) {
    /* prettier-ignore */
    if (
      Number.isInteger(input) &&       // `input` must be an integer
      ( min <= input && input <= max ) // Between (including) `min` and `max`
    ) break

    input = prompt(promptMsg);

    /*  `prompt()` can only return strings or `null`
        https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt
     */
    if (input === null) return null;

    input = Number.parseInt(input);
  }

  return input;
}

////////////////
////////////////
////////////////

function addResizeListener() {
  const resizeButton = document.querySelector('#resize');

  const callback = () => {
    const newSize = getNewGridSize();

    if (newSize === null) return;

    GridProperties.size = newSize;
    Grid.recreateGrid();
  };

  resizeButton.addEventListener('click', callback);
}
addResizeListener();
