const Element = (element, attributes, content, children) => {
  return { element, attributes, content, children };
};
const ClassList = (...classes) => classes.join(' ');

function buildDOM(elementObj) {
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
      element.append(buildDOM(child));
    }
  }

  return element;
}

export { Element, ClassList, buildDOM };
