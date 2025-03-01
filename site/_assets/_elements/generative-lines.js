export default class HTMLGenerativeLinesElement extends HTMLElement {

    get type() {
        return this._type;
    }
  
    set type(value) {
        if (value === this._type) return
        this._type = value
        this.setAttribute("type", value)
        this.render()
    }

    static get observedAttributes() {
        return ["type"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "type") { this.type = newValue }
    }
    
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    }

    connectedCallback() {
        this.svg.setAttribute('width', '100%')
        this.svg.setAttribute('height', '100%')
        this.shadowRoot.appendChild(this.svg)
        this.render = this.render.bind(this)

        this.count = Math.floor(Math.random() * (100 - 25 + 1)) + 25,
        this.angle = Math.floor(Math.random() * (180 - 30 - 30 + 1)) + 30,
        this.center = Math.random(),
        
        this.render()
        this.resizer = new ResizeObserver(this.render)
        this.resizer.observe(this)
    }

    disconnectedCallback() {
        this.resizer.disconnect()
    }

    render() {
        const width = this.offsetWidth
        const height = this.offsetHeight
        const spacing = Math.max(width, height) / this.count
        const diagonal = Math.sqrt(width * width + height * height)

        this.svg.innerHTML = ""
        this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

        const group = document.createElementNS("http://www.w3.org/2000/svg", "g")
        this.svg.appendChild(group)

        if (this.type === "lines") {
            for (let i = -this.count; i <= this.count; i++) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
                line.setAttribute("x1", i * spacing)
                line.setAttribute("y1", -diagonal)
                line.setAttribute("x2", i * spacing)
                line.setAttribute("y2", height + diagonal)
                line.setAttribute("stroke", "var(--color-deco)")
                line.setAttribute("stroke-width", '1')
                group.appendChild(line)
                group.setAttribute("transform", `rotate(${this.angle} ${width / 2} ${height / 2})`)
            }
        }

        if (this.type === "circles") {
            for (let i = 1; i <= this.count; i++) {
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
                circle.setAttribute('cx', this.center * width)
                circle.setAttribute('cy', height)
                circle.setAttribute('r', i * spacing)
                circle.setAttribute("stroke", "var(--color-deco)")
                circle.setAttribute('stroke-width', '1')
                circle.setAttribute('fill', 'none')
                group.appendChild(circle)
              }
        }
    }
}