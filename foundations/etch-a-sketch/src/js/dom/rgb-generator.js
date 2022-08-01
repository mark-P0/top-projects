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
  singleRandomColor: undefined, // Initialized after this object
  randomizeSingleRandomColor() {
    this.singleRandomColor = this.getRandomRGB();
    return this.singleRandomColor;
  },

  /* Generator API */
  *generatorAPI() {
    /* Call `.getRGB()` to yield a next value */

    while (true) {
      const { colorType } = GridProperties;

      if (colorType === ColorTypes.GRAYSCALE) {
        yield Array(3).fill(0);
      } else if (colorType === ColorTypes.RANDOM_SINGLE) {
        yield this.singleRandomColor;
      } else if (colorType === ColorTypes.RANDOM) {
        yield this.getRandomRGB();
      }

      if (!(colorType === ColorTypes.RANDOM_SINGLE)) {
        this.randomizeSingleRandomColor();
      }
    }
  },
  generator: undefined, // Will be initialized below to the generator API
  getRGB() {
    return this.generator.next().value;
  },
};

/* Initialize single random color */
RGBGenerator.singleRandomColor = RGBGenerator.getRandomRGB();

/* Initialize generator API */
RGBGenerator.generator = RGBGenerator.generatorAPI();
// console.log(RGBGenerator.getRGB());

////////////////
////////////////
////////////////

export default RGBGenerator;
