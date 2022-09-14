import Utils from '../utils.js';
import GridProperties from './grid-properties.js';
import GridCell from './grid-cell.js';

const GridElement = GridProperties.element;

////////////////
////////////////
////////////////

function recreateGrid() {
  /*  Create a grid of size `gridSize` x `gridSize`
   */

  clearGrid(); // Ensure that grid is empty beforehand

  /*  `clientWidth` • `clientHeight` : Content dimensions
      `offsetWidth` • `offsetHeight` : Full element dimensions

      https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
   */
  const { clientWidth: gridWidth, clientHeight: gridHeight } = GridElement;
  const { size: gridSize } = GridProperties;

  /* Assert that the grid dimensions are the same, for a box-y size */
  if (gridWidth !== gridHeight) {
    throw `Grid dimensions do not match! width=${gridWidth} height=${gridHeight}`;
  }

  const cellSize = gridWidth / gridSize; // `gridWidth` <-> `gridHeight`

  for (let _ = 0; _ < gridSize ** 2; _++) {
    const cellElement = GridCell.createGridCell(cellSize);
    // cellElement.textContent = _;
    GridElement.appendChild(cellElement);
  }
}

function clearGrid() {
  /*  Clear grid by removing all of its child cells
   */

  const { removeAllChildren } = Utils;
  removeAllChildren(GridElement);
}

////////////////
////////////////
////////////////

function initGridCells() {
  /*  [Assignment] STEP 2
   *  Create a webpage with a 16x16 grid of square `div`s.
   *
   *  This function is run only once.
   */

  const { size } = GridProperties; // Size of 16 already initialized as custom prop
  if (size !== 16) throw 'Unexpected initial grid size.';
  recreateGrid();

  /* Initialize border styles for grid box and individual cells */
  GridProperties.applyBorderStyles();
}
initGridCells();

////////////////
////////////////
////////////////

export default { recreateGrid };
