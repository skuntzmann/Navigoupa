// ==========================================
// NAVIGOUPA
// Version 0.1
// Application principale
// ==========================================

document.addEventListener("DOMContentLoaded", init);

// ==========================================

async function init() {

    afficherDate();

    afficherHeureMiseAJour();

    await chargerMeteo();

}

// ==========================================

function afficherDate() {

    const maintenant = new Date();

    const options = {

        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"

    };

    document.getElementById("today").textContent =
        maintenant.toLocaleDateString("fr-FR", options);

}

// ==========================================

function afficherHeureMiseAJour() {

    const maintenant = new Date();

    document.getElementById("lastUpdate").textContent =
        "Dernière mise à jour : " +
        maintenant.toLocaleTimeString("fr-FR");

}

// ==========================================

async function chargerMeteo() {

    const zone = document.getElementById("weather");

    zone.innerHTML = "Chargement de la météo...";

    try {

        const data = await loadWeather();

        afficherMeteo(data);

    }

    catch(error){

        console.error(error);

        zone.innerHTML =

            "<strong>Impossible de récupérer la météo.</strong><br><br>" +

            error.message;

    }

}

// ==========================================

function afficherMeteo(data){

    const current = data.current;

    const daily = data.daily;

    const lever = daily.sunrise[0].substring(11,16);

    const coucher = daily.sunset[0].substring(11,16);

    document.getElementById("weather").innerHTML =

        `

        <div class="weather-temp">

            ${weatherIcon(current.weather_code)}

            ${current.temperature_2m} °C

        </div>

        <div class="weather-line">

            💨 Vent :
            ${current.wind_speed_10m} km/h
            (${windDirection(current.wind_direction_10m)})

        </div>

        <div class="weather-line">

            🌬 Rafales :
            ${current.wind_gusts_10m} km/h

        </div>

        <div class="weather-line">

            💧 Humidité :
            ${current.relative_humidity_2m} %

        </div>

        <div class="weather-line">

            📈 Pression :
            ${current.pressure_msl} hPa

        </div>

        <div class="weather-line">

            🌅 Lever :
            ${lever}

        </div>

        <div class="weather-line">

            🌇 Coucher :
            ${coucher}

        </div>

        `;

}
