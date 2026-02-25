  /**
   * @file Laboration 5 – Frontend baserad Webbutveckling
   * 
   * Denna applikation hämtar statistik över kurser och program på MIUN.
   * Projektet är byggt med Vite och dokumenterat med JSDoc.
   */

  "use strict";
  import { plugins } from 'chart.js';
  import '/src/sass/main.scss';
  import { callback } from 'chart.js/helpers';


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
                              size: 14
                          }
                      }
                  }
              },
              scales: {
                  y: {
                      beginAtZero: true
                  },
                  x: {
                      ticks: {
                          maxRotation: 30,
                          minRotation: 30,
                          autoSkip: false,
                          padding: 0,
                          font: (ctx) => { // Fontstorlek skiljer sig på labels vid olika bredder på diagrammet, vilket beror på skärmstorleken som används
                              const width = ctx.chart.width;
                              if (width < 400) return { size: 8 };
                              return { size: 12 }
                          }, // Funktion för att göra bindestreck på labels som är längre än 17 bokstäver
                          callback: function(index) {
                              const label = this.getLabelForValue(index);
                              const maxLength = 31;

                              if (label.length > maxLength) {
                                  return label.match(/.{1,31}/g).map((segment, i, arr) => {
                                      if (
                                          i < arr.length - 1 &&
                                          !segment.endsWith(' ') &&
                                          !arr[i + 1].startsWith(' ')
                                      ) {
                                          return segment.trimEnd() + '-';
                                      }
                                      return segment.trim();
                                  });
                              }
                              return label;
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
                          font: (ctx) => { // Fontstorlek skiljer sig på labels vid olika bredder på diagrammet, vilket beror på skärmstorleken som används
                              const width = ctx.chart.width;
                              if (width < 400) return { size: 12 };
                              return { size: 14 }
                          }, // Funktion för att göra bindestreck på labels som är längre än 17 bokstäver
                      }
                  }
              }
          }
      });
  }