import Utils from '../utils.js';
import { ColorTypes } from '../enums.js';
import GridProperties from './grid-properties.js';

////////////////
////////////////
////////////////

const RGBProvider = {
  /*  RGB is True Color (24-bit)
      Each color field has 8 bits
      (2 ** 8) === 256 === 0xFF
   */
  MAX_FIELD_VALUE: 0xff,
  randomFieldValue() {
    return Utils.getRandomInteger({
      lower: 0,
      upper: this.MAX_FIELD_VALUE,
    });
  },

  /* Single random color */
  getRandomRGB() {
    return Array.from({ length: 3 }, () => this.randomFieldValue());
  },
  singleColor: undefined, // Initialized after this object
  randomizeSingleColor() {
    this.singleColor = this.getRandomRGB();
    return this.singleColor;
  },

  get rgbValue() {
    const { colorType } = GridProperties;
    const { GRAYSCALE, RANDOM_SINGLE, RANDOM, USER } = ColorTypes;

    /* prettier-ignore */
    const rgbValueMap = {
      [GRAYSCALE]:     Array(3).fill(0),
      [RANDOM_SINGLE]: this.singleColor,
      [RANDOM]:        this.getRandomRGB(),
      [USER]:          this.singleColor,
    };
    const rgbValue = rgbValueMap[colorType];

    return rgbValue;
  },
  getRGB() {
    return this.rgbValue;
  },
};

/* Initialize single random color */
RGBProvider.singleColor = RGBProvider.getRandomRGB();
// RGBProvider.randomizeSingleColor();
// console.log(RGBProvider.singleColor);

////////////////
////////////////
////////////////

export default RGBProvider;
