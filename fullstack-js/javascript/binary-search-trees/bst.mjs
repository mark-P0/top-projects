import Utilities from './utils.mjs';

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    if (!Array.isArray(array)) throw `Provided ${array} is not an array`;

    /* Expensive; rewrite? */
    array = Array.from(new Set(array)).sort((a, b) => a - b);
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const midIdx = Math.trunc(array.length / 2);
    const mid = new Node(array[midIdx]);
    mid.left = this.buildTree(array.slice(0, midIdx));
    mid.right = this.buildTree(array.slice(midIdx + 1));

    return mid;
  }

  insert(value) {
    function __recurse(value, mid) {
      if (value === mid.data) return; // Discard duplicates

      if (value < mid.data) {
        // Left

        if (mid.left === null) {
          mid.left = new Node(value);
        } else {
          __recurse(value, mid.left);
        }
      } else {
        // Right

        if (mid.right === null) {
          mid.right = new Node(value);
        } else {
          __recurse(value, mid.right);
        }
      }
    }
    __recurse(value, this.root);
  }

  delete(value) {
    /* https://www.geeksforgeeks.org/binary-search-tree-set-2-delete/ */

    /*  Parent needed for Case 1
     *  Deleting of node requires [un]setting reference on its parent
     */
    const { node, parent } = this.#findWithParent(value);
    if (node === null) return; // Don't do anything if value is not found

    /* Case 1: No children */
    if (node.left === null && node.right === null) {
      if (node === this.root) return; // Don't do anything if 1-element tree (parent-less)

      if (parent.left === node) parent.left = null;
      else if (parent.right === node) parent.right = null;

      return;
    }

    /* Case 2: One child */
    if (node.left === null && node.right !== null) {
      node.data = node.right.data;
      node.right = null;
      return;
    } else if (node.left !== null && node.right === null) {
      node.data = node.left.data;
      node.left = null;
      return;
    }

    /*  Case 3: Two children
     *  Expensive! I'll be just following the instructions...
     *  - Get in-order sequence
     *  - Find in-order successor of node data
     *  - Delete in-order successor (Delete first so that it won't conflict with the ff. finding)
     *  - Set node data to in-order successor
     */
    const inOrderSequence = this.inOrder();
    const successorIdx =
      inOrderSequence.findIndex((num) => num == node.data) + 1;
    const successor = inOrderSequence[successorIdx];
    this.delete(successor);
    node.data = successor;
  }

  find(value) {
    /* Traversal side-effect */
    /* prettier-ignore */
    const traversal = (
      this.levelOrder
      // this.inOrder
      // this.preOrder
      // this.postOrder
    ).bind(this)

    let result = null;
    traversal((node) => {
      if (node.data === value) result = node;
    });
    return result;

    /* Binary search (Divide-and-conquer) */
    // function __recurse(value, node) {
    //   if (node.data === value) return node;
    //   if (node.left && node.data > value) return __recurse(value, node.left);
    //   if (node.right && node.data < value) return __recurse(value, node.right);
    //   return null;
    // }
    // return __recurse(value, this.root);
  }

  #findWithParent(value) {
    function __recurse(value, node, parent) {
      if (node.data === value) return { node, parent };
      if (node.left && node.data > value)
        return __recurse(value, node.left, node);
      if (node.right && node.data < value)
        return __recurse(value, node.right, node);
      return { node: null, parent: null };
    }
    return __recurse(value, this.root, null);
  }

  levelOrder(callback) {
    /* prettier-ignore */
    if (!(
      (typeof callback) === 'function' ||
      callback === undefined
    )) return

    const queue = [this.root];
    let idx = 0;

    while (idx < queue.length) {
      const node = queue[idx];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      /* "Provide node as argument to provided function" */
      if (callback !== undefined) callback(node);

      /* Mark nodes as visited by transforming them to their actual value */
      queue[idx] = node.data;
      idx++;
    }

    /* "The method should return an array of values if no function is given." */
    if (callback === undefined) return queue;
  }

  #dfs(node, type, callback, array) {
    if (node === null) return;

    if (type === 'pre') {
      if (callback === undefined) array.push(node.data);
      else callback(node);
    }

    this.#dfs(node.left, type, callback, array);

    if (type === 'in') {
      if (callback === undefined) array.push(node.data);
      else callback(node);
    }

    this.#dfs(node.right, type, callback, array);

    if (type === 'post') {
      if (callback === undefined) array.push(node.data);
      else callback(node);
    }
  }

  #dfsPrep(type, callback) {
    /* prettier-ignore */
    if (!(
      (typeof callback) === 'function' ||
      callback === undefined
    )) return

    if (callback === undefined) {
      const array = [];
      this.#dfs(this.root, type, undefined, array);
      return array;
    }

    return this.#dfs(this.root, type, callback, null);
  }

  inOrder(callback) {
    return this.#dfsPrep('in', callback);
  }

  preOrder(callback) {
    return this.#dfsPrep('pre', callback);
  }

  postOrder(callback) {
    return this.#dfsPrep('post', callback);
  }

  height(node) {
    /* From `node` to the lowest point */

    if (!node) return -1;

    function __recurse(current) {
      // if (current === null) return 0;
      if (current === null) return -1;

      const leftHeight = __recurse(current.left);
      const rightHeight = __recurse(current.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
    return __recurse(node);
  }

  depth(node) {
    /* From tree root to `node` */

    if (!node) return -1;

    function __recurse(current, toFind) {
      if (current === null) return 0;
      if (current === toFind) return 0;

      const leftHeight = __recurse(current.left, toFind);
      const rightHeight = __recurse(current.right, toFind);
      return Math.min(leftHeight, rightHeight) + 1;
    }
    return __recurse(this.root, node);
  }

  isBalanced() {
    function __recurse(current) {
      if (current === null) return true;

      const heightDiff = Math.abs(
        this.height(current.left) - this.height(current.right)
      );

      return (
        !(heightDiff > 1) && __recurse(current.left) && __recurse(current.right)
      );
    }
    __recurse = __recurse.bind(this);
    return __recurse(this.root);
  }

  rebalance() {
    if (this.isBalanced()) return { rebalanced: false, root: this.root };

    const sequence = this.inOrder();
    this.root = this.buildTree(sequence);
    return { rebalanced: true, root: this.root };
  }

  get prettified() {
    const res = [];

    /* Override `console.log` behavior */
    const console = {
      log: (line) => res.push(line),
    };

    /* Provided */
    function prettyPrint(node, prefix = '', isLeft = true) {
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
      }
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
    }
    prettyPrint(this.root);

    return res.join('\n');
  }
}

/*  Tie it all together
 *  Write a simple driver script that does the following:
 */
function driver() {
  console.clear();
  let instructions;

  instructions = [
    '1.',
    'Create a binary search tree from an array of random numbers.',
    'You can create a function if you want that returns an array',
    'of random numbers each time you call it.',
  ].join(' ');

  const { getRandomInt } = Utilities;
  const randomNumbers = Array.from(
    { length: getRandomInt({ lower: 8, upper: 16 }) },
    () => getRandomInt({ lower: 0, upper: 10 })
  );
  const tree = new Tree(randomNumbers);

  console.log(instructions);
  console.log({ randomNumbers, tree });
  console.log(tree.prettified);
  console.log();

  instructions = [
    '2.',
    'Confirm that the tree is balanced by calling `isBalanced`.',
  ].join(' ');

  console.log(instructions);
  console.log({ isBalanced: tree.isBalanced() });
  console.log();

  instructions = [
    '3.',
    'Print out all elements in level, pre, post, and in order.',
  ].join(' ');

  console.log(instructions);
  console.log({
    level: tree.levelOrder(),
    preOrder: tree.preOrder(),
    postOrder: tree.postOrder(),
    inOrder: tree.inOrder(),
  });
  console.log();

  instructions = [
    '4.',
    'Unbalance the tree by adding several numbers > 100.',
  ].join(' ');

  const unbalancingNumbers = Array.from(
    { length: getRandomInt({ lower: 4, upper: 8 }) },
    () => getRandomInt({ lower: 100 + 1, upper: 1000 })
  );
  for (const num of unbalancingNumbers) tree.insert(num);

  console.log(instructions);
  console.log({ unbalancingNumbers });
  console.log(tree.prettified);
  console.log();

  instructions = [
    '5.',
    'Confirm that the tree is unbalanced by calling `isBalanced`.',
  ].join(' ');

  console.log(instructions);
  console.log({ isBalanced: tree.isBalanced() });
  console.log();

  instructions = ['6.', 'Balance the tree by calling `rebalance`.'].join(' ');

  tree.rebalance();

  console.log(instructions);
  console.log(tree.prettified);
  console.log();

  instructions = [
    '7.',
    'Confirm that the tree is balanced by calling `isBalanced`.',
  ].join(' ');

  console.log(instructions);
  console.log({ isBalanced: tree.isBalanced() });
  console.log();

  instructions = [
    '8.',
    'Print out all elements in level, pre, post, and in order.',
  ].join(' ');

  console.log(instructions);
  console.log({
    level: tree.levelOrder(),
    preOrder: tree.preOrder(),
    postOrder: tree.postOrder(),
    inOrder: tree.inOrder(),
  });
  console.log();
}
driver();
