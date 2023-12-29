<script>
import "../assets/main.css";
export default {
  name: "ListGames",

  data() {
    return {
      gamesList: [],
      gameBuscado: "",
      gamesFiltrados: [],
      isMobileView: window.innerWidth <= 503,
    }
  },

  mounted() {
    // If user has not already logged in go to SignIn
    if (localStorage.getItem("token") == null) {
      this.$router.push({ name: "HomeView" });
    }
    else {
      this.getArenasList();
    }

    // Escuchar cambios en el tamaño de la ventana para actualizar isMobileView
    window.addEventListener("resize", this.handleWindowSizeChange);
  },

  methods: {
    // Método para manejar cambios en el tamaño de la ventana
    handleWindowSizeChange() {
      this.isMobileView = window.innerWidth <= 503;
    },

    getArenasList() {
      fetch("https://balandrau.salle.url.edu/i3/arenas/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
      })
          // Check if response was correct
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
            else {
              this.$router.push({name: "HomeView"});
              alert("Error while calling the API");
              return null;
            }
          })
          .then((data) => {
            this.chargeTable(data)
          });
    },

    chargeTable(data) {
      if (data) {
        this.gamesList = data;
        //this.gamesFiltrados = [...this.gamesList];
      }
      else {
        console.error("Data is undefined or has unexpected structure.");
      }
    },

    /*
    searchGame() {
      const busqueda = this.gameBuscado.toLowerCase();
      this.gamesFiltrados = this.gamesList.filter((game) => game.game_ID.toLowerCase().includes(busqueda));
      console.log(this.gamesFiltrados);
    },

    redirectToHistorial(gameId) {
      this.$router.push({ name: 'HistorialPartidas', query: { gameId: gameId } });
    },

     */
  }
};
</script>

<template>

  <div class="imgbackg" alt="Background">
    <router-link to="/MenuPrincipal" class="game-title">Battle Arena</router-link>
    <h2 style="
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 30px;
font-family: Asimov, serif;
        ">Listado de Jugadores</h2>

    <section class="listadoPlayers">
      <div class="tableContainer">
        <table class="tableListing">
          <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>HP</th>
            <th>Creation Date</th>
            <th>Finished</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="gamesList.length === 0">
            <td colspan="5">Arena inexistente</td>
          </tr>
          <tr v-for="game in gamesList" :key="game.game_ID">
            <td>{{ game.game_ID }}</td>
            <td>{{ game.size }}</td>
            <td>{{ game.HP_max }}</td>
            <td>{{ game.creation_date }}</td>
            <td>{{ game.finished }}</td>
          </tr>
          </tbody>
        </table>
      </div>


      <div class=player-details-small-screen v-if="isMobileView">
        <div v-if="gamesFiltrados.length === 0">
          <p>Arena inexistente</p>
        </div>
        <div v-for="game in gamesFiltrados" :key="game.game_ID" class="player-details-container">
          <p><strong>Nombre:</strong> {{ game.game_ID }}
            <button id="details" @click="redirectToHistorial(game.game_ID)">Ver Detalles</button></p>
          <p><strong>Size:</strong> {{ game.size }}</p>
          <p><strong>HP:</strong> {{ game.HP_max }}</p>
          <p><strong>Creation Date:</strong> {{ game.creation_date }}</p>
          <p><strong>Finished:</strong> {{ game.finished }}</p>
        </div>
      </div>
    </section>
  </div>

</template>

<style scoped>

input
{
  padding: 0.5%;
  position: relative;
  width: 90%;
  margin-bottom: 2%;
}

.tableListing
{
  position: absolute;
  left: 3%;
  width: 95%;
  height: 100%;
  background-color: darkkhaki;
}

.tableListing th {
  background-color: lightblue;
  position: sticky;
  top: 0;
}

th, td
{
  padding: 7px;
  text-align: center;
  border: 4px solid #000;
}

.listadoPlayers
{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
}

#details
{
  background-color: sandybrown;
}

.player-image {
  width: 50px;
  height: 50px;
}

.tableContainer
{
  overflow-x: auto;
  overflow-y: auto;
  display: flex;
  position: relative;
  height: 510px;
  width: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}

@media (max-width: 503px)
{
  .tableContainer
  {
    display: none;
  }

  .player-details-small-screen
  {
    margin-bottom: 30px;
    display: flex;
    background-color: #FFDB58;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    position: absolute;
    max-height: 62%;
    overflow-y: auto;
    width: 80%;
    top: 32%;
  }

  .player-details-container
  {
    position: relative;
  }

  .player-details-container::after
  {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #000;
    margin-bottom: -3%;
  }
}

</style>