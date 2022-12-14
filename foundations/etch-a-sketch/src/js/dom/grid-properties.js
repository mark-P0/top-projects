import Utils from '../utils.js';
import { ColorTypes } from '../enums.js';

////////////////
////////////////
////////////////

const properties = {
  /* DOM element */
  element: document.querySelector('#grid'),

  /*  `#grid` has `size` by `size` cells
      Initialized to 16x16 grid as per given specification
   */
  size: 16,

  /* `border` styles */
  borderStyles: {
    box: {
      selector: '#grid',
      borderStyle: '1px solid silver',
      isEnabled: false,
    },
    cell: {
      selector: '.grid-cell',
      borderStyle: '1px solid gainsboro',
      isEnabled: true,
    },
  },
  applyBorderStyles() {
    const borderStylesEntries = Object.entries(this.borderStyles);

    for (const [key, value] of borderStylesEntries) {
      const { selector, borderStyle, isEnabled } = value;
      const cssRule = Utils.getCSSRule('styles.css', selector);
      cssRule.style['border'] = isEnabled ? borderStyle : null;
    }
  },

  /* Color types */
  colorType: (() => {
    const grayscaleRadio = document.querySelector('#color-grayscale');
    grayscaleRadio.checked = true; // Tick grayscale radio button programatically

    return ColorTypes.GRAYSCALE; // Default to grayscale cell colors
  })(),
};

////////////////
////////////////
////////////////

export default properties;
