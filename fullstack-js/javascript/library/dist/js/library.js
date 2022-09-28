const Library = {
    __element__: document.querySelector('#shelves'),
    get books() {
        return Array.from(this.__element__.children)
            .slice(1)
            .map((bookElement) => bookElement === null || bookElement === void 0 ? void 0 : bookElement.__jsObj__);
    },
    add(book) {
        this.__element__.append(book.__element__);
    },
};
Library.__element__.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target === null || target === void 0 ? void 0 : target.classList.contains('read-indicator')))
        return;
    const bookElement = target.closest('.book');
    const bookObj = bookElement.__jsObj__;
    bookObj.toggleStatus();
    const newAttrState = bookObj.isRead ? 'read' : 'unread';
    target.dataset.state = newAttrState;
});
Library.__element__.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target === null || target === void 0 ? void 0 : target.classList.contains('btn-close')))
        return;
    const bookElement = target.closest('.book');
    Library.__element__.removeChild(bookElement);
});
export { Library };
//# sourceMappingURL=library.js.map