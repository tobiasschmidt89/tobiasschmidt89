import { reactive } from "@/utils/template.js"

const manifest = reactive({})
const website = reactive({})
const person = reactive({})
const now = reactive({})
const timestamp = reactive({
    year: new Date().getFullYear()
})

setInterval(function f() {
    fetch("/data/manifest.json").then(res => res.json()).then(data => Object.assign(manifest, data))
    fetch("/data/website.json").then(res => res.json()).then(data => Object.assign(website, data))
    fetch("/data/person.json").then(res => res.json()).then(data => Object.assign(person, data))
    fetch("/data/now.xml")
        .then(res => res.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(doc => {
            const items = Array.from(doc.querySelectorAll("item")).map(item => ({
                id: item.querySelector("guid")?.textContent,
                url: item.querySelector("link")?.textContent,
                title: item.querySelector("title")?.textContent,
                content_text: item.querySelector("description")?.textContent,
                date_published: item.querySelector("pubDate")?.textContent
            }));
            Object.assign(now, { items });
        })
    return f
}(), 1000 * 60 * 60)

export { manifest, website, person, now, timestamp }