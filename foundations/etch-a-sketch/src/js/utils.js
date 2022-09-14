function getRandomFloat({
  lower = 0,
  upper = 10,
  isUpperInclusive = false,
} = {}) {
  /*  Get a random "decimal" from `lower` up to `upper`
   *  Normally `upper`-exclusive, but can be changed with `isUpperInclusive` flag
   *
   *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   */

  const range = upper - lower;
  if (isUpperInclusive) range++;

  const result = Math.random() * range + lower;

  return result;
}

function getRandomInteger({
  lower = 0,
  upper = 10,
  isUpperInclusive = false,
} = {}) {
  /*  Get a random integer from `lower` up to `upper`
   *  Essentially the same as `getRandomFloat()`, but removes the "decimal" parts
   *
   *  `Math.floor()` or `Math.trunc()`?
   */

  const resultFloat = getRandomFloat({ lower, upper, isUpperInclusive });
  const result = Math.floor(resultFloat);

  return result;
}

function getRandomElement(array) {
  /*  Get a random member of `array`
   *
   *  Raise error when `array` is empty?
   */

  const elementIdx = getRandomInteger({ lower: 0, upper: array.length });
  const element = array[elementIdx];

  return element;
}

function removeAllChildren(parent) {
  /*  Removes all child nodes of the `parent` element
   *
   *  Several solutions here:
   *  https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
   */

  /*  Removes all children and replaces them with given argument array of elements
      Empty argument means children will be replaced by nothing
      Only removal step is performed, effectively clearing all children
   */
  parent.replaceChildren();
}

function* zip(...iterables) {
  /* TODO: Check if all are iterables */
  // ...

  /* Get minimum length of iterables */
  const iterablesLengths = iterables.map(({ length }) => length);
  const length = Math.min(...iterablesLengths);

  /* Get common-index values of iterables */
  for (let idx = 0; idx < length; idx++) {
    yield iterables.map((iterable) => iterable[idx]);
  }
}

function getCSSRule(sheetName, selector) {
  let stylesheet;
  for (const sheet of document.styleSheets) {
    if (sheet.href.endsWith(sheetName)) {
      stylesheet = sheet;
      break;
    }
  }

  const { rules } = stylesheet;

  let cssRule;
  for (const rule of rules) {
    if (rule.selectorText === selector) {
      cssRule = rule;
      break;
    }
  }

  return cssRule;
}

function parseRGBString(
  rgbString,
  pattern = /rgba\(\d*, \d*, \d*, 0?\.?\d*\)/g
) {
  /*  Parse RGB values from `rgbString`
   *  `rgbString` must be of `pattern` format
   *
   *  https://stackoverflow.com/questions/10970958/get-a-color-component-from-an-rgb-string-in-javascript
   */

  const regexMatches = rgbString.match(pattern);
  if (regexMatches === null) {
    throw `Error parsing RGBA values from: ${rgbString}`;
  }

  const digits = rgbString
    .slice(5, -1)
    .split(',')
    .map((digitStr) => Number.parseFloat(digitStr));

  return digits;
}

function convertHexToRGB(
  hex,
  asValues = false,
  pattern = /#([\da-f]{3}){1,2}/gi
) {
  /*  Convert `hex` string of format `#rrggbb` or `#rgb`
   *  to `rgb(r, g, b)`
   *
   *  https://stackoverflow.com/questions/35317643/regex-match-3-or-6-of-type
   *  https://css-tricks.com/converting-color-spaces-in-javascript/
   */

  const regexMatches = hex.match(pattern);
  if (regexMatches === null) {
    throw `Error parsing hex values from: ${hex}`;
  }

  let r, g, b;
  r = g = b = '0x';

  if (hex.length === 4) {
    r += hex[1].repeat(2);
    g += hex[2].repeat(2);
    b += hex[3].repeat(2);
  } else if (hex.length === 7) {
    r += hex.slice(1, 3);
    g += hex.slice(3, 5);
    b += hex.slice(5, 7);
  } else {
    throw `Error parsing hex values from: ${hex}`;
  }

  r = Number.parseInt(r);
  g = Number.parseInt(g);
  b = Number.parseInt(b);

  if (asValues) {
    return [r, g, b];
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
}

export default {
  getRandomInteger,
  removeAllChildren,
  getCSSRule,
  parseRGBString,
  convertHexToRGB,
};
