# Battleship

## Jest with TypeScript

https://jestjs.io/docs/getting-started#using-typescript

- Went with the soft Babel approach as the fuller `ts-jest` had a significantly more complicated setup
- When importing TS files into the tests, their file extensions are omitted, as that seems to work best with Jest
  - Regular TS files can import other TS files by using the JS extension...

## Game Flow

### Create two (2) game boards

> Battleship (also known as Battleships or Sea Battle) is a strategy type guessing game for **two players**.
>
> ― https://en.wikipedia.org/wiki/Battleship_(game)

- Each board is sized 10x10
  > **The grids are typically square – usually 10×10** ...
  >
  > ― https://en.wikipedia.org/wiki/Battleship_(game)#Description
- Attacks are received on a letter-digit `Point`
  > ... **the individual squares in the grid are identified by letter and number.**
  >
  > ― https://en.wikipedia.org/wiki/Battleship_(game)#Description
  - Rows are labelled with letters: `A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`
  - Columns are labelled with digits: `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`
- Ships are placed using a valid placement info:
  - The **ship** must be owned by the player that owns the board
  - The **origin** point within the board;
  - The **orientation** must be either `'horizontal'` or `'vertical'`;
  - The _expanded origin_ points are all within the board
- Board cells are marked as either:
  - Blank
    - Use `null`?
  - Occupied
    - Use a reference to the ship? e.g. a code?
  - Hit
    - Use `true` if hit to ship?
    - Otherwise `false`?
- Board display changes style depending on which player views them
  - If owner, show all board cell markers
  - If opponent, show all except ship occupations
- Each board keeps track of free-to-hit cells

### Create two (2) players

- Each player is given their own board
- Each player is also given a reference to their opponent's board
- Each player performs valid attacks on their opponent's board
  - Valid attacks are:
    - Coordinates within the game board
    - Not yet been hit
  - Computer player performs a random valid attack
- Each player keeps track of whether they have lost or not
  - Losing means all of their ships have been sunk

#### Each player has one of each kind of ship

> **Each player arranges five ships** ... on a ten-by-ten grid of squares ...
>
> ― https://slate.com/culture/2012/05/how-to-win-at-battleship.html

- Use the Hasbro version of ships so that they may be easily and uniquely coded
  > |   # | Name        | Size | Code |
  > | --: | :---------- | :--: | :--: |
  > |   1 | Carrier     |  5   |  C   |
  > |   2 | Battleship  |  4   |  B   |
  > |   3 | Destroyer   |  3   |  D   |
  > |   4 | Submarine   |  3   |  S   |
  > |   5 | Patrol Boat |  2   |  P   |
  >
  > ― https://en.wikipedia.org/wiki/Battleship_(game)#Description
  - Ship codes are their name's first character
  - Ship codes are used to represent them in the game board

### Players must place their ships on their boards

### Decide who comes first

- Choose randomly between players?

### For each round...

- The player in turn performs an attack on their opponent
- Check if either player has lost
  - If so, the game ends

### On game end...

- Display both boards
