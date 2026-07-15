// ==========================================
// NAVIGOUPA
// Gestion des marées
// Version 0.2
// ==========================================

async function loadTides() {

    return {

        port: "Royan",

        nextEvent: "PM",

        time: "--:--",

        coefficient: "--",

        height: "--",

        source: "En attente de connexion"

    };

}

function displayTides(data){

    document.getElementById("tides").innerHTML = `

        <div class="weather-temp">

            🌊 ${data.port}

        </div>

        <div class="weather-line">

            Prochaine marée : <strong>${data.nextEvent}</strong>

        </div>

        <div class="weather-line">

            Heure : ${data.time}

        </div>

        <div class="weather-line">

            Coefficient : ${data.coefficient}

        </div>

        <div class="weather-line">

            Hauteur : ${data.height}

        </div>

        <div class="weather-line">

            ${data.source}

        </div>

    `;

}
