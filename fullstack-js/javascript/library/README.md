# [Library](https://mark-p0.github.io/top-projects/fullstack-js/javascript/library)

Track your book reading in a simple web application!

## Libraries | Frameworks

- Bootstrap `v5.2`
  - Specifically, the components
- TypeScript
- Vite
  - Development server and building

## Workflow

- Start Vite's development server with `npm run dev`
- Make changes to `src` files
- Build TS and Vite with `npm run build`
- Preview build with either:
  - `npm run preview`
    - Directly uses `./dist/index.html`
  - A separate server serving the top-level `index.html`
    - Redirects to `./dist/index.html`

## TODO

- [ ] Decide:
  - Keep this in the `top-projects` repo?
  - Move this into a separate repository?
- [x] Migrate from **Grunt** to **Vite**
