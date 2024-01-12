<script>
import "../assets/header.css";
export default {
  name: "GameView",
  data() {
    return {
      arena: {
        game_ID: "",
        size: 0,
        creation_date: "",
        finished: false,
        HP_max: 0,
        start: false,
        players_games: [
          {
            game_ID: "",
            player_ID: "",
            x_game: 0,
            y_game: 0,
            direction: "",
            hp: 0,
            xp_win: 0,
            coins_win: 0
          }
        ],
      },
    };
  },

  mounted() {
    this.game_ID = localStorage.getItem("game_ID");
    this.getGame();
  },

  methods: {

    getGame() {
      fetch("https://balandrau.salle.url.edu/i3/players/arenas/current", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
      })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              res.json().then(errorData => {
                console.error("Error while calling the API:", errorData);
                alert("Error while calling the API: " + errorData.message);
              });
            }
          })
          .then((data) => {
            this.arena = data[0];
            console.log(data);
            console.log("1. ESTO ES EL THIS ARENA: " + this.arena);
          })
    },

  }

};
</script>

<template>
  <head>
    <title>Game</title>
  </head>

  <body>
  <header class="header-container">
    <nav>
      <router-link to="/MenuPrincipal">
        <img id="game-name" src="public/MainMenuImages/logo.png" alt="Game name image">
      </router-link>
    </nav>
  </header>

  <main class="main-container-game">
    <section class="main-section-game">
      <div class="hp-bar-container">
        <h1>Player 2</h1>
        <div v-for="index in this.arena.players_games[0].hp" :key="index" class="hp-current-player"></div>
      </div>

      <div class="map-container" :style="{ gridTemplateColumns: `repeat(${this.arena.size}, 1fr)`}">
        <div v-for="row in this.arena.size" :key="row" class="map-row">
          <div v-for="col in this.arena.size" :key="col" class="map-square"></div>
        </div>
      </div>

      <div class="hp-bar-container">
        <h1>Player 1</h1>
        <div v-for="index in this.arena.players_games[0].hp" :key="index" class="hp-current-player"></div>
      </div>
    </section>
  </main>

  <footer class="skill-bars-game">
    <section class="attack1-game">
      <img id="attack1-image" src="public/StorePopupImages/attack-image.png" alt="Attack image">
    </section>

    <section class="attack2-game">
      <img id="attack2-image" src="public/StorePopupImages/attack-image.png" alt="Attack image">
    </section>

    <section class="attack3-game">
      <img id="attack3-image" src="public/StorePopupImages/attack-image.png" alt="Attack image">
    </section>
  </footer>

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

.map-container {
  display: grid;
  gap: 1px;
  justify-content: center;
}

.map-square {
  height: 30px;
  width: 30px;
  background-color: #FFDB58;
  border: 4px solid #000;
}

.hp-bar-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.hp-max-player {
  height: 20px; /* Adjust the height of each square */
  width: 10px; /* Adjust the width of each square */
  background-color: #363535; /* Set the background color of each square */
  border: 2px solid #000; /* Add border for better visibility */
  z-index: 1;
}

.hp-current-player {
  height: 20px; /* Adjust the height of each square */
  width: 10px; /* Adjust the width of each square */
  background-color: #f32323; /* Set the background color of each square */
  border: 2px solid #000; /* Add border for better visibility */
  z-index: 2;
}

.map-player {
  height: 20px; /* Adjust the height of each square */
  width: 10px; /* Adjust the width of each square */
  background-color: #ff0000; /* Set the background color of each square */
  border: 2px solid #000; /* Add border for better visibility */
}

.map-player-current {
  height: 10px; /* Adjust the height of each square */
  width: 10px; /* Adjust the width of each square */
  background-color: #48ff00; /* Set the background color of each square */
  border: 2px solid #000; /* Add border for better visibility */
}

#attack1-image,
#attack2-image,
#attack3-image {
  height: 50px;
  width: 50px;
}


.main-section-game {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 10px;
  background: #4CAF50;
  border: 4px solid #000; /* Add border for better visibility */
}

.main-container-game {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.skill-bars-game {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 100px;
}

.attack1-game,
.attack2-game,
.attack3-game {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background: #FFDB58;
}

@media only screen and (max-width: 600px) {


  #attack1-image,
  #attack2-image,
  #attack3-image {
    height: 25px;
    width: 25px;
  }

  .main-section-game {
    margin: 5px;
    padding: 5px;
    border-radius: 20px;
  }

  .main-container-game {
    align-items: center;
  }


  .skill-bars-game {
    gap: 10px;
  }

  .attack1-game,
  .attack2-game,
  .attack3-game {
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    background: #FFDB58;
  }
}

</style>