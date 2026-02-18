"use strict";
import '/src/sass/main.scss';

addEventListener("DOMContentLoaded", async() => {

    const searchBtnEl = document.getElementById("searchBtn");
    searchBtnEl.addEventListener("click", () => {
        const searchInput = document.getElementById("searchInput").value;
        if (!searchInput.trim()) return;
        searchAdress(searchInput);
    });
});


/**
 * Söker på longitud och latitud beroende på sökinnehåll
 * @param {string} searchInput - Textfältets sökinnehåll
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
 * Genererar en markör på en inbäddad karta från OpenStreetMap beroende på sökinput och platsens longitud och latitud
 * @param {number} latitude - Latitud för markören
 * @param {number} longitude - Longitud för markören
 * @param {number} minLon - Minsta longitud för platsen
 * @param {number} minLat - Minsta latitud för platsen
 * @param {number} maxLon - Största longitud för platsen
 * @param {number} maxLat - Största latitud för platsen
 */
function showPoint(latitude, longitude, minLon, minLat, maxLon, maxLat) {
    const frameEl = document.getElementById("frame");
    frameEl.src =
        `https://www.openstreetmap.org/export/embed.html?bbox=${minLon},${minLat},${maxLon},${maxLat}&layer=mapnik&marker=${latitude},${longitude}`;
}