# Project: Binary Search Trees

- Not confident about the `height()`, `depth()`, and `isBalanced()` functions
- Is this correct?
  - Are there many types of binary search trees?
  - How about AVL trees? Self-balancing trees?
  - Trees are traumatic for me ;\_;
- Expensive depth-first traversals
- Lots of function closures for recursion...
  - I do not know if this is good or bad

## Sample driver output

```bash
$ node ./bst.mjs
```

```
1. Create a binary search tree from an array of random numbers. You can create a function if you want that returns an array of random numbers each time you call it.
{
  randomNumbers: [
    5, 2, 4, 6, 0,
    0, 7, 9, 5
  ],
  tree: Tree { root: Node { data: 5, left: [Node], right: [Node] } }
}
│       ┌── 9
│   ┌── 7
│   │   └── 6
└── 5
    │   ┌── 4
    └── 2
        └── 0

2. Confirm that the tree is balanced by calling `isBalanced`.
{ isBalanced: true }

3. Print out all elements in level, pre, post, and in order.
{
  level: [
    5, 2, 7, 0,
    4, 6, 9
  ],
  preOrder: [
    5, 2, 0, 4,
    7, 6, 9
  ],
  postOrder: [
    0, 4, 2, 6,
    9, 7, 5
  ],
  inOrder: [
    0, 2, 4, 5,
    6, 7, 9
  ]
}

4. Unbalance the tree by adding several numbers > 100.
{ unbalancingNumbers: [ 125, 917, 347, 967, 807, 907 ] }
│                   ┌── 967
│               ┌── 917
│               │   │       ┌── 907
│               │   │   ┌── 807
│               │   └── 347
│           ┌── 125
│       ┌── 9
│   ┌── 7
│   │   └── 6
└── 5
    │   ┌── 4
    └── 2
        └── 0

5. Confirm that the tree is unbalanced by calling `isBalanced`.
{ isBalanced: false }

6. Balance the tree by calling `rebalance`.
│       ┌── 967
│       │   └── 917
│   ┌── 907
│   │   │   ┌── 807
│   │   └── 347
│   │       └── 125
└── 9
    │   ┌── 7
    │   │   └── 6
    └── 5
        │   ┌── 4
        └── 2
            └── 0

7. Confirm that the tree is balanced by calling `isBalanced`.
{ isBalanced: true }

8. Print out all elements in level, pre, post, and in order.
{
  level: [
      9, 5, 907, 2,   7, 347,
    967, 0,   4, 6, 125, 807,
    917
  ],
  preOrder: [
      9,   5,   2,   0,   4,   7,
      6, 907, 347, 125, 807, 967,
    917
  ],
  postOrder: [
      0,   4,   2,   6,   7,   5,
    125, 807, 347, 917, 967, 907,
      9
  ],
  inOrder: [
      0,   2,   4,   5,   6,   7,
      9, 125, 347, 807, 907, 917,
    967
  ]
}
```

## Leftover Quokka script

```js
/* cspell:disable */
/* prettier-ignore */
function quokka() {
  // const tree = new Tree([3, 5, 6])

  // const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]); // TOP

  // const tree = new Tree([10, 20, 30, 100, 500]); // insert
  // tree.insert(40)

  // const tree = new Tree([50]); // delete
  // tree.delete(50)

  const tree = new Tree([20, 30, 40, 50, 60, 70, 80]); // delete
  tree.delete(20) // Case 1
  tree.delete(30) // Case 2
  tree.delete(50) // Case 3
  // tree.delete(40) // Unbalance tree

  const _ = [
    // new Node(),
    // tree,
    // tree.find(30),
    typeof ((params) => {}),
    undefined === undefined,
    tree.find(40),
    tree.height(tree.find(40)),
    tree.depth(tree.find(40)),
    tree.isBalanced(),
    // tree.rebalance(),
  ]
  _

  console.log(tree.prettified)
  console.log('       BFS',      tree.levelOrder());
  console.log('  In-Order',    tree.inOrder());
  console.log(' Pre-Order',  tree.preOrder());
  console.log('Post-Order', tree.postOrder());
}
quokka();
```
