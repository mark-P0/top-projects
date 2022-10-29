import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { E, buildElementTree } from './__dom__.js';

const element = buildElementTree(
  E('div', { content: 'Hello from Webpack+Bootstrap!' })
);

document.body.appendChild(element);
