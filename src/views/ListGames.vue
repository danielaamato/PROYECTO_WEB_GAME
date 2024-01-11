<script>
import "../assets/main.css";
import "../assets/header.css";
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
        this.gamesFiltrados = [...this.gamesList];
      }
      else {
        console.error("Data is undefined or has unexpected structure.");
      }
    },


    searchGame() {
      const busqueda = this.gameBuscado.toLowerCase();
      this.gamesFiltrados = this.gamesList.filter((game) => game.game_ID.toLowerCase().includes(busqueda));
      console.log(this.gamesFiltrados);
    },

    joinArena(game) {
      if (game.start === false && game.finished === false) {
        this.postEnterGame(game);
        this.$router.push({ name: 'GameView', query: { game_ID: game.game_ID } });
      } else {
        alert("The game has already started or finished!");
      }

    },

    postEnterGame(game) {
      fetch("https://balandrau.salle.url.edu/i3/arenas/" + game.game_ID + "/play", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          id: game.game_ID,
          Bearer: localStorage.getItem("token"),
        },
      })
          .then((res) => {
            if (res.status === 200) {
              console.log("Arena joined");
              this.$router.push({name: "GameView"});
            }
            else if (res.status === 403){
              alert("You are already in a game!");
            }
            else {
              res.json().then(errorData => {
                console.error("Error while calling the API:", errorData);
                alert("Error while calling the API: " + errorData.message);
              });
            }
          })
    },

  }
};
</script>

<template>

  <head>
    <title>Create Arena</title>
  </head>

  <body>
  <header class="header-container">
    <nav>
      <router-link to="/MenuPrincipal">
        <img id="game-name" src="public/MainMenuImages/logo.png" alt="Game name image">
      </router-link>
    </nav>
  </header>

    <section class="listadoPlayers">
      <input type="text" v-model="gameBuscado" @input="searchGame" placeholder="Buscar arena...">
      <div class="tableContainer">
        <table class="tableListing">
          <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>HP</th>
            <th>Creation Date</th>
            <th>Started</th>
            <th>Finished</th>
            <th>Join</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="gamesFiltrados.length === 0">
            <td colspan="5">Arena inexistente</td>
          </tr>
          <tr v-for="game in gamesFiltrados" :key="game.game_ID">
            <td>{{ game.game_ID }}</td>
            <td>{{ game.size }}</td>
            <td>{{ game.HP_max }}</td>
            <td>{{ game.creation_date }}</td>
            <td>{{ game.start }}</td>
            <td>{{ game.finished }}</td>
            <td>
              <button id="details" @click="joinArena(game)">Join</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>


      <div class=player-details-small-screen v-if="isMobileView">
        <div v-if="gamesFiltrados.length === 0">
          <p>Arena inexistente</p>
        </div>
        <div v-for="game in gamesFiltrados" :key="game.game_ID" class="player-details-container">
          <p><strong>Nombre:</strong> {{ game.game_ID }}</p>
          <p><strong>Size:</strong> {{ game.size }}</p>
          <p><strong>HP:</strong> {{ game.HP_max }}</p>
          <p><strong>Creation Date:</strong> {{ game.creation_date }}</p>
          <p><strong>Started:</strong> {{ game.start }}</p>
          <p><strong>Finished:</strong> {{ game.finished }}</p>
          <p><strong><button id="details" @click="joinArena(game)">Join</button></strong></p>
        </div>
      </div>
    </section>

  </body>

</template>

<style scoped>

body {
  background-image: url("public/HomeImages/fondo-de-pagina.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}

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