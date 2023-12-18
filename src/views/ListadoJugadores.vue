<script>
import "../assets/listadojugadores.css";
export default {
  name: "ListadoJugadores",

  data()
  {
    return {
      playersList: [],
      jugadorBuscado: "",
      jugadoresFiltrados: [],
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
  },

  methods: {
    getPlayersList() {
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
      const busqueda = this.jugadorBuscado.toLowerCase();
      this.jugadoresFiltrados = this.playersList.filter((player) => player.player_ID.toLowerCase().includes(busqueda));
      console.log(this.jugadoresFiltrados);
    },
  }
};
</script>

<template>

    <router-link to="/MenuPrincipal" class="game-title">Battle Arena</router-link>
    <h2 style="
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 30px;">Listado de Jugadores</h2>

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
            <td>{{ player.player_ID }}</td>
            <td>{{ player.xp }}</td>
            <td>{{ player.level }}</td>
            <td>{{ player.coins }}</td>
            <td><img :src="player.img" alt="Imagen del jugador" class="player-image"></td>
          </tr>
          </tbody>
        </table>
    </div>

    <div class=player-details-small-screen>
      <div v-if="jugadoresFiltrados.length === 0">
        <p>Jugador inexistente</p>
      </div>
      <div v-for="player in jugadoresFiltrados" :key="player.player_ID" class="player-details-container">
        <p><strong>Nombre:</strong> {{ player.player_ID }}</p>
        <p><strong>XP:</strong> {{ player.xp }}</p>
        <p><strong>Nivel:</strong> {{ player.level }}</p>
        <p><strong>Monedas:</strong> {{ player.coins }}</p>
        <p><strong>Imagen:</strong> <img :src="player.img" alt="Imagen del jugador" class="player-image"></p>
      </div>
    </div>
  </section>

</template>

<style scoped></style>