# [TOP Projects](https://mark-p0.github.io/top-projects/)

This is a collection of my project solutions throughout _[The Odin Project](https://www.theodinproject.com)_

## List of Projects

### Foundations

1. [Basic Recipe Website](./foundations/basic-recipe-website/)
2. [Sample Landing Page](./foundations/sample-landing-page/)
3. [Rock-Paper-Scissors](./foundations/rock-paper-scissors/)
4. [Etch-a-Sketch](./foundations/etch-a-sketch/)
5. [Calculator](./foundations/calculator/)

### Full Stack JavaScript

#### Intermediate HTML & CSS

1. [Sign-Up Form](./fullstack-js/intermediate-html-css/signup-form/)
2. [Admin Dashboard](./fullstack-js/intermediate-html-css/admin-dashboard/)

#### JavaScript

##### Organizing your JavaScript Code

1. [Library](./fullstack-js/javascript/library/)
2. [Tic-Tac-Toe](./fullstack-js/javascript/tic-tac-toe/)
3. [Restaurant Page](./fullstack-js/javascript/restaurant-page/)
4. [Todo List](./fullstack-js/javascript/todo/)
5. [Weather App](./fullstack-js/javascript/weather/)

##### Computer Science

> These are scripts only and do not have a live preview.

1. [Recursion](./fullstack-js/javascript/recursion/)
2. [Linked Lists](./fullstack-js/javascript/linked-lists/)
3. [Binary Search Trees](./fullstack-js/javascript/binary-search-trees/)
4. [Knights Travails](./fullstack-js/javascript/knights-travails/)

##### Testing JavaScript

1. [Testing Practice](./fullstack-js/javascript/testing-practice/)

#### NodeJS

1. [Basic Informational Site](./fullstack-js/node-js/basic-informational-site/)

## Workflow

> Struck-through items are not needed for projects under this repository.

- Create a project directory
- ~~Initialize `git`~~
- ~~[_Optional_] Add a remote repository~~
  - _Via CLI:_ `git remote add <remote-name> <remote-url>`
  - _Via VSCode:_ Use the **Source Control** panel
- ~~Add a `LICENSE` file~~
  - https://choosealicense.com/
  - **GNU AGPL** is considered the strongest so far
- Create a `README` file
  - `#` is the **project name**
  - Followed by a **short description**
  - [_Optional_] Add a `## Dependencies` section to acknowledge core technologies used
  - Add a `## Credits` section at the end for asset attributions, if any
- Initialize `npm` with `npm init -y`
  > It is preferable to do this after the above steps as it can automatically extract project name and description details from the `README`, and remote details from the `.git` repository, among other things.
  - Privatize project with `"private": "true"`
  - Enable ES6 Modules with `"type": "module"`
  - Remove default entrypoint ~~`"main": "index.js"`~~
    - This could be used in e.g. `node .`
  - [_Optional_] Set initial version with `"version": "0.0.1"`
- Create a `.gitignore` file. Common ignores include:
  - `.exclude/`, for personal notes
  - `node_modules/`, for `npm` packages
  - `dist/`, for build files
- Add common libraries
  > It is better to declare these explicitly when possible as related comments can be present within source code, e.g. `/* prettier-ignore */`, `/* cspell:disable */`, `/* eslint-disable */`
  - [CSpell](https://cspell.org/), for spell checking
  - [Prettier](https://prettier.io/), for code formatting
  - [ESLint](https://eslint.org/), for code linting (_static analysis_)
- Create an initial commit
  - Include **EVERYTHING**, even [`package-lock.json`](https://stackoverflow.com/a/44210813/)!
- **Start developing!**

### Major Packages

Major packages can be included as needed during development. The following are some of the more common packages to be used.

- A _module bundler_, e.g.
  - [Webpack](https://webpack.js.org/)
  - [Vite](https://vitejs.dev/)
  - [Parcel](https://parceljs.org/)
    - Most preferable according to https://bundlers.tooling.report/
- A _transpiler_(?), e.g. [TypeScript](https://www.typescriptlang.org/)
- A _framework_, e.g.
  - [React](https://reactjs.org/)
  - [Solid](https://www.solidjs.com/)
    - Compiler?
    - Most(?) performant?
    - The "_React Dream_"?
  - [Svelte](https://svelte.dev/)
    - Compiler!
  - [Express](https://expressjs.com/)

## Merging

The project directories in this repo used to have their own repositories (now set as private) for practice in using Git. They were merged following [an answer to this StackOverflow question](https://stackoverflow.com/questions/1425892/how-do-you-merge-two-git-repositories).

Specifically, the following set of template commands were used:

```sh
git clone https://github.com/mark-P0/{REPO}.git {TEMP_DIR}/{REPO}
git -C {TEMP_DIR}/{REPO} filter-repo --to-subdirectory-filter {NEW_PARENT_DIR}/{REPO}

git remote add {REPO} {TEMP_DIR}/{REPO}
git fetch {REPO} --tags
git merge --allow-unrelated-histories {REPO}/main
```

- `TEMP_DIR` is a throwaway directory simply for holding the clones of the project repositories
- `REPO` is the name of the project repository
- `NEW_PARENT_DIR` is the intended parent directory(ies) of the projects under this new combined repository, e.g.
  - `foundations`
  - `fullstack-js/intermediate-html-css`
  - `fullstack-js/node-js`

This uses the [`git filter-repo`](https://github.com/newren/git-filter-repo) third-party extension.

Most of the restructuring was relatively straightforward, except for the Computer Science projects, as they were all committed to my _progress repository_ as opposed to their own separate repositories.

A clone of my progress repository was filtered separately for these projects using the following rather _unwieldy_ command:

```sh
git \
filter-repo \
--path=FullstackJS/02-JavaScript/05-ComputerScience/03-ProjectRecursion \
--path=FullstackJS/02-JavaScript/05-ComputerScience/05-ProjectLinkedLists \
--path=FullstackJS/02-JavaScript/05-ComputerScience/06-ProjectBinarySearchTrees \
--path=FullstackJS/02-JavaScript/05-ComputerScience/07-ProjectKnightsTravails \
--path-rename-match FullstackJS/02-JavaScript/05-ComputerScience/03-ProjectRecursion:fullstack-js/javascript/recursion \
--path-rename-match FullstackJS/02-JavaScript/05-ComputerScience/05-ProjectLinkedLists:fullstack-js/javascript/linked-lists \
--path-rename-match FullstackJS/02-JavaScript/05-ComputerScience/06-ProjectBinarySearchTrees:fullstack-js/javascript/binary-search-trees \
--path-rename-match FullstackJS/02-JavaScript/05-ComputerScience/07-ProjectKnightsTravails:fullstack-js/javascript/knights-travails
```

What this did was:

- Remove **everything** else in the repository other than the desired projects;
- Move the project directories under the appropriate path, and;
- Rename the project directories themselves into an appropriate _snake-case_ format.

> I'm sure all these can be further simplified, but they were sufficient enough for my use case! :)

## Conversion

The repo README is converted into an index page using [Pandoc](https://pandoc.org/) `v2.19.2` with a **GitHub Actions workflow** equivalent to the following command:

```sh
pandoc README.md -s -o index.html --shift-heading-level-by=-1
```

```

```
