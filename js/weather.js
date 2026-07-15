// ==========================================
// NAVIGOUPA
// Version 0.1
// Service météo Open-Meteo
// ==========================================

const WEATHER = {

    latitude: 45.623,
    longitude: -1.043,
    timezone: "Europe/Paris"

};

// ------------------------------------------

function getWeatherURL() {

    return "https://api.open-meteo.com/v1/forecast"

        + "?latitude=" + WEATHER.latitude
        + "&longitude=" + WEATHER.longitude

        + "&current="
        + "temperature_2m,"
        + "relative_humidity_2m,"
        + "pressure_msl,"
        + "wind_speed_10m,"
        + "wind_direction_10m,"
        + "wind_gusts_10m,"
        + "weather_code"

        + "&daily="
        + "sunrise,"
        + "sunset"

        + "&forecast_days=1"

        + "&timezone="
        + WEATHER.timezone;

}

// ------------------------------------------

async function loadWeather() {

    const response = await fetch(getWeatherURL(), {

        method: "GET",

        headers: {

            "Accept": "application/json"

        }

    });

    if (!response.ok) {

        throw new Error(
            "Erreur Open-Meteo : " + response.status
        );

    }

    return await response.json();

}

// ------------------------------------------

function windDirection(angle) {

    const directions = [

        "N",
        "NNE",
        "NE",
        "ENE",

        "E",
        "ESE",
        "SE",
        "SSE",

        "S",
        "SSO",
        "SO",
        "OSO",

        "O",
        "ONO",
        "NO",
        "NNO"

    ];

    return directions[
        Math.round(angle / 22.5) % 16
    ];

}

// ------------------------------------------

function weatherIcon(code) {

    if (code === 0)
        return "☀️";

    if (code <= 3)
        return "⛅";

    if (code <= 48)
        return "🌫️";

    if (code <= 67)
        return "🌧️";

    if (code <= 77)
        return "❄️";

    if (code <= 82)
        return "🌦️";

    if (code <= 99)
        return "⛈️";

    return "❓";

}
