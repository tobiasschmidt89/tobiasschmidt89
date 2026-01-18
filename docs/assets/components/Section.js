import { html } from 'htm/preact';
import { hooks } from '@/utils/hooks.js';

export default function Section({ id, title, children, className, hideTitle = false }) {
  const titleStyle = hideTitle ? hooks({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: "0"
  }) : undefined;

  return html`
    <section id=${id} aria-labelledby="${id}-heading" class=${className}>
      <h2 id="${id}-heading" style=${titleStyle}>${title}</h2>
      ${children}
    </section>
  `;
}
