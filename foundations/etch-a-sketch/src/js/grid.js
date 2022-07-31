import utils from './utils.js';

const Grid = document.querySelector('#grid');
Grid.customProps = {
  /* TODO: Transform to enums? */
  colorType: 'normal',
  // colorType: 'random',
};

/*  */

function parseRGBString(rgbString, pattern = /rgb\(\d*, \d*, \d*\)/g) {
  /*  Parse RGB values from `rgbString`
   *  `rgbString` must be of `pattern` format
   *
   *  https://stackoverflow.com/questions/10970958/get-a-color-component-from-an-rgb-string-in-javascript
   */

  const regexMatches = rgbString.match(pattern);
  if (regexMatches === null) {
    throw `Error parsing RGB values from: ${rgbString}`;
  }

  const nonValues = /[^\d,]/g;
  const digits = rgbString
    .replace(nonValues, '')
    .split(',')
    .map((digitStr) => Number.parseInt(digitStr));

  return digits;
}

function darkenRGB(rgbValues, baseValues, percentReduction = 10) {
  const { zip } = utils;

  const percent = percentReduction / 100;
  const darkened = Array.from(zip(rgbValues, baseValues)).map((pair) => {
    let [current, base] = pair;
    current -= base * percent; // Reduce by % of `base`
    current = Math.trunc(current); // Drop decimal part
    current = Math.max(current, 0); // Clamp to 0
    return current;
  });

  return darkened;
}

function getCellBaseRGBValues() {
  const { colorType } = Grid.customProps;

  if (colorType === 'normal') return [255, 255, 255];

  /* TODO: Add random color logic */
}

function createGridCell(cellSize) {
  /*  Create a cell of size `cellSize` x `cellSize`
   */

  /* Create actual cell element */
  const element = document.createElement('div');
  element.classList.add('grid-cell');

  /* Initialize cell dimensions */
  const { style } = element;
  const cellSizePx = cellSize.toString() + 'px';
  style.width = cellSizePx;
  style.height = cellSizePx;

  /* Initialize cell color */
  const baseValues = getCellBaseRGBValues();
  const [r, g, b] = baseValues;
  style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

  /* Add on-hover listener */
  const hoverCallback = () => {
    const rgbSource = parseRGBString(style.backgroundColor);
    const rgbReduced = darkenRGB(rgbSource, baseValues);
    const [r, g, b] = rgbReduced;
    style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // console.log({ rgbSource, rgbReduced });
    // console.log(rgbReduced);
  };
  element.addEventListener('mouseover', hoverCallback);
  element.customProps = { hoverCallback };

  /* Create grid cell as an object */
  /* TODO: Return bare `element`? */
  const object = {
    element,
  };

  return object;
}

function addGridTouchListener() {
  /*  Simulate on-hover effect on touchscreen
   *  Elements cannot track touches on themselves;
   *  thus, the grid must listen to touches within itself,
   *  locate what element is "below" these touch,
   *  access them and perform actions accordingly.
   *
   *  If the touch began outside the grid, this will not be fired.
   *
   *  Massive credits to this gist: https://gist.github.com/VehpuS/6fd5dca2ea8cd0eb0471
   *  Though I also had a similar idea in mind
   *  Apparently, a much simpler way does not natively exist (apart from jQuery maybe?)
   */

  const callback = (event) => {
    /* Get touch representation and its coordinates */
    const touch = event.touches[0];
    const { clientX: x, clientY: y } = touch;

    /* Attempt to locate grid cell "touched" */
    const cell = document.elementFromPoint(x, y);

    /*  Each grid cell should have a custom object property that contains the callbacks needed
        Optional chaining short-circuits this callback when the captured element is non-existent,
        e.g. out-of-bounds touch in devtools
     */
    if (!cell?.hasOwnProperty('customProps')) return;

    /* Call the on-hover callback of the cell */
    const { hoverCallback } = cell.customProps;
    hoverCallback();
  };

  /*  Address Chrome violation regarding scroll-blocking `'touchmove'` event
      https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
      https://chromestatus.com/feature/5745543795965952
   */
  const options = {
    passive: true,
  };

  Grid.addEventListener('touchmove', callback, options);
}
addGridTouchListener();

/*  */

function createGrid(gridSize) {
  /*  Create a grid of size `gridSize` x `gridSize`
   */

  clearGrid(); // Ensure that grid is empty beforehand

  /*  `clientWidth` • `clientHeight` : Content dimensions
      `offsetWidth` • `offsetHeight` : Full element dimensions

      https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
   */
  const { clientWidth: gridWidth, clientHeight: gridHeight } = Grid;

  /* Assert that the grid dimensions are the same, for a box-y size */
  if (gridWidth !== gridHeight) {
    throw `Grid dimensions do not match! width=${gridWidth} height=${gridHeight}`;
  }

  const cellSize = gridWidth / gridSize; // `gridWidth` <-> `gridHeight`
  console.log({ gridWidth, gridHeight, cellSize });

  for (let _ = 0; _ < gridSize ** 2; _++) {
    const newCellObj = createGridCell(cellSize);
    const { element } = newCellObj;

    // element.textContent = _;

    Grid.appendChild(element);
  }
}

function clearGrid() {
  /*  Clear grid by removing all of its child cells
   */

  const { removeAllChildren } = utils;
  removeAllChildren(Grid);
}

/*  */

function initGridCells() {
  /*  [Assignment] STEP 2
   *  Create a webpage with a 16x16 grid of square `div`s.
   */

  createGrid(16);
}

initGridCells();
