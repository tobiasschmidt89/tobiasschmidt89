import { html } from 'htm/preact';
import { hooks } from '@/utils/hooks.js';
import TextLink from '@/components/TextLink.js';

export default function DescriptionList({ items }) {
  if (!items) return null;
  return html`
    <dl class="contents">
        ${items.map(item => html`
            <div style=${hooks({ marginBottom: 'var(--x-1)' })}>
                <dt><${TextLink} href=${item.url} target="_blank">${item.name}<//></dt>
                <dd>${item.description}</dd>
            </div>
        `)}
    </dl>
  `;
}
