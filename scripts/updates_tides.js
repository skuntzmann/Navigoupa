// ==========================================
// NAVIGOUPA
// Mise à jour des marées
// Version 0.2
// ==========================================

const fs = require("fs");

const tides = {

    port: "Royan",

    updated: new Date().toISOString(),

    nextEvent: "--",

    nextTime: "--:--",

    coefficient: "--",

    height: "--",

    remaining: "--",

    source: "À connecter à maree.info"

};

fs.writeFileSync(

    "data/tides.json",

    JSON.stringify(tides, null, 4),

    "utf8"

);

console.log("tides.json généré.");
