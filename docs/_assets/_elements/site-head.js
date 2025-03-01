export default class HTMLSiteHeadElement extends HTMLHeadElement {

	constructor () {
		super()
	}

    connectedCallback() {
        const title = this.querySelector('title').textContent
        const description = this.querySelector('[name="description"]').content
        const themeColor = getComputedStyle(document.documentElement).getPropertyValue("--color-background");
        
        const manifest = document.createElement('link')
        manifest.rel = "manifest"
        manifest.href = "_schemas/manifest.json"
        this.appendChild(manifest)

        const icon = document.createElement('link')
        icon.rel = "icon"
        icon.href = "_images/favicon.svg"
        this.appendChild(icon)

        const lightTheme = document.createElement('meta')
        lightTheme.name = "theme-color"
        lightTheme.content = themeColor
        lightTheme.media = "(prefers-color-scheme: light)"
        this.appendChild(lightTheme)

        const darkTheme = document.createElement('meta')
        darkTheme.name = "theme-color"
        darkTheme.content = "black"
        darkTheme.media = "(prefers-color-scheme: dark)"
        this.appendChild(darkTheme)

        const author = document.createElement('meta')
        author.name = "author"
        author.content = "Tobias Schmidt<contact.tobias.schmidt@gmail.com>"
        this.appendChild(author)

        const ogTitle = document.createElement('meta')
        ogTitle.setAttribute("property", "og:title")
        ogTitle.content = title.replace(' - Tobias Schmidt', '')
        this.appendChild(ogTitle)

        const ogDescription = document.createElement('meta')
        ogDescription.setAttribute("property", "og:description")
        ogDescription.content = description
        this.appendChild(ogDescription)

        const ogSiteName = document.createElement('meta')
        ogSiteName.setAttribute("property", "og:site_name")
        ogSiteName.content = "Tobias Schmidt's personal website"
        this.appendChild(ogSiteName)

        const ogUrl = document.createElement('meta')
        ogUrl.setAttribute("property", "og:url")
        ogUrl.content = document.location
        this.appendChild(ogUrl)

        const ogLocale = document.createElement('meta')
        ogLocale.setAttribute("property", "og:locale")
        ogLocale.content = document.documentElement.lang
        this.appendChild(ogLocale)
        
        const twitterTitle = document.createElement('meta')
        twitterTitle.name = "twitter:title"
        twitterTitle.content = title.replace(' - Tobias Schmidt', '')
        this.appendChild(twitterTitle)

        const twitterDescription = document.createElement('meta')
        twitterDescription.name = "twitter:description"
        twitterDescription.content = description
        this.appendChild(twitterDescription)

        const twitterCard = document.createElement('meta')
        twitterCard.name = "twitter:card"
        twitterCard.content = "summary"
        this.appendChild(twitterCard)

        const twitterSite = document.createElement('meta')
        twitterSite.name = "twitter:site"
        twitterSite.content = "@TobiasSchmidt89"
        this.appendChild(twitterSite)
    }

}