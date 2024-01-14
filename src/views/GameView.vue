<script>
import "../assets/header.css";
import MovementBlock from "@/components/MovementBlock.vue";
export default {
  name: "GameView",
  components: {MovementBlock},
  data() {
    // Initial data state for the GameView component
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

  // Lifecycle hook: called after the component has been mounted
  mounted() {
    this.game_ID = localStorage.getItem("game_ID");
    this.getGame();

    // Set interval to call getGame every 5 seconds
    this.intervalId = setInterval(this.getGame, 1000);
  },

  methods: {
    // Method to fetch the game data from the API
    getGame() {
      fetch("https://balandrau.salle.url.edu/i3/players/arenas/current", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
      })
          .then((res) => {
            // Handle different HTTP response statuses
            if (res.status === 200) {
              localStorage.setItem("inGame", 'true');
              return res.json();
            } else {
              res.json().then(errorData => {
                console.error("Error while calling the API:", errorData);
                alert("Error while calling the API: " + errorData.message);
              });
            }
          })
          .then((data) => {
            // Set the retrieved game data to the component's state
            this.arena = data[0];
            console.log("Datos recibidos de la API:", data);

            // Check if the game has finished
            if (this.arena.finished) {
              // If the game has finished, clear the interval
              localStorage.setItem("inGame", 'false');
              clearInterval(this.intervalId);

              this.$router.push({ name: "WinLossView" });
            }
          })
    },

    getMapSquareClass(row, col) {
      for (const player of this.arena.players_games) {
        if (player.x_game === col && player.y_game === row) {
          return player.player_ID === localStorage.getItem("player_ID") ? 'map-player-current' : 'map-player-other';
        }
      }
      return 'map-square';
    }
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
    <section class="main-section-game card">
      <div class="hp-bar-container">
        <h1 class = "player1-name">{{ arena.players_games[0].player_ID }}</h1>
        <div v-for="index in this.arena.players_games[0].hp" :key="index" class="hp-current-player"></div>
      </div>

      <div class="map-container" :style="{ gridTemplateColumns: `repeat(${this.arena.size}, 1fr)`}">
        <div v-for="row in this.arena.size" :key="row" class="map-row">
          <div v-for="col in this.arena.size" :key="col" :class="getMapSquareClass(row, col)">
          </div>
        </div>
      </div>

      <div>
        <div v-if="!this.arena.players_games[1]" >
          <h1>No player 2 yet</h1>
        </div>
        <div v-else class="hp-bar-container">
          <h1 class = "player2-name">{{ arena.players_games[1].player_ID }}</h1>
          <div v-for="index in this.arena.players_games[1].hp" :key="index" class="hp-current-player"></div>
        </div>
      </div>
    </section>

    <MovementBlock class = "movement-block"></MovementBlock>
  </main>


  </body>


</template>

<style scoped>
@import "../assets/Columns/CoolColumn.css";

body {
  background-image: url("public/HomeImages/fondo-de-pagina.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.map-container {
  display: grid;
  gap: 2px;
  justify-content: center;
}

.movement-block {
  align-items: center;
  margin-left: 30%;
  margin-right: 30%;
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

.player1-name {
  color: blue;
  margin-right: 5%;
}

.player2-name {
  color: red;
  margin-right: 5%;
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

.map-player-current {
  height: 30px;
  width: 30px;
  background-color: red; /* Color para el jugador 1 */
  border: 4px solid #000;
}

.map-player-other {
  height: 30px;
  width: 30px;
  background-color: blue; /* Color para el jugador 2 */
  border: 4px solid #000;
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
  height: 50%;
  width: 50%;
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