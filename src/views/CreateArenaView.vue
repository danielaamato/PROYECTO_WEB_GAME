<script>
import "../assets/header.css";
export default {
  name: "CreateArenaView",

  data() {
    return {
      game_ID: "",
      size: "",
      HP_max: "",
    };
  },

  methods: {
    async createArena() {

      const arena = {
        game_ID: this.game_ID,
        size: parseInt(this.size),
        HP_max: parseInt(this.HP_max),
      };

      if (this.size === "" || this.HP_max === "" || this.game_ID === "") {
        alert("Field all fields!");
      } else if (!this.isSizeValid()) {
        alert("The size must be between 2 and 10!");
      } else if (!this.isHPValid()) {
        alert("The HP must be at least 15!");
      } else if (!this.isNameValid()) {
        alert("The game ID must have from 1 to 20 characters!");
      } else {
        try {
          const response = await fetch(
              "https://balandrau.salle.url.edu/i3/arenas",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(arena),
              }
          );

          if (response.ok) {
            const result = await this.postArena(arena);
            if (result) {
              const {token} = result.response;

              localStorage.setItem("token", token);
              localStorage.setItem("game_ID", arena.game_ID);
              localStorage.setItem("tokenBearer", "Bearer " + localStorage.getItem("token"));

              this.$router.push({
                name: "GameView",
                props: {
                  game_ID: this.game_ID,
                  size: this.size,
                  HP_max: this.HP_max,
                },
              });
            } else {
              alert(
                  "Failed to create arena because the game ID is already in use. Please try again."
              );
            }
          } else {
            await response.text();
          }
        } catch (error) {
          console.error(error);
          alert(
              "Failed to register because this player ID is already registered. Please try again."
          );
        }
      }
    },

    isNameValid() {
      return this.game_ID.length < 21;
    },

    isSizeValid() {
      const size = parseInt(this.size);
      return size >= 2 && size <= 10;
    },

    isHPValid() {
      const HP_max = parseInt(this.HP_max);
      return HP_max >= 15;
    },
  },

  async postArena(arena) {
    try {
      const response = await fetch("https://balandrau.salle.url.edu/i3/arenas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arena),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (response.status === 200) {
          return { response: responseData };
        } else {
          return { response: response.statusText };
        }
      } else {
        switch (response.status) {
          case 404:
            alert("Wrong game name, size or HP");
            return null;
          default:
            this.$router.push({name: "HomeView"});
            alert("Error while using the API");
            return null;
        }
      }
    } catch (error) {
      console.error(error);
      return { response: "Error occurred while processing the request." };
    }
  },
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
      <div class="header-space"></div>
      <nav>
        <router-link to="/">
          <img id="settings-image" src="public/InfoPlayerImages/icono-ajustes.webp" alt="Settings image">
        </router-link>
      </nav>
    </header>

    <main class="main-container-create-arena">
      <section class="main-space-create-arena"></section>
        <form class="arena-section-create-arena" @submit.prevent="createArena()">
          <input v-model="game_ID" type="text" id="arena-id" placeholder="Game Name" class="arena-input-create-arena">
          <input v-model="size" type="number" id="arena-size" placeholder="Size" class="arena-input-create-arena">
          <input v-model="HP_max" type="number" id="arena-hp" placeholder="HP" class="arena-input-create-arena">
          <button type="submit" id="create-arena-button" class="start-button-create-arena">Start</button>
        </form>
    </main>

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

.start-button-create-arena {
  background-color: sandybrown;
  border-style: solid;
  border-width: 3px;
}

.arena-section-create-arena {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFDB58;
  width: 300px;
  padding: 10px;
  border-style: solid;
  border-width: 5px;
}

.arena-input-create-arena {
  width: 200px;
  height: 50px;
  margin: 10px;
  font-size: 20px;
  text-align: center;
  border-style: solid;
  border-width: 5px;
  border-color: #181818;
}

.main-space-create-arena {
  height: 150px;
}

.main-container-create-arena {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (max-width: 600px) {

  .arena-section-create-arena {
    width: 90%;
    border-radius: 15px;
  }

  .arena-input-create-arena {
    width: 80%;
    margin: 5px;
    font-size: 16px;
  }

  .main-space-create-arena {
    height: auto;
  }

  .main-container-create-arena {
    align-items: center;
  }
}

</style>
