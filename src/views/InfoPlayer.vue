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
    }
  },

  mounted()
  {
    // Llama a la función getInfoPlayer cuando el componente ha sido montado
    this.getInfoPlayer();
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
          .then((data) => {
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
      }
      else
      {
        console.error("Data is undefined or has unexpected structure.");
      }
    }
  }
};
</script>

<template>
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

      <div id="ataques">
        <div id="backpack-at">Ataques Backpack
        </div>
        <div id="next-attacks">Proximos Ataques
        </div>
      </div>
    </div>
</template>

<style scoped></style>