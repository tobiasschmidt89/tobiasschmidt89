export async function fetchData() {
    try {
        const [person, website, nowText] = await Promise.all([
            fetch('/data/person.json').then(r => r.json()),
            fetch('/data/website.json').then(r => r.json()),
            fetch('/data/now.rss').then(r => r.text())
        ]);

        const now = parseRSS(nowText);

        return { person, website, now };
    } catch (e) {
        console.error("Failed to fetch data", e);
        return { person: {}, website: {}, now: [] };
    }
}

function parseRSS(xmlText) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");

    if (xml.getElementsByTagName("parsererror").length > 0) {
        console.error("XML Parsing Error:", xml.getElementsByTagName("parsererror")[0].textContent);
    }

    const items = Array.from(xml.getElementsByTagName("item"));

    return items.map(item => {
        const title = item.getElementsByTagName("title")[0]?.textContent;
        const link = item.getElementsByTagName("link")[0]?.textContent;
        const description = item.getElementsByTagName("description")[0]?.textContent;
        return { title, link, description };
    });
}
