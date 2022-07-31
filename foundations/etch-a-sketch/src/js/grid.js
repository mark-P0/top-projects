import utils from './utils.js';

const Grid = document.querySelector('#grid');

/*  */

function createGridCell(cellSize) {
  /*  Create a cell of size `cellSize` x `cellSize`
   */

  /* Create actual grid element */
  const element = document.createElement('div');
  element.classList.add('grid-cell');

  const cellSizePx = cellSize.toString() + 'px';
  element.style.width = cellSizePx;
  element.style.height = cellSizePx;

  /* Add on-hover listener */
  const hoverCallback = (event) => {
    element.style.backgroundColor = 'black';
  };
  element.addEventListener('mouseover', hoverCallback);
  element.customProps = { hoverCallback };

  /* Create grid cell as an object */
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
