import { html } from 'htm/preact';
import TextLink from '@/components/TextLink.js';

export default function InlineLinkList({ items }) {
  if (!items) return null;
  return html`
    <ul role="list" class="inline">
        ${items.map(item => html`
            <li><${TextLink} href=${item.url} target="_blank">${item.name}<//></li>
        `)}
    </ul>
  `;
}
