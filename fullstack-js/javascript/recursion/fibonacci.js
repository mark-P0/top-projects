function fibs(n) {
  /*  Using iteration, write a function fibs which takes a number and
   *  returns an array containing that many numbers from the fibonacci
   *  sequence. Using an example input of 8, this method should return
   *  the array [0, 1, 1, 2, 3, 5, 8, 13].
   */

  /* prettier-ignore */
  if (
    false
    || !Number.isInteger(n)
    || n <= 0
  ) return []

  const seq = [0, 1];
  if (n <= 2) return seq.slice(0, n);

  seq.length = n;
  for (let idx = 2; idx < n; idx++) {
    seq[idx] = seq[idx - 2] + seq[idx - 1];
  }

  return seq;
}

function fibsRec(n) {
  /*  Now write another method fibsRec which solves the same problem
   *  recursively. This can be done in just a couple of lines (or 1
   *  if you’re crazy, but don’t consider either of these lengths a
   *  requirement… just get it done).
   */

  /*****************
   ** VALIDATIONS **
   *****************/
  /* prettier-ignore */
  if (
    false
    || !Number.isInteger(n)
    || n <= 0
  ) return []

  /****************
   ** BASE CASES **
   ****************/
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  /***************
   ** RECURSION **
   ***************/
  const prevSeq = fibs(n - 1);
  const nthFib = prevSeq.at(-2) + prevSeq.at(-1);
  return [...prevSeq, nthFib];
}

function timer(func, arg) {
  const start = performance.now();
  const result = func(arg);
  const elapsed = performance.now() - start;
  return { result, elapsed };
}

/* prettier-ignore */
QuokkaJS: {
  console.log(timer(   fibs, ''));
  console.log(timer(   fibs, []));
  console.log(timer(   fibs, {}));
  console.log(timer(   fibs,  0));
  console.log(timer(   fibs,  1));
  console.log(timer(   fibs,  2));
  console.log(timer(   fibs,  3));
  console.log(timer(   fibs,  8));
  console.log(timer(   fibs, 77));
  console.log(timer(fibsRec, ''));
  console.log(timer(fibsRec, []));
  console.log(timer(fibsRec, {}));
  console.log(timer(fibsRec,  0));
  console.log(timer(fibsRec,  1));
  console.log(timer(fibsRec,  2));
  console.log(timer(fibsRec,  3));
  console.log(timer(fibsRec,  8));
  console.log(timer(fibsRec, 77));
}

let array = [0, 1];
console.log(array);
console.log(array.length);

array.length = 5;
console.log(array);
console.log(array.length);
