// ==========================================
// NAVIGOUPA
// Open-Meteo
// Royan
// ==========================================

const LATITUDE = 45.623;
const LONGITUDE = -1.043;

const URL =
`https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=sunrise,sunset&timezone=Europe%2FParis`;

export async function loadWeather() {

    const response = await fetch(URL);

    if (!response.ok) {

        throw new Error("Impossible de récupérer la météo");

    }

    return await response.json();

}
