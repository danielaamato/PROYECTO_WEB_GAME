<script>
import "../assets/main.css";
import TopBar from "@/components/TopBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "HistorialJugadores",
  components: {SideBar, TopBar},

  data() {
    return {
      playerID: localStorage.getItem("player_ID"),
      isMobile: window.innerWidth <= 700, // Inicializa según el ancho de la ventana
      games_played: 0,
      games_won: 0,
      gamesHistorial: [],
      games_player: [],
    }
  },

  methods:{
    getPlayerHistorial()
    {
      fetch("https://balandrau.salle.url.edu/i3/players/" + this.$route.query.playerId + "/games/finished", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
      })
          .then((res) =>
          {
            if (res.status === 200)
            {
              return res.json();
            }
            else
            {
              this.$router.push({name: "HomeView"});
              alert("Error while calling the API");
              return null;
            }
          })
          .then((data) =>
          {
            this.gamesHistorial = data;
            console.log(this.gamesHistorial);
          });
    },

    getPlayerStats()
    {
      fetch("https://balandrau.salle.url.edu/i3/players/" + this.$route.query.playerId + "/statistics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
      })
          .then((res) =>
          {
            if (res.status === 200)
            {
              return res.json();
            }
            else
            {
              this.$router.push({name: "HomeView"});
              alert("Error while calling the API");
              return null;
            }
          })
          .then((data) =>
          {
            this.games_won = data.games_won;
            this.games_played = data.games_played;
          });
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 700;
    }
  },
  computed: {
    // Calcula el porcentaje de juegos ganados
    winPercentage()
    {
      return this.games_played === 0 ? 0 : (this.games_won / this.games_played) * 100;
    },
  },

  created()
  {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // Llama al inicio para establecer el estado inicial
    this.getPlayerStats();
    this.getPlayerHistorial();
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<template>
  <!-- Muestra TopBar en pantallas no móviles -->
  <TopBar v-if="!isMobile"></TopBar>
  <!-- Muestra SideBar en pantallas móviles -->
  <SideBar v-if="isMobile"></SideBar>

  <div class="imgbackg" alt="Background">
  <h2 id="historialTitle">Historial de {{this.playerID}}</h2>


  <section class="historialPlayers">
    <table class="tableHistoring">
      <tr>
        <th>Juegos Finalizados</th>
        <th>Porcentaje de Juegos Ganados</th>
      </tr>
      <tr v-if="gamesHistorial.length === 0">
        <td colspan="5">No ha participado en ningun juego</td>
      </tr>
      <tr v-for="game in gamesHistorial" :key="game.game_ID" class="player-historial-container">
        <td>Game ID: {{ game.game_ID }}</td>
        <td>Game Size: {{ game.size }}</td>
        <td>Game Creation Date: {{ game.creation_date }}</td>
        <td>Max HP: {{game.HP_max}}</td>
        <td>
          <ul>
            <li v-for="playerGame in game.players_games" :key="playerGame.player_ID">
              Player ID: {{ playerGame.player_ID }}, Game ID: {{ playerGame.game_ID }},
              Winner: {{ playerGame.winner }}, XP Won: {{ playerGame.xp_win}}, Coins Won: {{ playerGame.coins_win}}
            </li>
          </ul>
        </td>
      </tr>
      <td>{{ winPercentage.toFixed(2) }}%</td>
    </table>
  </section>
  </div>

</template>

<style scoped>

.tableHistoring
{
  position: relative;
  left: 0%;
  width: 95%;
  background-color: darkkhaki;
}

.historialPlayers
{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
}

#buttonBackToList
{
  position: relative;
  right: 41%;
  bottom: 6%;
  font-family: Asimov, serif;
  font-size: 100%;
  background-color: darkorange;
}

.player-historial-container
{
  position: relative;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  max-height: 62%;
  overflow-y: auto;
  top: 32%;
}

.tableHistoring th,
.tableHistoring td {
  padding: 4px;
  border: 1px solid #000; /* Añade borde a las celdas de la tabla */
  text-align: center;
}

.tableHistoring th {
  background-color: lightblue; /* Color de fondo para la fila de encabezado */
}

#historialTitle
{
  margin-top: 20px;
  margin-bottom: 0px;
  margin-left: 30px;
  font-family: Asimov, serif;
  font-size: 200%;
}

@media (max-width: 500px)
{
 #historialTitle{
   font-size: 192%;
   margin-top: 42px;
 }

  #buttonBackToList
  {
    position: relative;
    right: 30%;
    bottom: 9%;
    font-family: Asimov, serif;
    font-size: 98%;
    background-color: darkorange;
  }
}

</style>