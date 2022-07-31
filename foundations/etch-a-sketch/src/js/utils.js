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

export default { removeAllChildren, zip };
