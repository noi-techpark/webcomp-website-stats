
class WebsiteStats extends HTMLElement {
    constructor() {
        super();

        // We need an encapsulation of our component to not
        // interfer with the host, nor be vulnerable to outside
        // changes --> Solution = SHADOW DOM
        this.shadow = this.attachShadow(
            { mode: "open" }    // Set mode to "open", to have access to
            // the shadow dom from inside this component
        );
    }

    get fontSize() {
        const configFontSize = this.getAttribute("fontSize");
        return configFontSize == null ? 24 : Number(configFontSize);
    }

    get text() {
        const configText = this.getAttribute("text");
        return configText == null ? "" : configText;
    }

    get period() {
        const configPeriod = this.getAttribute("period");
        return configPeriod == null ? "yearlyVisits" : configPeriod;
    }

    get websites() {
        let configWebsites = this.getAttribute("websites");
        configWebsites = configWebsites.replace(/\s/g, "").split(",");
        return configWebsites == null ? ['noi.bz.it/it/amministrazione-trasparente', 'noi.bz.it/de/transparente-verwaltung'] : configWebsites;
    }

    get visits() {
        const api = "https://mobility.api.opendatahub.com";

        const xhttp = new XMLHttpRequest();
        const searchString = "scode.in.(" + this.websites
            .map(e => `"${encodeURIComponent(e)}"`)
            .join(',')
            + ")";
        xhttp.open("GET", `${api}/v2/flat%2Cnode/WebStatistics/${this.period}/latest?limit=200&offset=0&shownull=false&distinct=true&timezone=UTC&where=${searchString}&origin=webcomp-website-stats`, false)
        xhttp.send();
        const json = JSON.parse(xhttp.response);

        let value = 0;
        for (let data of json.data)
            value += data.mvalue;

        return value;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                h1 {
                    color: black;
                    font-size: ${this.fontSize}px;
                    font-family: 'Source Sans Pro',sans-serif;
                }
            </style>
            <h1>
            ${this.text} ${this.visits}
            </h1>
        `;
    }
}

// Register our first Custom Element named <hello-world>
customElements.define('website-stats', WebsiteStats);
