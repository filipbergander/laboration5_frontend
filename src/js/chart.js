  "use strict";
  import '/src/sass/main.scss';

  addEventListener("DOMContentLoaded", () => {
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