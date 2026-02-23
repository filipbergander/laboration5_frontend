/**
 * @ignore
 */

"use strict";
import '/src/sass/main.scss';

/* Generera dokumentation, kommandot: npx jsdoc -r . -d docs */

// När DOM har laddats färdigt kan funktionen för att hämta koordinater anropas
addEventListener("DOMContentLoaded", async() => {
    const searchBtnEl = document.getElementById("searchBtn");
    searchBtnEl.addEventListener("click", () => { // Om man klickar på knappen
        const searchInput = document.getElementById("searchInput").value;
        if (!searchInput.trim()) return;
        searchAdress(searchInput);
    });
});

/**
 * @ignore
 */

/*
 * Söker på koordinater som longitud och latitud beroende på sökinnehåll som användaren skrivit i sökfältet
 * genom API:et Nominatim. Datan skickas sedan vidare till funktionen showPoint. 
 * @param {string} searchInput - Sökinnehåll som användaren anger i sökfältet
 * @async
 */
async function searchAdress(searchInput) {
    const url = `https://nominatim.openstreetmap.org/search?q=${searchInput}&format=json`;
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Laboration5Frontend (fibe.2504@student.miun.se)"
            }
        });
        const data = await response.json();
        console.log(data);
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        const bbox = data[0].boundingbox;

        const minLon = bbox[0];
        const minLat = bbox[1];
        const maxLon = bbox[2];
        const maxLat = bbox[3];
        console.log(latitude, longitude, minLon, minLat, maxLon, maxLat);
        showPoint(latitude, longitude, minLon, minLat, maxLon, maxLat);
    } catch (error) {
        console.error("Felmeddelanden: ", error);
    }
}
/**
 * @ignore
 */

/*
 * Genererar en markör på en inbäddad karta från OpenStreetMap beroende på sökinput och platsens longitud och latitud
 * @param {string} latitude - Latitud för markören
 * @param {string} longitude - Longitud för markören
 * @param {string} minLon - Minsta longitud för platsen
 * @param {string} minLat - Minsta latitud för platsen
 * @param {string} maxLon - Största longitud för platsen
 * @param {string} maxLat - Största latitud för platsen
 */
function showPoint(latitude, longitude, minLon, minLat, maxLon, maxLat) {
    const frameEl = document.getElementById("frame");
    frameEl.src =
        `https://www.openstreetmap.org/export/embed.html?bbox=${minLon},${minLat},${maxLon},${maxLat}&layer=mapnik&marker=${latitude},${longitude}`;
}