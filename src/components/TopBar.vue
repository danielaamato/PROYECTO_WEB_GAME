<script>
export default {
  name: "TopBar",
  props: {
    showUserInfo: {
      type: Boolean,
      default: true
    },
    isGameView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      player_ID: "",
      img: "",
      level: 0,
      coins: 0
    };
  },
  created() {
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
    endGame() {
      fetch("https://balandrau.salle.url.edu/i3/arenas/" + localStorage.getItem("game_ID") + "/play", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
      })
          .then((res) => {
            // Handle different HTTP response statuses
            if (res.status === 204) {
              localStorage.setItem("inGame", 'false');
              this.$router.push({ name: "WinLossView" });
              return res.json();
            } else {
              res.json().then(errorData => {
                console.error("Error while calling the API:", errorData);
                alert("Error while calling the API: " + errorData.message);
              });
            }
          })
    },

    getInfoPlayer() {
      //Get player ID
      let playerID = null;
      playerID = localStorage.getItem("player_ID");

      fetch("https://balandrau.salle.url.edu/i3/players/" + playerID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        }
      })
        .then(response => response.json())
        .then(data => {
          this.player_ID = data.player_ID;
          this.img = data.img;
          localStorage.setItem("level", data.level);
          localStorage.setItem("coins", data.coins);
        })
        .catch(error => console.error("Error:", error));
    }
  }
};
</script>

<template>
  <header class="top-bar">
    <!-- Título del juego / Botón de inicio -->
    <router-link class="game-title" to="/MenuPrincipal">Battle Arena</router-link>

    <!-- Información del usuario para pantallas de ordenador -->
    <nav class="user-info desktop" v-if="showUserInfo">
      <img v-bind:src="img" alt="Foto de Perfil" class="profile-pic">
      <span class="username">{{ player_ID }}</span>
      <div class="coins">
        <div class="coins-icon"></div>
        <span>{{ coins }}</span>
      </div>
      <span class="experience">Nivel: {{ level }}</span>
    </nav>

    <!-- Botón de Perfil o Quit para pantallas de ordenador -->
    <router-link
        :to="isGameView ? '/MenuPrincipal' : '/InfoPlayer'"
        class="nav-button desktop"
        v-if="showUserInfo"
        @click="isGameView ? endGame() : null"
    >
      {{ isGameView ? 'Salir' : 'Perfil' }}
    </router-link>
  </header>
</template>

<style scoped>
  /* Estilos generales para la barra superior */
  .top-bar {
    background-color: #333;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1%;
  }

  /* Estilos para el título del juego */
  .game-title {
    text-decoration: none;
    color: #FFDB58;
    font-size: 2em;
    font-weight: bold;
  }

  /* Estilos para la información del usuario en pantallas de ordenador */
  .user-info.desktop {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .user-info.desktop > span, .user-info.desktop > div {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .profile-pic, .coins-icon {
    border-radius: 50%;
    object-fit: cover;
    width: 40px;
    height: 40px;
  }

  .coins-icon {
    background-image: url('../../public/MainMenuImages/coins-icon.png');
    background-size: cover;
    background-repeat: no-repeat;
  }

  .nav-button.desktop {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
</style>
