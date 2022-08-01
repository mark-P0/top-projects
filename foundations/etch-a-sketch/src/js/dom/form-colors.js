import Utils from '../utils.js';
import { ColorTypes } from '../enums.js';
import GridProperties from './grid-properties.js';
import RGBGenerator from './rgb-generator.js';

const GridElement = GridProperties.element;

////////////////
////////////////
////////////////

const toggleCharacteristics = [
  {
    selector: '#color-grayscale',
    colorType: ColorTypes.GRAYSCALE,
  },
  {
    selector: '#color-random-single',
    colorType: ColorTypes.RANDOM_SINGLE,
  },
  {
    selector: '#color-random',
    colorType: ColorTypes.RANDOM,
  },
];

function addToggleListener(selector, colorType) {
  const toggleElement = document.querySelector(selector);

  let eventType = 'click';
  if (colorType === ColorTypes.GRAYSCALE) {
    eventType = 'change';
  }

  const callback = () => {
    GridProperties.colorType = colorType;

    if (colorType === ColorTypes.RANDOM_SINGLE) {
      RGBGenerator.randomizeSingleRandomColor();
    }

    /* Iterate through each cell */
    for (const cell of GridElement.children) {
      /* Get current alpha value of a cell */
      const currentRGBAString = cell.style.backgroundColor;
      const currentRGBA = Utils.parseRGBString(currentRGBAString);
      const alpha = currentRGBA[currentRGBA.length - 1];

      /* Apply new color to a cell */
      const baseValues = RGBGenerator.getRGB();
      const [r, g, b] = baseValues;
      cell.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  };

  toggleElement.addEventListener(eventType, callback);
}

for (const toggleChar of toggleCharacteristics) {
  const { selector, colorType } = toggleChar;
  addToggleListener(selector, colorType);
}
