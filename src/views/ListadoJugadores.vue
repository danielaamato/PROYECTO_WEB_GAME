<script>
import "../assets/main.css";
export default {
  name: "ListadoJugadores",

  data()
  {
    return {
      playersList: [],
      jugadorBuscado: "",
      jugadoresFiltrados: [],
      isMobileView: window.innerWidth <= 503,
    }
  },

  mounted()
  {
    // If user has not already logged in go to SignIn
    if (localStorage.getItem("token") == null)
    {
      this.$router.push({ name: "HomeView" });
    }
    else
    {
      this.getPlayersList();
    }

    // Escuchar cambios en el tamaño de la ventana para actualizar isMobileView
    window.addEventListener("resize", this.handleWindowSizeChange);
  },

  methods: {
    // Método para manejar cambios en el tamaño de la ventana
    handleWindowSizeChange() {
      this.isMobileView = window.innerWidth <= 503;
    },

    getPlayersList() {
      //Request de todos los jugadores
      fetch("https://balandrau.salle.url.edu/i3/players/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
      })
          // Check if response was correct
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
            this.chargeTable(data)
          });
    },
    chargeTable(data)
    {
      if (data)
      {
        this.playersList = data.sort((a, b) => b.xp - a.xp);
        this.jugadoresFiltrados = [...this.playersList];
      }
      else
      {
        console.error("Data is undefined or has unexpected structure.");
      }
    },
    searchPlayer()
    {
      //Busqueda de jugador
      const busqueda = this.jugadorBuscado.toLowerCase();
      this.jugadoresFiltrados = this.playersList.filter((player) => player.player_ID.toLowerCase().includes(busqueda));
    },
    redirectToHistorial(playerId)
    {
      this.$router.push({ name: 'HistorialJugadores', query: { playerId: playerId } });
    },
  }
};
</script>

<template>

  <div>
    <router-link to="/MenuPrincipal" class="game-title">Battle Arena</router-link>
    <h2 style="
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 30px;
font-family: Asimov, serif;
        ">Listado de Jugadores</h2>

  <section class="listadoPlayers">
    <input type="text" v-model="jugadorBuscado" @input="searchPlayer" placeholder="Buscar Jugador...">
    <div class="tableContainer">
        <table class="tableListing">
          <thead>
          <tr>
            <th>Nombre</th>
            <th>XP</th>
            <th>Nivel</th>
            <th>Monedas</th>
            <th>Imagen</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="jugadoresFiltrados.length === 0">
            <td colspan="5">Jugador inexistente</td>
          </tr>
          <tr v-for="player in jugadoresFiltrados" :key="player.player_ID">
            <td>{{ player.player_ID }}
              <button id="details" @click="redirectToHistorial(player.player_ID)">Ver Detalles</button>
            </td>
            <td>{{ player.xp }}</td>
            <td>{{ player.level }}</td>
            <td>{{ player.coins }}</td>
            <!--<td><img :src="player.img" alt="Imagen del jugador" class="player-image"></td>-->
          </tr>
          </tbody>
        </table>
    </div>


    <div class=player-details-small-screen v-if="isMobileView">
      <div v-if="jugadoresFiltrados.length === 0">
        <p>Jugador inexistente</p>
      </div>
      <div v-for="player in jugadoresFiltrados" :key="player.player_ID" class="player-details-container">
        <p><strong>Nombre:</strong> {{ player.player_ID }}
          <button id="details" @click="redirectToHistorial(player.player_ID)">Ver Detalles</button></p>
        <p><strong>XP:</strong> {{ player.xp }}</p>
        <p><strong>Nivel:</strong> {{ player.level }}</p>
        <p><strong>Monedas:</strong> {{ player.coins }}</p>
        <img :src="player.img" alt="Imagen del jugador" class="player-image">
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