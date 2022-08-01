import Utils from '../utils.js';
import { ColorTypes } from '../enums.js';
import GridProperties from './grid-properties.js';

////////////////
////////////////
////////////////

const RGBGenerator = {
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

  /* Generator API */
  *generatorAPI() {
    /* Call `.getRGB()` to yield a next value */

    while (true) {
      const { colorType } = GridProperties;
      const { GRAYSCALE, RANDOM_SINGLE, RANDOM, USER } = ColorTypes;

      if (colorType === GRAYSCALE) {
        yield Array(3).fill(0);
      } else if (colorType === RANDOM_SINGLE) {
        yield this.singleColor;
      } else if (colorType === RANDOM) {
        yield this.getRandomRGB();
      } else if (colorType === USER) {
        yield this.singleColor;
      }
    }
  },
  generator: undefined, // Will be initialized below to the generator API
  getRGB() {
    return this.generator.next().value;
  },
};

/* Initialize single random color */
RGBGenerator.singleColor = RGBGenerator.getRandomRGB();
// console.log(RGBGenerator.singleColor);

/* Initialize generator API */
RGBGenerator.generator = RGBGenerator.generatorAPI();
// console.log(RGBGenerator.getRGB());

////////////////
////////////////
////////////////

export default RGBGenerator;
