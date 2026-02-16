"use strict";
import '/src/sass/main.scss';

addEventListener("DOMContentLoaded", () => {

    const btnDemo = document.getElementById("btn-demo"); // Knapp för att starta demonstration inom animeringar
    const loadingSpin = document.getElementById("load-spin"); // Laddikon
    const imageDisplay = document.getElementById("images-animations"); // Bilder inom animeringar
    const gironaEl = document.querySelector(".grass-pic"); // Bild för Girona
    const skuleEl = document.querySelector(".water-pic"); // Bild för Skuleskogen
    const skuleTextEl = document.getElementById("skule-text"); // Text till bilden för skuleskog
    const gironaTextEl = document.getElementById("girona-text"); // Text till bilden för Girona'
    const iconsEl = document.getElementById("icons"); // Text till bilden för Girona
    const btnRestartEl = document.getElementById("btn-restart"); // För att starta om demonstrationen
    const headlineEl = document.getElementById("headline"); // Rubriken

    const toggleBtn = document.getElementById("btn-menu"); // Knappen för att öppna hamburgermeny

    const closeBtn = document.getElementById("btn-close"); // Knappen för att stänga hamburgermeny

    const menuArea = document.getElementById("nav-menu"); // Navigeringsmenyn

    const darkBtn = document.querySelector(".btn-darkened"); // Knapp för att toggla mörkt/ljust tema på startsidan.

    if (darkBtn) {
        darkBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark"); // Lägger till classlist dark på body.
            darkBtn.classList.toggle("dark"); // Lägger till classlist dark på knappen
            if (document.body.classList.contains("dark")) { // Om body.dark finns ändras knappens text
                darkBtn.innerHTML = "Ljust tema"; // Ändrar texten inom knappen
                toggleBtn.classList.add("dark"); // Lägger till klassen mörk
                closeBtn.classList.add("dark");
                menuArea.classList.add("dark");
            } else {
                darkBtn.innerHTML = "Mörkt tema";
                toggleBtn.classList.remove("dark"); // Tar bort klassen mörk
                closeBtn.classList.remove("dark");
                menuArea.classList.remove("dark");
            }
        })
    } /* När ikonen för hamburgermenyn klickas på */
    toggleBtn.addEventListener("click", () => {
        toggleBtn.classList.toggle("close");
        closeBtn.classList.toggle("show");
        menuArea.classList.toggle("show");
    });
    /* När ikonen för att stänga hamburgermenyn klickas på */
    closeBtn.addEventListener("click", () => {
        closeBtn.classList.remove("show");
        toggleBtn.classList.remove("close");
        menuArea.classList.remove("show");
    });
    /* Knappen som finns på sidan animeringar */
    if (btnDemo) { /* Om den finns */
        btnDemo.addEventListener("click", () => {
            loadingSpin.classList.add("show");
            btnDemo.classList.add("unshow");
            setTimeout(() => { /* En timeout för att visa "laddningsikon" under laddningstiden */
                loadingSpin.classList.remove("show")
                imageDisplay.classList.add("show")
            }, 2500);
        });
    }
    /* Bilderna på sidan animeringar */
    if (skuleEl && gironaEl) { /* Den ska enbart leta på den sidan, eftersom de finns endast där */
        skuleEl.addEventListener("click", () => { /* Vid klick på bilden till Skuleskogen visas endast tillhörande text */
            gironaEl.classList.add("unshow");
            skuleTextEl.classList.add("show");
            iconsEl.classList.add("show");
            btnRestartEl.classList.add("show");
            headlineEl.classList.add("unshow");
        });
        /* Vid klick på bilden till Girona visas endast tillhörande text */
        gironaEl.addEventListener("click", () => {
            skuleEl.classList.add("unshow");
            gironaTextEl.classList.add("show");
            iconsEl.classList.add("show");
            btnRestartEl.classList.add("show");
            headlineEl.classList.add("unshow");
        });
    }
});