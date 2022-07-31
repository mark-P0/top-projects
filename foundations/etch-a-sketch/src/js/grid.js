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

  const object = {
    element,
  };

  return object;
}

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
