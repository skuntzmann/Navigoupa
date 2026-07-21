// ==========================================
// NAVIGOUPA
// Application principale
// ==========================================

async function init() {

    initUI();

    // ------------------------------
    // MÉTÉO
    // ------------------------------

    try {

        const weather = await loadWeather();

        displayWeather(weather);

    } catch (error) {

        console.error(error);

        const weatherDiv = document.getElementById("weather");

        if (weatherDiv) {

            weatherDiv.innerHTML = `
                <p>Impossible de charger la météo.</p>
            `;

        }

    }

    // ------------------------------
    // MARÉES
    // ------------------------------

    try {

        const tides = await loadTides();

        displayTides(tides);

    } catch (error) {

        console.error(error);

        const tidesDiv = document.getElementById("tides");

        if (tidesDiv) {

            tidesDiv.innerHTML = `
                <p>Impossible de charger les marées.</p>
            `;

        }

    }

}

// ==========================================

document.addEventListener("DOMContentLoaded", init);
