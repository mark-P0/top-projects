# Battleship

## Jest with TypeScript

https://jestjs.io/docs/getting-started#using-typescript

- Went with the soft Babel approach as the fuller `ts-jest` had a significantly more complicated setup
- When importing TS files into the tests, their file extensions are omitted, as that seems to work best with Jest
  - Regular TS files can import other TS files by using the JS extension...
