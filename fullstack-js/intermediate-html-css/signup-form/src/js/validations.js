/*  Validation Strategy:
 *  - Act lazy
 *  - When focus has been gained AND lost, act aggressive
 *  - After becoming valid, act lazy again
 *
 *  https://twitter.com/vponamariov/status/1380182211576664067
 *  Linked in the Twitter thread linked by TOP
 *  (https://twitter.com/vponamariov/status/1400388896136040454)
 */

const Email = {
  selector: '#form #email',
  get element() {
    return document.querySelector(this.selector);
  },
  get value() {
    return this.element.value;
  },
  get feedback() {
    return document.querySelector(`${this.selector} + .feedback`);
  },
  get isValid() {
    return this.element.checkValidity();
  },

  get constraintMsg() {
    if (this.value === '') return 'Please enter an email';
    return 'Email is invalid';
  },
  get checkFocusout() {
    return !this.isValid;
  },
  get checkInput() {
    return this.isValid;
  },
};

const Password = {
  selector: '#form #password',
  get element() {
    return document.querySelector(this.selector);
  },
  get value() {
    return this.element.value;
  },
  get feedback() {
    return document.querySelector(`${this.selector} + .feedback`);
  },
  get isValid() {
    return this.element.checkValidity();
  },

  /*  Sourced from HTML5Patterns
   *  https://www.html5pattern.com/Passwords
   */
  /* prettier-ignore */
  constraints: [
    [/(?=^.{8,}$).*$/, 'Must be at least 8 characters'],
    [/(?=.*[A-Z]).*$/, 'Must have an uppercase character'],
    [/(?=.*[a-z]).*$/, 'Must have a lowercase character'],

    [/((?=.*\d)|(?=.*\W+))(?![.\n]).*$/, 'Must have a number'],  // Unsure of what this does...
    // [   /(?=.*\d).*$/, 'Must have a number'],
    // [  /(?=.*\W+).*$/, 'Must have a special character'],
    // [  /(?![.\n]).*$/, 'Must not have a newline character'],
  ],
  get constraintMsg() {
    for (const [pattern, msg] of this.constraints)
      if (!this.value.match(pattern)) return msg;

    return '';
  },
  get checkFocusout() {
    return !this.isValid;
  },
  get checkInput() {
    return this.isValid;
  },
};

const PasswordConfirm = {
  selector: '#form #confirm-password',
  get element() {
    return document.querySelector(this.selector);
  },
  get value() {
    return this.element.value;
  },
  get feedback() {
    /*  Use the same feedback message element
     *  as the original password field.
     */
    return Password.feedback;
  },
  get isValid() {
    /*  Customized validation
     *  Check if same value with the original password field
     */
    return this.value === Password.value;
  },

  get constraintMsg() {
    return 'Passwords do not match';
  },
  get checkFocusout() {
    return !this.isValid && Password.isValid;
  },
  get checkInput() {
    return this.isValid && Password.isValid;
  },
};

for (const event of ['focusout', 'input']) {
  Password.element.addEventListener(event, () => {
    PasswordConfirm.element.dispatchEvent(new Event(event));
  });
}

for (const input of [Email, Password, PasswordConfirm]) {
  input.element.addEventListener('focusout', () => {
    if (input.checkFocusout) {
      input.element.classList.add('invalid');
      input.feedback.classList.remove('hidden');

      const msg = input.constraintMsg;
      input.feedback.textContent = msg;
      input.element.setCustomValidity(msg);
    }
  });
  input.element.addEventListener('input', () => {
    /*  Assume is valid at first
     *  Behind-the-scenes check uses this message and
     *  the actual validation?
     */
    input.element.setCustomValidity('');

    if (input.checkInput) {
      input.element.classList.remove('invalid');
      input.feedback.classList.add('hidden');

      input.feedback.textContent = '';
      input.element.setCustomValidity('');
    }
  });
}
