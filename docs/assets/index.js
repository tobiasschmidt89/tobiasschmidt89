import "/assets/polyfills/custom-elements.js?v=YYYY-MM-DD"
import HTMLAvatarListElement from "/assets/elements/avatar-list.js?v=YYYY-MM-DD"
import HTMLGenerativeLinesElement from "/assets/elements/generative-lines.js?v=YYYY-MM-DD"
import HTMLGetSchemaElement from "/assets/elements/get-schema.js?v=YYYY-MM-DD"
import HTMLSiteBodyElement from "/assets/elements/site-body.js?v=YYYY-MM-DD"
import HTMLSiteHeadElement from "/assets/elements/site-head.js?v=YYYY-MM-DD"
import newHTMLSrcSetImageElement from "/assets/elements/src-set.js?v=YYYY-MM-DD"

if ("customElements" in window) {
    customElements.define("avatar-list", HTMLAvatarListElement)
    customElements.define("get-schema", HTMLGetSchemaElement, { extends: "link" })
    customElements.define("generative-lines", HTMLGenerativeLinesElement)
    customElements.define("site-body", HTMLSiteBodyElement, { extends: "body" })
    customElements.define("site-head", HTMLSiteHeadElement, { extends: "head" })
    customElements.define("src-set", newHTMLSrcSetImageElement(), { extends: "img" })
}
