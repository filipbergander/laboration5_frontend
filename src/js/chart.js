  "use strict";
  import { plugins } from 'chart.js';
  import '/src/sass/main.scss';
  /* Generera dokumentation npx jsdoc -r . -d docs */


  // Väntar tills DOM har laddat färdigt sedan anropas funktionen för att hämta in statistik
  addEventListener("DOMContentLoaded", async() => {
      fetchStatistic();

  });
  /**
   * Hämtar in statistik över antal sökande för program och kurser på MIUN HT25 från externt API,
   * datan skickas sedan över till funktionen showDiagram.
   * @async
   */
  async function fetchStatistic() {
      const url = "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json";
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`Status på respons: ${response.status}`);
          }
          const result = await response.json();
          showDiagram(result);
          console.log(result);
      } catch (error) {
          console.error(error.message);
      }
  }

  /**
   * Tar emot data som statistik från funktionen fetchStatistic och skapar
   * ett stapeldiagram och cirkeldiagram utifrån antal sökande
   * @property {string} type - Definierar vilken typ studier: Kurs eller program
   * @property {string} name - Namn på kursen eller programmet
   * @property {number} applicantsTotal - Antal sökande totalt för kursen eller programmet   
   * 
   * @param {Array} result - En array av objekt som innehåller information om kurser och program
   */
  function showDiagram(result) {

      const filterCourse = result.filter(study => study.type === "Kurs"); // Filtrerar efter kurs

      const sortedData = [...filterCourse].sort((a, b) => b.applicantsTotal - a.applicantsTotal); // Sorterar på högst -> lägst antal sökande

      const topSix = sortedData.slice(0, 6); // Plockar ut de 6 kurserna med flest sökande

      const labels = topSix.map(study => study.name); // Skapar ny array med kursernas namn

      const applicants = topSix.map(study => study.applicantsTotal); // Antal sökanden

      const ctx = document.getElementById("myChart");
      new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Antal sökande på kurs',
                  data: applicants,
                  backgroundColor: ["#33CCCC", /* Olika färger på staplarna */
                      "#0854e2",
                      "#eeb006",
                      "#ff00bf",
                      "#00ff00",
                      "#c23c3c"
                  ],
                  hoverBackgroundColor: "#fff"
              }]
          },
          options: { /* För att styla och göra diagrammet responsivt och att det skalas ned */
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                  legend: {
                      labels: {
                          font: {
                              size: 16
                          }
                      }
                  }
              },
              scales: {
                  x: {
                      ticks: {
                          maxRotation: 20,
                          minRotation: 20,
                          autoSkip: false,
                          padding: 0,
                          font: {
                              size: 10
                          }
                      }
                  }
              }

          }
      });

      const filterProgram = result.filter(study => study.type === "Program"); // Filtrerar efter program
      const sortedProgram = [...filterProgram].sort((a, b) => b.applicantsTotal - a.applicantsTotal); // Sorterar på högst -> lägst antal sökande

      const topFive = sortedProgram.slice(0, 5); // Plockar ut de 5 programmen med flest antal sökande

      const labelsCircle = topFive.map(study => study.name); // Programmens namn
      const applicantsCircle = topFive.map(study => study.applicantsTotal); // Sökanden i de 5 programmen
      const circleDiagram = document.getElementById("circle-students");

      new Chart(circleDiagram, {
          type: 'pie',
          data: {
              labels: labelsCircle,
              datasets: [{
                  label: 'Antal sökande på programmet',
                  data: applicantsCircle,
                  hoverBackgroundColor: "#fff"
              }]
          },
          options: { /* För att göra diagrammet responsivt och att det skalas ned */
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                  padding: 1
              },
              plugins: {
                  legend: {
                      labels: {
                          font: {
                              size: 16
                          }
                      }
                  }
              }
          }
      });
  }