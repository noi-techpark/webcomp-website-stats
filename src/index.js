
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

    get visits() {
        // return this.getAttribute("title");
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://mobility.api.opendatahub.testingmachine.eu/v2/flat%2Cnode/Website/yearlyVisits/latest?limit=200&offset=0&shownull=false&distinct=true&timezone=UTC", false)
        xhttp.send();
        let json = JSON.parse(xhttp.response);
        console.log(json);
        return json.data[0].scode.split("/")[1].toUpperCase() + " " + json.data[0].mvalue + " - " + json.data[1].scode.split("/")[1].toUpperCase() + " " + json.data[1].mvalue;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                h1 {
                    color: black;
                    font-size: 34px;
                    font-family: 'Source Sans Pro',sans-serif;
                }
            </style>
            <h1>
                ${this.visits}
            </h1>
        `;
    }
}

// Register our first Custom Element named <hello-world>
customElements.define('website-stats', WebsiteStats);
