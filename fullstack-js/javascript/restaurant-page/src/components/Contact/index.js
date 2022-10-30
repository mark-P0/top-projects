import './styles.css';
import { E } from 'src/__dom__.js';
import Logo from 'src/components/Logo';
import strings, { decode } from 'res/strings';

const ContactSectionText = (cls, content) => {
  const options = { attributes: { class: cls } };

  if (typeof content === 'string') {
    options.content = content;
  } else if (Array.isArray(content)) {
    options.children = content;
  }

  return E('div', options);
};
const ContactSection = (header, subheader, text) => {
  header = ContactSectionText('font-stylized', header);
  subheader = ContactSectionText('font-condensed fs-2', subheader);
  text = ContactSectionText('font-regular fs-5', text);

  const children = [header, subheader, text];

  return E('div', { children });
};
const ContactDetails = (() => {
  const attributes = {
    id: 'contact-details',
    class: 'vstack justify-content-center',
  };

  const hours = (() => {
    const text = strings.TIME.map(decode);
    return ContactSection(...text);
  })();
  const address = (() => {
    const text = strings.LOCATION.map(decode);
    return ContactSection(
      text[0],
      /* cspell:disable */
      [
        E('span', { content: text[1] }),
        E('br'),
        E('span', { content: text[2] }),
      ],
      [
        E('span', { content: text[3] }),
        E('span', {
          content: text[4],
          attributes: { class: 'fw-bold text-uppercase' },
        }),
      ]
      /* cspell:enable */
    );
  })();
  const socials = ContactSection('Social', null, [
    E('a', {
      attributes: {
        class: 'bi bi-facebook link-dark',
        href: decode(strings.LINK),
      },
    }),
  ]);
  const children = [hours, address, socials];

  return E('div', { attributes, children });
})();

const __inner__ = (() => {
  const attributes = {
    class:
      'content px-4 pb-4 position-absolute translate-middle-x h-100 vw-100 flex-maximize overflow-hidden',
  };
  const children = [Logo, ContactDetails];

  return E('div', { attributes, children });
})();
const Contact = (() => {
  const attributes = {
    class: 'd-none h-100 position-relative',
    'data-nav': 'contact-nav',
  };
  const children = [__inner__];

  return E('div', { attributes, children });
})();

export default Contact;
