import { html } from 'htm/preact';
import { hooks } from '@/utils/hooks.js';

export default function TextLink({ href, target, children, style }) {
  return html`
    <a
      href=${href}
      target=${target}
      style=${hooks({
        color: 'inherit',
        textDecoration: 'underline',
        textDecorationColor: 'var(--color-deco)',
        textUnderlineOffset: '0.2em',
        "&:hover": {
          textDecorationColor: 'var(--color-highlight)',
        },
        ...style
      })}
    >${children}</a>
  `;
}
