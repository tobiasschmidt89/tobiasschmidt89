import { useEffect, useState } from 'preact/hooks';
import { html } from 'htm/preact';
import { fetchData } from '@/utils/api.js';
import SiteHeader from '@/components/Header.js';
import Footer from '@/components/Footer.js';
import Section from '@/components/Section.js';
import DescriptionList from '@/components/DescriptionList.js';
import LinkList from '@/components/LinkList.js';
import InlineLinkList from '@/components/InlineLinkList.js';
import TextLink from '@/components/TextLink.js';
import { hooks } from '@/utils/hooks.js';

export default function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData().then(setData);
    }, []);

    if (!data) return html`<div>Loading...</div>`;

    const { person, website, now } = data;

    return html`
        <${SiteHeader} />
        <main>
            <article style=${hooks({
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(25ch, 1fr))",
                gap: "calc(2 * var(--x-1-4)) var(--x-1-8)"
            })}>
                <header id="header" aria-labelledby="hero-heading" style=${hooks({
                    display: "grid",
                    gridTemplateColumns: "var(--cols-1)",
                    gap: "var(--x-1)"
                })}>
                    <h1>${person.description || "Building Digital Robots"}</h1>
                </header>

                <hr style=${hooks({ gridColumn: "1 / -1" })} />

                <${Section} id="about" title="About" hideTitle=${true} className="contents">
                    <${DescriptionList} items=${person.knowsAbout} />
                <//>

                <hr style=${hooks({ gridColumn: "1 / -1" })} />

                <${Section} id="experience" title="Experience">
                    <${LinkList} items=${person.worksFor} type="work" />
                <//>

                <${Section} id="education" title="Education">
                    <${LinkList} items=${person.alumniOf} type="education" />
                <//>

                <${Section} id="projects" title="Side Projects">
                    <${LinkList} items=${person.projects} type="project" />
                <//>

                <hr style=${hooks({ gridColumn: "1 / -1" })} />

                <${Section} id="now" title="Now">
                    <${LinkList} items=${now} type="rss" />
                <//>

                <${Section} id="languages" title="Languages">
                    <${InlineLinkList} items=${person.knowsLanguage} />
                <//>

                <${Section} id="uses" title="Uses">
                    <${InlineLinkList} items=${person.owns} />
                <//>

                <${Section} id="ideals" title="Ideals">
                    <${InlineLinkList} items=${person.seeks} />
                <//>

                 <footer id="footer" aria-labelledby="footer-heading" style=${hooks({ gridColumn: "1 / -1" })}>
                    <h2 id="footer-heading">Connect</h2>
                     <ul role="list" class="inline">
                        <li><${TextLink} href="mailto:${person.email}" target="_blank">Email<//></li>
                        <li><${TextLink} href="tel:${person.telephone ? person.telephone.replace(/\s/g,'') : ''}" target="_blank">Phone<//></li>
                        ${person.sameAs?.map(url => {
                             let name = "Link";
                             if(url.includes("linkedin")) name = "LinkedIn";
                             if(url.includes("github")) name = "GitHub";
                             return html`<li><${TextLink} href=${url} target="_blank">${name}<//></li>`
                        })}
                    </ul>
                </footer>
            </article>
        </main>
        <hr />
        <${Footer} />
    `;
}
