const template = document.createElement('template')
template.innerHTML = String.raw`
<link rel="stylesheet" href="/assets/tokens/base.css" />
<link rel="stylesheet" href="/assets/elements/site-body.shadow.css" />
<link rel="stylesheet" href="/assets/elements/avatar-list.light.css" />
<header>
    <avatar-list>
        <img src="images/tobias-schmidt-avatar.64x64.webp" alt="Tobias Schmidt" width="64" height="64">
        <img alt="robot portrait 1" width="64" height="64">
        <img alt="robot portrait 2" width="64" height="64">
        <img alt="robot portrait 3" width="64" height="64">
        <img alt="robot portrait 4" width="64" height="64">
    </avatar-list>
    <a href="/" rel="home">Tobias Schmidt</a>
</header>
<main>
    <slot />
</main>
<hr />
<footer>
    <a href="/" style="margin-inline-end: auto;"><time datetime="${(new Date()).getFullYear()}">&copy;${(new Date()).getFullYear()}</time></a>
    <ul role="list" class="inline">
        <li><a href="https://github.com/tobiasschmidt89/tobiasschmidt89/wiki/Colophon" target="_blank">Colophon</a></li>
        <li><a href="https://github.com/tobiasschmidt89/tobiasschmidt89/wiki/Legal-Notice" target="_blank">Legal</a></li>
        <li><a href="https://github.com/tobiasschmidt89/tobiasschmidt89/wiki/Privacy-Notice" target="_blank">Privacy</a></li>
    </ul>
</footer>
`

const throttle = (fn, delay) => {
    let time = Date.now()
    return () => {
        if((time + delay - Date.now()) <= 0) {
            fn()
            time = Date.now()
        }
    }
}

const debounce = (fn, delay) => {
    let timer
    return () => {
        clearTimeout(timer)
        timer = setTimeout(fn, delay)
    }
}

export default class HTMLSiteBodyElement extends HTMLBodyElement {

    constructor () {
        super()
        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this._setupScrollDirectionObserver()
    }

    _setupScrollDirectionObserver() {

        let last = 0

        const isScrollingDown = () => {
            const current = window.scrollY
            const down = current > last
            last = current
            return down
        }

        const isTop = () => {
            const current = window.scrollY
            const threshold = 10
            return current < threshold
        }

        const isBottom = () => {
            const height = this.scrollHeight
            const current = window.scrollY + window.innerHeight
            const threshold = 100
            return current + threshold > height
        }

        const checkDirection = () => {
            this.setAttribute("data-scroll-direction", isScrollingDown() ? "down" : "up")
        }
        checkDirection()

        const checkPosition = () => {
            this.setAttribute("data-scroll-position", isTop() ? "top" : isBottom() ? "bottom" : "mid")
        }
        checkPosition()

        window.addEventListener("scroll", throttle(() => {
            checkDirection()
            debounce(checkPosition, 100)()
        }, 50))

    }
    
}