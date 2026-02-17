  "use strict";
  import '/src/sass/main.scss';

  addEventListener("DOMContentLoaded", async() => {
      fetchStatistic();

  });
  /**
   * Hämtar in data från externt API.
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
   * Tar emot data från API:et för antal sökande och skapar ett stapeldiagram och cirkeldiagram utifrån datan
   * @param {array} result 
   */
  function showDiagram(result) {

      const filterCourse = result.filter(item => item.type === "Kurs");

      const sortedData = [...filterCourse].sort((a, b) => b.applicantsTotal - a.applicantsTotal);

      const topSix = sortedData.slice(0, 6);

      const labels = topSix.map(item => item.name);

      const applicants = topSix.map(item => item.applicantsTotal);

      const ctx = document.getElementById("myChart");
      new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Antal sökande på kurs',
                  data: applicants
              }]
          },
          options: { /* För att göra diagrammet responsivt och att det skalas ned */
              responsive: true,
              maintainAspectRatio: false
          }
      });

      const filterProgram = result.filter(item => item.type === "Program");
      const sortedProgram = [...filterProgram].sort((a, b) => b.applicantsTotal - a.applicantsTotal);

      const topFive = sortedProgram.slice(0, 5);

      const labelsCircle = topFive.map(item => item.name);
      const applicantsCircle = topFive.map(item => item.applicantsTotal);
      const circleDiagram = document.getElementById("circle-students");

      new Chart(circleDiagram, {
          type: 'doughnut',
          data: {
              labels: labelsCircle,
              datasets: [{
                  label: 'Antal sökande på programmet',
                  data: applicantsCircle
              }]
          },
          options: { /* För att göra diagrammet responsivt och att det skalas ned */
              responsive: true,
              maintainAspectRatio: false
          }
      });
  }