import { html } from 'htm/preact';
import TextLink from '@/components/TextLink.js';

export default function Footer() {
    const year = new Date().getFullYear();
    return html`
        <footer>
            <a href="/" style="margin-inline-end: auto;"><time datetime="${year}">&copy;${year}</time></a>
            <ul role="list" class="inline">
                <li><${TextLink} href="https://github.com/tobiasschmidt89/tobiasschmidt89/wiki/Colophon" target="_blank">Colophon<//></li>
                <li><${TextLink} href="https://github.com/tobiasschmidt89/tobiasschmidt89/wiki/Legal-Notice" target="_blank">Legal<//></li>
                <li><${TextLink} href="https://github.com/tobiasschmidt89/tobiasschmidt89/wiki/Privacy-Notice" target="_blank">Privacy<//></li>
            </ul>
        </footer>
    `;
}
