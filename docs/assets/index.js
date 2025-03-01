import "./polyfills/custom-elements.js?v=YYYY-MM-DD"
import HTMLAvatarListElement from "/elements/avatar-list.js?v=YYYY-MM-DD"
import HTMLGenerativeLinesElement from "/elements/generative-lines.js?v=YYYY-MM-DD"
import HTMLGetSchemaElement from "/elements/get-schema.js?v=YYYY-MM-DD"
import HTMLSiteBodyElement from "/elements/site-body.js?v=YYYY-MM-DD"
import HTMLSiteHeadElement from "/elements/site-head.js?v=YYYY-MM-DD"
import newHTMLSrcSetImageElement from "/elements/src-set.js?v=YYYY-MM-DD"

if ("customElements" in window) {
    customElements.define("avatar-list", HTMLAvatarListElement)
    customElements.define("get-schema", HTMLGetSchemaElement, { extends: "link" })
    customElements.define("generative-lines", HTMLGenerativeLinesElement)
    customElements.define("site-body", HTMLSiteBodyElement, { extends: "body" })
    customElements.define("site-head", HTMLSiteHeadElement, { extends: "head" })
    customElements.define("src-set", newHTMLSrcSetImageElement(), { extends: "img" })
}
