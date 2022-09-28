import { Book } from './book.js';
import { Library } from './library.js';
const addBookButton = document.querySelector('.modal .modal-footer button');
const form = document.getElementById(addBookButton.getAttribute('form'));
addBookButton.addEventListener('click', () => {
    const formIsValid = form.checkValidity();
    if (!formIsValid)
        return;
    const formData = Object.fromEntries(new FormData(form));
    let bookTitle = formData.bookTitle;
    let bookAuthor = formData.bookAuthor;
    let bookPageCt = formData.bookPageCt;
    let bookIsRead = formData.bookIsRead;
    bookIsRead = !(bookIsRead === undefined);
    bookPageCt = (bookPageCt === '' ? null : Number.parseInt(bookPageCt));
    Library.add(new Book(bookTitle, bookAuthor, bookPageCt, bookIsRead));
    bootstrap.Modal.getOrCreateInstance(form.closest('.modal')).hide();
});
//# sourceMappingURL=form.js.map