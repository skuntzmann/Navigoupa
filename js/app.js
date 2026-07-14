// =====================================
// NAVIGOUPA
// Point d'entrée de l'application
// =====================================

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

function updateLastUpdate() {

    const now = new Date();

    document.getElementById("lastUpdate").textContent =
        "Dernière mise à jour : " +
        now.toLocaleTimeString("fr-FR");

}

function initialiseCards() {

    document.getElementById("weather").innerHTML =
        "⏳ En attente des données météo...";

    document.getElementById("tides").innerHTML =
        "⏳ En attente des marées...";

    document.getElementById("marine").innerHTML =
        "⏳ En attente du bulletin côtier...";

}

function init() {

    updateDate();

    updateLastUpdate();

    initialiseCards();

}

document.addEventListener("DOMContentLoaded", init);
