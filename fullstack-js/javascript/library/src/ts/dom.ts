/* DOM element representation */
type E = {
  element: string | Element;
  attributes: object | null;
  content: string | null;
  children: E[] | null;
};
const E = (
  element: string | Element,
  attributes: object | null,
  content: string | null,
  children: E[] | null
): E => {
  return { element, attributes, content, children };
};

function buildElementTree(elementObj: E): Element {
  /* `element` will be an actual HTML element, if it isn't already */
  let { element } = elementObj;
  const { attributes, content, children } = elementObj;

  if (typeof element === 'string') {
    /* Create actual element; at this point, `element` must be a tag name string */
    element = document.createElement(element);

    /* Add attributes to new element */
    if (attributes) {
      for (const [attr, val] of Object.entries(attributes)) {
        element.setAttribute(attr, val);
      }
    }

    /* Add text content to new element */
    if (content) element.textContent = content;
  }

  /* Add children to element, recursively */
  if (children) {
    for (const child of children) {
      element.append(buildElementTree(child));
    }
  }
  return element;
}

export { E, buildElementTree };
