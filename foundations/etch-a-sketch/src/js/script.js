import grid from './grid.js';

/*  */

function getNewGridSize(min = 1, max = 100) {
  const promptMsg = [
    `Enter new grid size between ${min} and ${max}:`,
    '(e.g. "16" for a 16x16 grid)',
  ].join('\n');

  let input = undefined;
  while (true) {
    /* prettier-ignore */
    if (
      /* `input` must be an integer */
      Number.isInteger(input) &&
      /* Between (including) `min` and `max` */
      ( min <= input && input <= max )
    ) break

    input = prompt(promptMsg);
    input = Number.parseInt(input);
  }

  return input;
}

/*  */

function addResizeListener() {
  const resizeButton = document.querySelector('#resize');

  const callback = () => {
    const newSize = getNewGridSize();
    grid.createGrid(newSize);
  };

  resizeButton.addEventListener('click', callback);
}
addResizeListener();
