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
 * @param {string} search - Sökinnehåll 
 */
async function searchAdress(searchInput) {
    const url = `https://nominatim.openstreetmap.org/search?q=${searchInput}&format=json`;
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "fibe.2504@student.miun.se"
            }
        })
        if (!response.ok) {
            throw new Error(`Status på respons: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        const bbox = data[0].boundingbox;
        console.log(bbox);
        console.log(`${latitude}, ${longitude}`);
        showPoint(latitude, longitude)
    } catch (error) {
        console.error(error.message);
    }
}
/**
 * 
 * @param {*} latitude 
 * @param {*} longitude 
 */
function showPoint(latitude, longitude) {
    const frameEl = document.getElementById("frame");
    console.log(frameEl)
    frameEl.src =
        `https://www.openstreetmap.org/export/embed.html?layer=mapnik&marker=${latitude},${longitude}&zoom=${15}`;
}