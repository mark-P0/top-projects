# Testing Practice

Practice with testing JavaScript development using Jest

## Setup

https://jestjs.io/docs/getting-started

### Initialize project

```sh
npm init -y
```

### [_Optional_] Customize `package.json`

e.g.

- Add version, description, and license details
- Privatize project
- Set as an ES6 project

### Install Jest

```sh
npm i -D jest
```

### Install Babel for Jest to allow ES6 in tests

> [Jest's native ES6 support is still **experimental**](https://jestjs.io/docs/ecmascript-modules)

```sh
npm i -D babel-jest @babel/core @babel/preset-env
```

### Configure Babel

Create a `babel.config.cjs` with the following content:

```js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
```

### Write tests

Write tests on `tests/` directory with filename structure `<module>.test.js`, e.g.

```
src/
  module.js
tests/
  module.test.js
```

### Run tests with Jest

Jest automatically picks /up all tests in `tests/`

```sh
npx jest  # Or call within an NPM script
```
