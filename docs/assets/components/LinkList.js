import { html } from 'htm/preact';
import TextLink from '@/components/TextLink.js';

export default function LinkList({ items, type }) {
  if (!items) return null;

  return html`
    <ol role="list">
        ${items.map(item => {
            let label = "";
            let url = "";
            let time = "";

            if (type === 'rss') {
                label = item.title;
                url = item.link;
                return html`<li><${TextLink} href=${url} target="_blank">${label}<//></li>`;
            }

            if (type === 'work') {
                label = item.brand || item.legalName;
                url = item.url;
                const start = item.employee?.startDate?.split('-')[0];
                const end = item.employee?.endDate === 'Present' ? 'Inf.' : item.employee?.endDate?.split('-')[0];
                if (start) time = `${start}–${end || '?'}`;
            } else if (type === 'education') {
                label = item.alternateName || item.legalName;
                url = item.url || "#";
                const start = item.alumni?.startDate;
                const end = item.alumni?.endDate;
                if (start) time = `${start}–${end}`;
            } else if (type === 'project') {
                label = item.name;
                url = item.url;
                if (item.status === 'Ongoing') {
                    time = 'Ongoing';
                } else {
                    const start = item.startDate;
                    const end = item.endDate;
                    if (start && end) {
                        time = start === end ? start : `${start}–${end}`;
                    } else if (start) {
                        time = start;
                    }
                }
            }

            return html`
                <li>
                    <${TextLink} href=${url} target="_blank">${label}<//>
                    ${time && html` <time>${time}</time>`}
                </li>
            `;
        })}
    </ol>
  `;
}
