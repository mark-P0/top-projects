const E = (element, attributes, content, children) => {
    return { element, attributes, content, children };
};
function buildElementTree(elementObj) {
    let { element } = elementObj;
    const { attributes, content, children } = elementObj;
    if (typeof element === 'string') {
        element = document.createElement(element);
        if (attributes) {
            for (const [attr, val] of Object.entries(attributes)) {
                element.setAttribute(attr, val);
            }
        }
        if (content)
            element.textContent = content;
    }
    if (children) {
        for (const child of children) {
            element.append(buildElementTree(child));
        }
    }
    return element;
}
export { E, buildElementTree };
//# sourceMappingURL=dom.js.map