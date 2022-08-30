class Node {
  #value;
  #nextNode;

  constructor(value = null, next = null) {
    this.#value = value;
    this.#nextNode = next;
  }

  get value() {
    return this.#value;
  }
  set value(newValue) {
    this.#value = newValue;
  }

  get nextNode() {
    return this.#nextNode;
  }
  set nextNode(node) {
    /* prettier-ignore */
    if (
      /*  `node` must be one of the following:
       *  • A `Node` instance
       *  • `null`
       */
      !(
        (node instanceof Node)
        || (node === null)
      )
    ) return;

    this.#nextNode = node;
  }
}

class LinkedList {
  #head;
  #tail;
  #size;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  append(value) {
    /*  1. `append(value)` adds a new node containing `value` to the end of the list
     */

    if (value instanceof Node) return;

    const node = new Node(value);

    if (this.#head === null) this.#head = node;
    if (this.#tail !== null) this.#tail.nextNode = node;
    this.#tail = node;
    this.#size++;
  }

  prepend(value) {
    /*  2. `prepend(value)` adds a new node containing `value` to the start of the list
     */

    if (value instanceof Node) return;

    const node = new Node(value);

    if (this.#tail === null) this.#tail = node;
    node.nextNode = this.#head;
    this.#head = node;
    this.#size++;
  }

  get size() {
    /*  3. `size` returns the total number of nodes in the list
     */
    return this.#size;
  }

  get head() {
    /*  4. `head` returns the first node in the list
     */
    return this.#head;
  }

  get tail() {
    /*  5. `tail` returns the last node in the list
     */
    return this.#tail;
  }

  at(index) {
    /*  6. `at(index)` returns the node at the given index
     */

    /* prettier-ignore */
    if (
      false
      || !Number.isInteger(index)
      || index < 0
      || this.#size - 1 < index
    ) return undefined;

    /* Straightforward approach; no conditionals */
    let node = this.#head;
    for (let _ = 0; _ < index; _++) node = node.nextNode;
    return node;

    /* Iterator approach */
    // for (const { idx, node } of this.#indexedIterator()) {
    //   if (index === idx) return node;
    // }
  }

  pop() {
    /*  7. `pop` removes the last element from the list
     */

    if (this.#size === 0) return null;
    if (this.#size === 1) {
      const toReturn = this.#tail; // Or `#head`; they're the same at this point

      this.#head = null;
      this.#tail = null;
      this.#size = 0;

      return toReturn;
    }

    let previous, current;
    for (const node of this) {
      previous = current; // Will be list[-2], i.e. second-to-last
      current = node; // Will be list[-1], i.e. last
    }

    this.#tail = previous;
    previous.nextNode = null;
    this.#size--;

    return current; // Unneeded? Instruction only says "removes"...
  }

  contains(value) {
    /*  8.  `contains(value)` returns `true` if the passed in `value` is in the list
     *      and otherwise returns false.
     */

    for (const node of this) {
      if (node.value === value) return true;
    }
    return false;
  }

  find(value) {
    /*  9.  `find(value)` returns the index of the node containing value,
     *      or `null` if not found.
     */

    for (const { idx, node } of this.#indexedIterator()) {
      if (node.value === value) return idx;
    }
    return null;
  }

  toString() {
    /*  10. `toString` represents your LinkedList objects as strings,
     *      so you can print them out and preview them in the console.
     *      The format should be: ( value ) -> ( value ) -> ( value ) -> null
     */

    const sep = ' -> ';

    /* String building approach */
    // let str = '';
    // for (const node of this) str += `( ${node.value} )${sep}`;
    // str += null;

    /* Array join approach */
    const str = [...Array.from(this, (n) => n.value), `${null}`].join(sep);

    return str;
  }

  insertAt(value, index) {
    /*  Extra 1.  `insertAt(value, index)` that inserts a new node with the
     *            provided `value` at the given `index`.
     */

    if (index === 0) return this.prepend(value);
    if (index === this.#size) return this.append(value);

    /* prettier-ignore */
    if (
      false
      || !Number.isInteger(index)
      || index < 0
      || this.#size - 1 < index
      || (value instanceof Node)
    ) return;

    const previous = this.at(index - 1);
    const current = previous.nextNode;
    const newNode = new Node(value);

    previous.nextNode = newNode;
    newNode.nextNode = current;
    this.#size++;
  }

  removeAt(index) {
    /*  Extra 2.  removeAt(index) that removes the node at the given `index`.
     */

    if (index === 0) {
      const current = this.#head;
      this.#head = this.#head.nextNode;
      current.nextNode = null;
      this.#size--;
      return;
    }
    if (index === this.#size - 1) {
      this.pop();
      return;
    }

    /* prettier-ignore */
    if (
      false
      || !Number.isInteger(index)
      || index < 0
      || this.#size - 1 < index
      || (value instanceof Node)
    ) return;

    const previous = this.at(index - 1);
    const current = previous.nextNode;

    previous.nextNode = current.nextNode;
    current.nextNode = null;
    this.#size--;
  }

  /* Iterators */

  *#indexedIterator() {
    /* prettier-ignore */
    for (
      let idx = 0,          previous = this.#tail, node = this.#head;
          idx < this.#size;
          idx ++,           previous = node,       node = node.nextNode
    ) yield {idx, node, previous}
  }

  *[Symbol.iterator]() {
    /*  Iterator Protocol
     *  Allow for-of syntax
     *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#user-defined_iterables
     */

    /* prettier-ignore */
    for (
      let idx = 0,          node = this.#head;
          idx < this.#size;
          idx ++,           node = node.nextNode
    ) yield node
  }
}

/* cspell:disable */
/* prettier-ignore */
QuokkaJS: {
  const list = new LinkedList();
  list

  list.append(0)
  list.prepend(1)
  list.append(2)
  list.append(3)
  list.prepend(4)
  list.append(5)
  list.append(6)
  list.prepend(7)
  // list.insertAt('Extra!!!', 0);         //list.removeAt(0);
  // list.insertAt('Extra!!!', list.size); //list.removeAt(list.size - 1);
  // list.insertAt('Extra!!!', 3);         //list.removeAt(3);
  // list.removeAt(3);
  // let  __ = list.pop()?.value; __
  // let ___ = list.at(0)?.value; ___

  let _ = [
    // list.size,
    // list.head?.value,
    // list.tail?.value,
    Array.from(list, (node) => node.value),
    list.contains(''),
    list.find(0),
    list.toString(),
  ]
  _
}
