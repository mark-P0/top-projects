import { E, buildElementTree } from './dom.js';

const enum BookState {
  READ = 'read',
  UNREAD = 'unread',
}

interface BookElement extends Element {
  __jsObj__?: Book;
}

class Book {
  __element__: BookElement;

  title: string;
  author: string | null;
  pages: number | null;
  isRead: boolean;

  constructor(title: string, author: string, pages: number, isRead: boolean) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.__element__ = (() => {
      /* prettier-ignore */
      const titleElement = E( 'h6', { class: 'card-title fw-semibold' }, this.title, null );

      /* prettier-ignore */
      const descElement = this.author
        ? E('p', { class: 'card-text fs-6' },            `${this.author}, ${this.#pageWord}`, null)
        : E('p', { class: 'card-text fs-6 fst-italic' }, `By ?, ${this.#pageWord}`, null)

      const state: BookState = this.isRead ? BookState.READ : BookState.UNREAD;
      /* prettier-ignore */
      const isReadElement = E( 'button', { type: 'button', class: 'btn read-indicator', 'data-state': state }, null, null );

      /* prettier-ignore */
      const removeElement = E( 'button', { type: 'button', class: 'btn-close', 'aria-label': 'Remove' }, null, null );

      const element: BookElement = buildElementTree(
        E('div', { class: 'card book shadow' }, null, [
          E('div', { class: 'card-body' }, null, [titleElement, descElement]),
          E('div', { class: 'card-footer' }, null, [
            isReadElement,
            removeElement,
          ]),
        ])
      );

      element.__jsObj__ = this;

      return element;
    })();
  }

  get #pageWord() {
    const word = 'page';

    return this.pages === null
      ? `? ${word}s`
      : this.pages === 1
      ? `${this.pages} ${word}`
      : `${this.pages} ${word}s`;
  }

  info() {
    const readMsg = this.isRead ? 'already read' : 'not read yet';
    const pagePhrase = this.#pageWord;
    return `${this.title} by ${this.author}, ${pagePhrase}, ${readMsg}`;
  }

  toggleStatus() {
    this.isRead = !this.isRead;
  }
}

export { Book, BookState };
