import { defineConfig } from 'vite';

export default defineConfig({
  /*  To allow entrypoint `index.html` inside `src/`
   *  Top-level `index.html` used in GitHub Pages to redirect to `dist/`
   */
  root: './src',

  /*  The `root` option above will also put the `dist/` output inside `src/`.
   *  This will explicitly set it to the same level outside.
   */
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
