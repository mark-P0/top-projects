/**
 * https://stackoverflow.com/a/9436948/
 * @type {(str: string) => boolean}
 */
export function isString(str) {
  return typeof str === 'string' || str instanceof String;
}
