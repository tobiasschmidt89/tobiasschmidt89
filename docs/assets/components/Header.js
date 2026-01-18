import { html } from 'htm/preact';
import AvatarList from '@/components/AvatarList.js';
import { hooks } from '@/utils/hooks.js';
import TextLink from '@/components/TextLink.js';

export default function Header() {
  return html`
    <header style=${hooks({
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: 'var(--x-1)'
    })}>
        <${AvatarList} />
        <${TextLink} href="/" rel="home" style=${{
            textDecoration: 'none',
            fontWeight: 'bold',
            color: 'inherit'
        }}>Tobias Schmidt<//>
    </header>
  `;
}
