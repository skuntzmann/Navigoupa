// ==========================================
// NAVIGOUPA
// Application principale
// Version 0.1
// ==========================================

document.addEventListener("DOMContentLoaded", init);

// ==========================================

async function init() {

    afficherDate();

    afficherHeure();

    await chargerMeteo();

}

// ==========================================

function afficherDate() {

    const maintenant = new Date();

    document.getElementById("today").textContent =
        maintenant.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

}

// ==========================================

function afficherHeure() {

    document.getElementById("lastUpdate").textContent =
        "Dernière mise à jour : " +
        new Date().toLocaleTimeString("fr-FR");

}

// ==========================================

async function chargerMeteo() {

    const zone = document.getElementById("weather");

    zone.innerHTML = "Chargement de la météo...";

    try {

        const data = await loadWeather();

        afficherMeteo(data);

    }

    catch (e) {

        console.error(e);

        zone.innerHTML =
            "<strong>Erreur :</strong><br>" +
            e.message;

    }

}

// ==========================================

function afficherMeteo(data) {

    const current = data.current;

    const lever = data.daily.sunrise[0].substring(11,16);

    const coucher = data.daily.sunset[0].substring(11,16);

    document.getElementById("weather").innerHTML = `

        <div class="weather-temp">

            ${weatherIcon(current.weather_code)}
            ${current.temperature_2m} °C

        </div>

        <div class="weather-line">
            💨 Vent : ${current.wind_speed_10m} km/h (${windDirection(current.wind_direction_10m)})
        </div>

        <div class="weather-line">
            🌬 Rafales : ${current.wind_gusts_10m} km/h
        </div>

        <div class="weather-line">
            💧 Humidité : ${current.relative_humidity_2m} %
        </div>

        <div class="weather-line">
            📈 Pression : ${current.pressure_msl} hPa
        </div>

        <div class="weather-line">
            🌅 Lever : ${lever}
        </div>

        <div class="weather-line">
            🌇 Coucher : ${coucher}
        </div>

    `;

}
