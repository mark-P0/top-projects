import http from 'node:http';
import fs from 'node:fs/promises';
import url from 'node:url';
import path from 'node:path';

/************
 ** ROUTES **
 ************/

/* Use array-based route map in preparation for URL pattern matching */
const Routes = [
  /* HTML */
  { route: '/', filepath: './public/index.html' },
  { route: '/about', filepath: './public/about.html' },

  /* CSS */
  { route: '/styles.css', filepath: './public/styles.css' },

  /* 404; will be removed from this collection */
  { route: null, filepath: './public/404.html' },
];

/* Transform filepaths to proper absolute paths */
for (const route of Routes) {
  route.filepath = new url.URL(route.filepath, import.meta.url);
  route.filepath.__actualPath = url.fileURLToPath(route.filepath);
}

/* Set dedicated reference to 404 route and remove it from map */
const Route404 = Routes.pop();

/************
 ** SERVER **
 ************/

const Server = http.createServer(async (req, res) => {
  const reqURL = url.parse(req.url);
  const reqURLBase = reqURL.pathname;
  console.log(`Accessing: ${req.url}`);
  // console.log(reqURL);

  const route = Routes.find(({ route }) => route === reqURLBase) ?? Route404;
  const { filepath } = route;

  const filename = path.basename(filepath.__actualPath);
  const html = await fs.readFile(filepath, { encoding: 'utf-8' });
  console.log(`Serving: ${filename}`);
  // console.log(filepath);

  /* TODO: Set content type */
  // res.setHeader('Content-Type', 'text/html')

  res.statusCode = route === Route404 ? 404 : 200;
  res.end(html);
});

/***********
 ** START **
 ***********/

const Port = process.env.PORT ?? 80;
Server.listen(Port, () => {
  console.log(`Server running @ port ${Port}...`);
});
