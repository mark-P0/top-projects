import Utils from '../utils.js';
import GridProperties from './grid-properties.js';

////////////////
////////////////
////////////////

function increaseAlpha(alpha, percentIncrease = 10) {
  /*  Cell color transition goes from `neutral` to `color`,
   *  where `neutral` and `color` defaults to `white` and `black`
   *
   *  Controlling this process via alpha "inverts" the flow.
   *  The grid is colored `neutral`,
   *  each cell is colored with `color`,
   *  and the alpha of each cell going from 0 to 100
   *  simulates the `neutral` to `color` flow
   *
   *  Alpha was used so that `color` can be anything.
   */

  const percentDecimal = percentIncrease / 100;

  let alphaIncreased;
  alphaIncreased = alpha + percentDecimal;
  alphaIncreased = Math.min(alphaIncreased, 0.99); // Clamp at 0.99 because alpha of 1 turns `rgba` to `rgb`
  return alphaIncreased;
}

function getCellBaseRGBValues() {
  const { colorType } = GridProperties;
  const { getRandomInteger } = Utils;

  /*  RGB is True Color (24-bit)
      Each color field has 8 bits
      (2 ** 8) === 256 === 0xFF
   */
  const MAX_FIELD_VALUE = 0xff;
  const randomFieldValue = () =>
    getRandomInteger({
      lower: 0,
      upper: MAX_FIELD_VALUE,
    });

  let baseValues;
  if (colorType === 'normal') {
    baseValues = Array(3).fill(0);
  } else if (colorType === 'random') {
    baseValues = Array.from({ length: 3 }, randomFieldValue);
  } else {
    throw 'Color type unsupported! Please check.';
  }

  return baseValues;
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
  style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0)`;

  /* Add on-hover listener */
  const hoverCallback = () => {
    const rgbaValues = Utils.parseRGBString(style.backgroundColor);
    const alphaCurrent = rgbaValues[rgbaValues.length - 1];
    const alpha = increaseAlpha(alphaCurrent);
    style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
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

  const gridElement = GridProperties.element;
  gridElement.addEventListener('touchmove', callback, options);
}
addGridTouchListener();

////////////////
////////////////
////////////////

export default { createGridCell };
