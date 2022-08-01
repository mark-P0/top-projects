import Utils from '../utils.js';
import { ColorTypes } from '../enums.js';
import GridProperties from './grid-properties.js';
import RGBGenerator from './rgb-generator.js';

const GridElement = GridProperties.element;

////////////////
////////////////
////////////////

function addPickerListener() {
  const pickerRadio = document.querySelector('#color-user');
  const pickerElement = document.querySelector('#color-user-picker');

  const callback = () => {
    /* Only run if the corresponding radio button is selected */
    if (!pickerRadio.checked) return;

    const pickerValue = pickerElement.value;

    /* Iterate through each cell */
    for (const cell of GridElement.children) {
      /* Get current alpha value of a cell */
      const currentRGBAString = cell.style.backgroundColor;
      const currentRGBA = Utils.parseRGBString(currentRGBAString);
      const alpha = currentRGBA[currentRGBA.length - 1];

      /* Apply new color to a cell */
      const baseValues = Utils.convertHexToRGB(pickerValue, true);
      const [r, g, b] = baseValues;
      cell.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  };

  pickerElement.addEventListener('change', callback);
}
addPickerListener();

function addPickerRadioListener() {
  const pickerRadio = document.querySelector('#color-user');
  const pickerElement = document.querySelector('#color-user-picker');

  const callback = () => {
    /*  Trigger a corresponding event on the picker element

        https://stackoverflow.com/questions/136617/how-do-i-programmatically-force-an-onchange-event-on-an-input
        https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
     */
    pickerElement.dispatchEvent(new Event('change'));
  };

  pickerRadio.addEventListener('change', callback);
}
addPickerRadioListener();

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
