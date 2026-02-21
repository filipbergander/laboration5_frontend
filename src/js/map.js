"use strict";
import '/src/sass/main.scss';

let map;
let marker;
const searchPlaceContainer = document.querySelector(".searchPlace");


// När DOM har laddats färdigt kan funktionen för att hämta koordinater anropas
addEventListener("DOMContentLoaded", async() => {
    map = L.map('map').setView([54.50, 14.68], 4);
    const searchBtnEl = document.getElementById("searchBtn");

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    searchBtnEl.addEventListener("click", () => { // Om man klickar på knappen
        const searchInput = document.getElementById("searchInput").value;
        if (!searchInput.trim()) return;
        searchAdress(searchInput);
    });
});

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
        console.log(latitude, longitude);
        addMarker(latitude, longitude, searchInput);
    } catch (error) {
        console.error("Felmeddelanden: ", error);
    }
}

function addMarker(latitude, longitude, searchInput) {
    if (marker) {
        map.removeLayer(marker);
    }
    map.setView([latitude, longitude], 12);
    marker = L.marker([latitude, longitude]).addTo(map);

    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
    const letterUppercase = searchInput.charAt(0).toUpperCase() + searchInput.slice(1).toLowerCase();
    searchPlaceContainer.innerHTML =
        `   <p> Plats du sökte på: <span id="place">${letterUppercase}</span></p>
            <p> Latitude: <span id="lat">${latitude}</span></p>
            <p> Longitude: <span id="lon">${longitude}</span></p>
        `
}