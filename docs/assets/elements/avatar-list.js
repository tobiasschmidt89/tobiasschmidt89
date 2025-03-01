const ids = Array.from({ length: 5 }, (_, i) => i + 1).sort(() => Math.random() - 0.5)

const template = document.createElement('template')
template.innerHTML = String.raw`
<slot />
`

export default class HTMLAvatarListElement extends HTMLElement {

    constructor () {
        super()
        this.attachShadow({ mode: "open" })
        this.ids = Array.from({ length: 5 }, (_, i) => i + 1).sort(() => Math.random() - 0.5)
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        const $imgs = this.querySelectorAll('img')
        const [_, ...$robotImgs] = $imgs
        $robotImgs.forEach(($img) => {
            $img.src = `images/robots/robot-portrait-${this.ids.pop()}.64x64.webp`
        })
    }

}