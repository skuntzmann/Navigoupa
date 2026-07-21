// ==========================================
// NAVIGOUPA
// Interface utilisateur
// ==========================================

function showPage(page) {

    // Pour l'instant une seule page.
    // Cette fonction servira aux prochains écrans.

    console.log("Navigation :", page);

}

function initNavigation() {

    const buttons = document.querySelectorAll("#bottom-nav button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));

            button.classList.add("active");

            const page = button.id.replace("nav-", "");

            showPage(page);

        });

    });

}

function updateClock() {

    const now = new Date();

    const text =
        now.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long"
        })
        + " • "
        + now.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
        });

    const today = document.getElementById("today");

    if (today) {

        today.textContent = text;

    }

}

function initUI() {

    updateClock();

    setInterval(updateClock, 60000);

    initNavigation();

}
