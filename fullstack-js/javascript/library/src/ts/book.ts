import { E, buildElementTree } from './dom.js';

type Book = {
  __element__: Element;

  title: string;
  author: string | null;
  pages: number | null;
  isRead: boolean;

  __pagePlurality: (word: string, count: number | null) => string;
  info: () => string;
  toggleStatus: () => void;
};
type BookState = 'read' | 'unread';

const BookPrototype: Book = {
  __element__: document.createElement('div'),

  title: '',
  author: null,
  pages: null,
  isRead: false,

  __pagePlurality(word = 'page') {
    return this.pages === null
      ? `? ${word}s`
      : this.pages === 1
      ? `${this.pages} ${word}`
      : `${this.pages} ${word}s`;
  },
  info() {
    const readMsg = this.isRead ? 'already read' : 'not read yet';
    const pagePhrase = this.__pagePlurality();
    return `${this.title} by ${this.author}, ${pagePhrase}, ${readMsg}`;
  },

  toggleStatus() {
    this.isRead = !this.isRead;
  },
};

function Book(title: string, author: string, pages: number, isRead: boolean) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  const thisRef = this;
  Object.assign(this, {
    /*  This getter will be transformed into an actual `Element` object
     *  No need(?) to set this on the prototype, as it will be unique for every object anyway
     */
    get __element__() {
      delete this.__element__;

      const titleElement = E(
        'h6',
        { class: 'card-title fw-semibold' },
        thisRef.title,
        null
      );

      /* prettier-ignore */
      const descElement = thisRef.author
        ? E('p', { class: 'card-text fs-6' },            `${thisRef.author}, ${thisRef.__pagePlurality()}`, null)
        : E('p', { class: 'card-text fs-6 fst-italic' }, `By ?, ${thisRef.__pagePlurality()}`, null)

      /* prettier-ignore */
      const state: BookState = thisRef.isRead ? 'read' : 'unread'
      const isReadElement = E(
        'button',
        { type: 'button', class: 'btn read-indicator', 'data-state': state },
        null,
        null
      );

      const removeElement = E(
        'button',
        { type: 'button', class: 'btn-close', 'aria-label': 'Remove' },
        null,
        null
      );

      this.__element__ = buildElementTree(
        E('div', { class: 'card book shadow' }, null, [
          E('div', { class: 'card-body' }, null, [titleElement, descElement]),
          E('div', { class: 'card-footer' }, null, [
            isReadElement,
            removeElement,
          ]),
        ])
      );

      this.__element__.__jsObj__ = thisRef;
      return this.__element__;
    },
  });
}
Book.prototype = BookPrototype;

export { Book, BookState };
