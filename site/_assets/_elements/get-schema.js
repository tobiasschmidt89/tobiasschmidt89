export default class HTMLGetSchemaElement extends HTMLLinkElement {

	constructor () {
		super()
	}

    connectedCallback() {
        const href = this.href
        const id = this.id
		if (id && href) this.#getSchema(href, id)
    }

    async #getSchema (href, id) {
        const response = await fetch(href)
        if (!response.ok) return
        const schema = await response.json()

        if (schema["@context"]) {
            const script = document.createElement('script')
            script.id = id
            script.type = "application/ld+json"
            script.innerHTML = JSON.stringify(schema, null, `    `);
            this.parentElement.appendChild(script)
        }

        if (!window.state) { window.state = {} }
        window.state[this.id] = schema

        this.remove()
    }

}