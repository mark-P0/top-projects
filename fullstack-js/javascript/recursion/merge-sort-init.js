console.log("Hello, world!");

function mergeSort(array) {
  /* Validations */
  /* prettier-ignore */
  // if (
  //     !Array.isArray(array) ||
  //     array.length <= 0 ||
  //     false
  // ) return []

  /* Base case */
  if (array.length === 1) return array;

  /* Recursion */

  // Divide array
  let left = array.slice(0, Math.trunc(array.length / 2));
  let right = array.slice(Math.trunc(array.length / 2));
  // console.log({ left, right });
  // left;
  // right;

  // Sort halves
  left = mergeSort(left);
  right = mergeSort(right);

  const arrayCp = array.slice();

  for (let idx = 0; idx < array.length; idx++) {
    console.log({ array, left, right });

    if (left.length === 0) {
      array[idx] = right.shift();
      continue;
    }
    if (right.length === 0) {
      array[idx] = left.shift();
      continue;
    }

    const leftE = left[0];
    const rightE = right[0];

    console.log({ /* array, */ left, right, leftE, rightE });

    if (leftE < rightE) {
      array[idx] = left.shift();
    } else {
      array[idx] = right.shift();
    }
  }
  console.log({ array, arrayCp, left, right });

  return array;
}

const arr = [5, 6, 3];
// const arr = [6, 3];
console.log(arr);
console.log(arr.slice(0, Math.trunc(arr.length / 2)));
console.log(arr.slice(Math.trunc(arr.length / 2)));
console.log(Math.ceil(arr.length / 2) - 1);

/* prettier-ignore */
let _ = [
  mergeSort([5, 6, 3]),
  mergeSort([5, 2, 1, 3, 6, 4]),
]
_;
