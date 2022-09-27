import { Book } from './book.js';
import { Library } from './library.js';

const addBookButton = document.querySelector('.modal .modal-footer button');
const form = document.getElementById(
  addBookButton.getAttribute('form')
) as HTMLFormElement;

addBookButton.addEventListener('click', () => {
  const formIsValid = form.checkValidity();
  if (!formIsValid) return;

  const formData = Object.fromEntries(new FormData(form));

  let bookTitle = formData.bookTitle as string;
  let bookAuthor = formData.bookAuthor as string;
  let bookPageCt = formData.bookPageCt as any;
  let bookIsRead = formData.bookIsRead as any;

  bookIsRead = !(bookIsRead === undefined) as boolean;
  bookPageCt = (
    bookPageCt === '' ? null : Number.parseInt(bookPageCt as any)
  ) as number;

  Library.add(new Book(bookTitle, bookAuthor, bookPageCt, bookIsRead));

  /* @ts-expect-error */
  bootstrap.Modal.getOrCreateInstance(form.closest('.modal')).hide();
});
