// ==========================================
// NAVIGOUPA
// Marées
// Version 0.2
// ==========================================

const TIDES = {

    port: "Royan",

    source: "À connecter"

};

// ==========================================

async function loadTides() {

    /*
     * En attendant la connexion à une vraie source
     * (SHOM ou autre), on retourne une structure
     * unique qui sera conservée dans les versions
     * suivantes.
     */

    return {

        port: TIDES.port,

        nextEvent: "--",

        nextTime: "--:--",

        coefficient: "--",

        height: "--",

        remaining: "--",

        source: "Connexion en cours"

    };

}

// ==========================================

function displayTides(data) {

    document.getElementById("tides").innerHTML = `

        <div class="weather-temp">

            🌊 ${data.port}

        </div>

        <div class="weather-line">

            Prochaine marée :
            <strong>${data.nextEvent}</strong>

        </div>

        <div class="weather-line">

            Heure :
            ${data.nextTime}

        </div>

        <div class="weather-line">

            Coefficient :
            ${data.coefficient}

        </div>

        <div class="weather-line">

            Hauteur :
            ${data.height}

        </div>

        <div class="weather-line">

            Temps restant :
            ${data.remaining}

        </div>

        <div class="weather-line">

            <small>

            ${data.source}

            </small>

        </div>

    `;

}
