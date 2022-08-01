import Utils from '../utils.js';
import { ColorTypes } from '../enums.js';
import GridProperties from './grid-properties.js';
import RGBGenerator from './rgb-generator.js';

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
  const baseValues = RGBGenerator.getRGB();
  const [r, g, b] = baseValues;
  style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0)`;

  /* Add on-hover listener */
  const hoverCallback = () => {
    /*  `style` is a reference to the cell's style,
        so this callback works even if `style` has been modified elsewhere
     */

    const rgbaValues = Utils.parseRGBString(style.backgroundColor);
    const [r, g, b, alphaCurrent] = rgbaValues;
    const alpha = increaseAlpha(alphaCurrent);
    style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  element.addEventListener('mouseover', hoverCallback);
  element.customProps = { hoverCallback };

  return element;
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
