// ==========================================
// NAVIGOUPA
// Marées Royan
// ==========================================

const TIDES_URL = "data/tides.json";

// ==========================================

async function loadTides() {

    const response = await fetch(TIDES_URL);

    if (!response.ok) {
        throw new Error("Impossible de charger les marées.");
    }

    return await response.json();

}

// ==========================================

function displayTides(data) {

    const container = document.getElementById("tides");

    if (!container) return;

    let html = "";

    html += `<h3>🌊 ${data.port}</h3>`;

    html += `<div class="weather-line">`;

    html += `Mise à jour : ${new Date(data.updated).toLocaleString("fr-FR")}`;

    html += `</div>`;

    html += "<br>";

    html += "<table class='tides-table'>";

    html += `
        <tr>
            <th>Type</th>
            <th>Heure</th>
            <th>Hauteur</th>
            <th>Coef.</th>
        </tr>
    `;

    for (const event of data.events) {

        html += "<tr>";

        html += `<td>${event.type}</td>`;

        html += `<td>${event.time}</td>`;

        html += `<td>${event.height}</td>`;

        html += `<td>${event.coefficient ?? "-"}</td>`;

        html += "</tr>";

    }

    html += "</table>";

    html += `
        <div class="weather-line" style="margin-top:15px;">
            Source : maree.info
        </div>
    `;

    container.innerHTML = html;

}
