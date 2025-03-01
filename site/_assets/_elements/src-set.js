export default function createHTMLSrcSetImageElement(widths = [512, 1024, 2048]) {
    return class HTMLSrcSetImageElement extends HTMLImageElement {
        static get observedAttributes() {
            return ["src", "width", "height"]
        }

        constructor() {
            super()
        }

        connectedCallback() {
            this.render(widths)
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.render(widths)
            }
        }

        render(widths) {
            try {
                const width = parseInt(this.getAttribute("width"), 10)
                const height = parseInt(this.getAttribute("height"), 10)
                const src = this.getAttribute("src")

                if (isNaN(width) || width <= 0) {
                    throw new Error("'width' attribute must be a positive number.")
                }
                if (isNaN(height) || height <= 0) {
                    throw new Error("'height' attribute must be a positive number.")
                }
                if (!this.hasAttribute("src")) {
                    throw new Error("'src' attribute is required.")
                }

                const aspectRatio = width / height

                const match = src.match(/(\d+x\d+)/)
                if (!match) { 
                    throw new Error("'src' has no dimensions wxh.") 
                }
                const dimensions = match[1]


                const filteredWidths = widths.filter((w) => w <= width)

                if (filteredWidths.length === 0) {
                    return
                }

                const srcset = filteredWidths
                    .map((w) => `${src.replace(dimensions, `${w}x${Math.floor(w / aspectRatio)}`)} ${w}w`)
                    .join(", ")

                this.srcset = srcset
            } catch (error) {
                console.error(
                    `Error setting up srcset for <img is="src-set">: ${error.message}`
                )
            }
        }
    }
}