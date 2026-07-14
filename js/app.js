// ======================================
// NAVIGOUPA
// Application principale
// ======================================

import { loadWeather } from "./weather.js";

// --------------------------------------
// Date
// --------------------------------------

function updateDate() {

    const today = new Date();

    const options = {

        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"

    };

    document.getElementById("date").textContent =
        today.toLocaleDateString("fr-FR", options);

}

// --------------------------------------
// Heure de mise à jour
// --------------------------------------

function updateLastUpdate() {

    const now = new Date();

    document.getElementById("lastUpdate").textContent =
        "Dernière mise à jour : " +
        now.toLocaleTimeString("fr-FR");

}

// --------------------------------------
// Affichage météo
// --------------------------------------

function displayWeather(data) {

    const current = data.current;
    const daily = data.daily;

    document.getElementById("weather").innerHTML = `

        🌡 Température : <strong>${current.temperature_2m} °C</strong><br>

        💨 Vent : ${current.wind_speed_10m} km/h<br>

        🧭 Direction : ${current.wind_direction_10m}°<br>

        🌬 Rafales : ${current.wind_gusts_10m} km/h<br>

        💧 Humidité : ${current.relative_humidity_2m}%<br>

        📈 Pression : ${current.pressure_msl} hPa<br>

        🌅 Lever : ${daily.sunrise[0].substring(11,16)}<br>

        🌇 Coucher : ${daily.sunset[0].substring(11,16)}

    `;

}

// --------------------------------------
// Initialisation
// --------------------------------------

async function init() {

    updateDate();

    updateLastUpdate();

    try {

        const weather = await loadWeather();

        displayWeather(weather);

    }

    catch (error) {

        console.error(error);

        document.getElementById("weather").innerHTML =
            "❌ Impossible de charger la météo.";

    }

    document.getElementById("tides").innerHTML =
        "⌛ En développement";

    document.getElementById("marine").innerHTML =
        "⌛ En développement";

}

// --------------------------------------

document.addEventListener("DOMContentLoaded", init);
