import { Book, BookState } from './book.js';

type Library = {
  __element__: Element;
  books: Book[];

  add: (book: Book) => void;
};

const Library: Library = {
  __element__: document.querySelector('#shelves'),
  get books() {
    return Array.from(this.__element__.children)
      .slice(1)
      .map((bookElement: any) => bookElement?.__jsObj__);
  },

  add(book) {
    this.__element__.append(book.__element__);
  },
};

/* Hook for toggling read indicator */
Library.__element__.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (!target?.classList.contains('read-indicator')) return;

  const bookElement = target.closest('.book') as any;
  const bookObj = bookElement.__jsObj__ as Book;
  bookObj.toggleStatus();

  const newAttrState: BookState = bookObj.isRead ? 'read' : 'unread';
  target.dataset.state = newAttrState;
});

/* Hook for removing books */
Library.__element__.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (!target?.classList.contains('btn-close')) return;

  const bookElement = target.closest('.book') as any;
  Library.__element__.removeChild(bookElement);
});

export { Library };
