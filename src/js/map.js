"use strict";
import '/src/sass/main.scss';
addEventListener("DOMContentLoaded", () => {

    const searchInputEl = document.getElementById("search");
    const searchBtnEl = document.getElementById("searchBtn");
    searchBtnEl.addEventListener("click", () => {
        searchAdress(searchInputEl.value.trim());
    });
});


/**
 * Söker på longitud och latitud beroende på sökinnehåll
 * @param {string} search - Sökinnehåll 
 */
async function searchAdress(search) {
    const url = `https://nominatim.openstreetmap.org/search?q=${search}&format=json&limit=1`;
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


        const latitude = data[0].lat;
        const longitude = data[0].lon;
        console.log(`${latitude}, ${longitude}`);
    } catch (error) {
        console.error(error.message);
    }
}

function showPoint(latitude, longitude) {
    const mapContainer = document.getElementById("map");
    mapContainer.innerHTML =
        `<iframe
width="425"
height="350"
src=""
    </iframe>`
}