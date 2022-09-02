# Project: Knights Travails

## Algorithm

### Definitions

```
chessBoard = [8, 8]
move = [x, y] coordinate
```

- All moves must conform to these definitions
- Move must not exceed the chess board dimensions

### Determine all moves

```
function getMoves(location)
  return (
    (all possible moves)
    .filter(moves outside of chessboard)
  )
```

Possible moves from a location are increments of the following:

```
[
  [ 1,  2],
  [ 1, -2],
  [-1,  2],
  [-1, -2],
  [ 2,  1],
  [ 2, -1],
  [-2,  1],
  [-2, -1],
]
```

### Define Node structure

```
Node:
  coordinates: [x, y]
  children: getMoves(coordinates).map(Node)
```

- Node value is location in the chess board
- Node children are also nodes using the coordinates of all possible moves

### Initialize Tree

```
tree = Tree(
  root=Node(knightLocation)
)
```

### Find destination on Tree

```
Tree:
  bfs(destination):
    traverse()

    if (currentNode.coordinates == destination)
      return currentNode
```

- Breadth-first traversal will ensure search will be as shallow as possible
- Return Node representation

### Get # of steps

```
ct = tree.depth(destinationNode)
```

- Depth of found node on tree is the number of moves

### Get path from origin to destination

> Not sure if this is the correct / expected way...

- Travel from found Node back to Tree root
- Store reference to Node parents

## Provided examples

<!-- prettier-ignore -->
```js
knightMoves([0,0],[1,2]) == [[0,0],[1,2]]
knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]
knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]
```

<!-- prettier-ignore -->
```js
> knightMoves([3,3],[4,3])
=> You made it in 3 moves!  Here's your path:
  [3,3]
  [4,5]
  [2,4]
  [4,3]
```

![](https://cdn.statically.io/gh/TheOdinProject/curriculum/284f0cdc998be7e4751e29e8458323ad5d320303/ruby_programming/computer_science/project_knights_travails/imgs/01.png)
