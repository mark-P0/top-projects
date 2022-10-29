/* DOM element representation */
const E = (
  element,
  { attributes = null, content = null, children = null } = {}
) => {
  return { element, attributes, content, children };
};

function buildElementTree(E) {
  /* `element` will be an actual HTML element, if it isn't already */
  let { element, attributes, content, children } = E;

  if (typeof element === 'string') {
    /* Create actual element; at this point, `element` must be a tag name string */
    element = document.createElement(element);

    /* Add attributes to new element */
    attributes = attributes ? Object.entries(attributes) : null;
    attributes?.forEach(([attr, val]) => {
      element.setAttribute(attr, val);
    });

    /* Add text content to new element */
    if (content) element.textContent = content;
  }

  /* Add children to element, recursively */
  children?.forEach((child) => {
    element.append(buildElementTree(child));
  });
  return element;
}

export { E, buildElementTree };
