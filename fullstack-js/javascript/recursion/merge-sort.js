function mergeSort(array) {
  /*****************
   ** VALIDATIONS **
   *****************/
  /* prettier-ignore */
  if (
    false
    || !Array.isArray(array)  // Do not accept non-arrays
    || array.length <= 0      // Do not accept empty arrays (or negative-length arrays if at all possible...)
  ) return []

  /***************
   ** BASE CASE **
   ***************/
  /* A single-element array is considered sorted */
  if (array.length === 1) return array;

  /***************
   ** RECURSION **
   ***************/

  /* Divide array */
  const halfPoint = Math.trunc(array.length / 2);
  let left = array.slice(0, halfPoint); // Contain `halfPoint` elements from start
  let right = array.slice(halfPoint); // From `halfPoint` idx to the end

  /* Sort halves */
  left = mergeSort(left);
  right = mergeSort(right);

  /*  Merge sorted halves
   *  Will modify given array in-place
   */
  for (
    /* prettier-ignore */
    let idx      = 0,
        leftIdx  = 0,
        rightIdx = 0;
    idx < array.length;
    idx++
  ) {
    /*  Get the first elements of the halves
     *  If a half is empty (first element will be `undefined`),
     *  default to the highest JS integer (will ensure that the other is smaller)
     */
    const leftE = left[leftIdx] ?? Number.MAX_SAFE_INTEGER;
    const rightE = right[rightIdx] ?? Number.MAX_SAFE_INTEGER;

    /*  Place the smaller element on the array
     *  Post-increment half indices accordingly
     */
    if (leftE < rightE) {
      array[idx] = left[leftIdx++];
    } else {
      array[idx] = right[rightIdx++];
    }
  }

  return array;
}

function timer(func, arg) {
  const start = performance.now();
  const result = func(arg);
  const elapsed = performance.now() - start;
  return { result, elapsed };
}

/* prettier-ignore */
QuokkaJS: {
  const arr = [
    5, 6, 3
    // 6, 3
  ]
  console.log(arr);
  console.log(arr.slice(0, Math.trunc(arr.length / 2)));
  console.log(arr.slice(   Math.trunc(arr.length / 2)));
  console.log(Math.ceil(arr.length / 2) - 1);

  console.log(timer(mergeSort,                [5, 6, 3]));
  console.log(timer(mergeSort,       [5, 2, 1, 3, 6, 4]));
  console.log(timer(mergeSort, [3, 5, 6, 8, 1, 2, 4, 7]));
  console.log(timer(mergeSort, [6, 3, 8, 5, 2, 7, 4, 1]));
}
