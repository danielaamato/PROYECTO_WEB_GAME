<script>
import "../assets/infoplayer.css";
export default
{
  name: "SignIn",

  data()
  {
    return {
      player_ID: "",
      img: "",
      xp: 0,
      level: 0,
      coins: 0,
      attackList: [],
      equippedAttacks: [],
    }
  },

  mounted()
  {
    // Llama a la función getInfoPlayer cuando el componente ha sido montado
    // If user has not already logged in go to SignIn
    if (localStorage.getItem("token") == null)
    {
      this.$router.push({ name: "HomeView" });
    }
    else
    {
      this.getInfoPlayer();
    }
  },

  methods: {
    getInfoPlayer()
    {
      //Get player ID
      let playerID = null;
      playerID = localStorage.getItem("player_ID");

      fetch("https://balandrau.salle.url.edu/i3/players/" + playerID, {
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
            this.chargeProfile(data)
          });
    },
    chargeProfile(data)
    {
      if(data)
      {
        this.player_ID = data.player_ID;
        this.img = data.img;
        this.coins = data.coins;
        this.xp = data.xp;
        this.level = data.level;
        this.chargeAttacks();
      }
      else
      {
        console.error("Data is undefined or has unexpected structure.");
      }
    },

    chargeAttacks()
    {
      fetch("https://balandrau.salle.url.edu/i3/players/attacks", {
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
            this.attackList = data;
            this.equippedAttacks = data.filter((ataque) => ataque.equipped);
          });
    },
  }
};
</script>

<template>
  <router-link to="/MenuPrincipal" class="game-title">Battle Arena</router-link>
    <div class="imgbackg4" alt="Background">
      <div id="perfil-container">
        <h3 class="perfil-jugador">Perfil del Jugador</h3>
        <div id="idperfil">
          <img id="imagen-perfil" v-bind:src="img" alt="Imagen de perfil">
          <h2 class="nombre-perfil">Nombre del Jugador: {{player_ID}}</h2>
        </div>
        <div id="idinfo">
          <p id="nivel-perfil">Nivel: {{level}}</p>
          <p id="xp">XP: {{xp}}</p>
          <p id="monedas">Monedas: {{coins}}</p>
        </div>
        <router-link to="/EliminarPlayer">
          <img id="imagen-ajustes" src="../../public/InfoPlayerImages/icono-ajustes.webp" alt="Imagen de ajustes">
        </router-link>
      </div>

      <div id="backpack-at"><strong><u style="
        margin-top: 10px;
        margin-bottom: 10px">Ataques Backpack</u></strong>
        <section class="attackTable">
          <div v-if="attackList.length === 0">
            <p>Sin Ataques en el Backpack</p>
          </div>
          <div v-for="ataque in attackList" :key="ataque.attack_ID" class="attack-container">
            <p><strong>Nombre:</strong> {{ ataque.attack_ID }}</p>
            <p><strong>Posiciones:</strong> {{ ataque.positions }}</p>
            <p><strong>Fuerza:</strong> {{ ataque.power }}</p>
            <p><strong>¿Equipado?:</strong> {{ ataque.equipped ? 'Si' : 'No' }}</p>
            <p><strong>¿En oferta?:</strong> {{ ataque.on_sale ? 'Si' : 'No' }}</p>
          </div>
        </section>
      </div>
        <div id="next-attacks"><strong><u style="
        margin-top: 10px;
        margin-bottom: 10px">Ataques Equipados</u></strong>
          <section class="attackTable">
            <div v-if="equippedAttacks.length === 0">
              <p>Sin Ataques equipados para proximos juegos</p>
            </div>
            <div v-for="ataque in equippedAttacks" :key="ataque.attack_ID" class="attack-container">
              <p><strong>Nombre:</strong> {{ ataque.attack_ID }}</p>
              <p><strong>Posiciones:</strong> {{ ataque.positions }}</p>
              <p><strong>Fuerza:</strong> {{ ataque.power }}</p>
              <p><strong>¿Equipado?:</strong> {{ ataque.equipped ? 'Si' : 'No' }}</p>
              <p><strong>¿En oferta?:</strong> {{ ataque.on_sale ? 'Si' : 'No' }}</p>
            </div>
          </section>
        </div>
      </div>
</template>

<style scoped></style>