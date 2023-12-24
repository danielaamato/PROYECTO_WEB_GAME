<script>
import "../assets/header.css";
export default {
  name: "GameView",
  props: {
    game_ID: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    HP_max: {
      type: Number,
      required: true,
    },
  },
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
    <div class="header-space"></div>
    <nav>
      <router-link to="/">
        <img id="settings-image" src="public/InfoPlayerImages/icono-ajustes.webp" alt="Settings image">
      </router-link>
    </nav>
  </header>

  <main class="main-container-game">

    <section class="main-section-game">
      <section class="player2-section-game">
        <img id="hp-bar-player2" src="public/InfoPlayerImages/hp-bar.png" alt="Player 2 hp bar">
      </section>

      <section class="game-grid-game">
        <img id="arena-image" src="public/MainMenuImages/arena-image.png" alt="Arena image">
      </section>

      <section class="player1-section-game">
        <img id="hp-bar-player1" src="public/InfoPlayerImages/hp-bar.png" alt="Player 1 hp bar">
      </section>
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

  <div class="props-info">
    <p>Game ID: {{ game_ID }}</p>
    <p>Size: {{ size }}</p>
    <p>HP: {{ HP_max }}</p>
  </div>

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

#hp-bar-player2,
#hp-bar-player1 {
  height: 50px;
  width: 150px;

}

#arena-image {
  height: 300px;
  width: 500px;
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
  border-radius: 50px;
  background: #FFDB58;
}

.main-container-game {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.player2-section-game,
.player1-section-game {
  display:  flex;
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
  #hp-bar-player2,
  #hp-bar-player1 {
    height: 30px;
    width: 80px;
  }

  #arena-image {
    height: 150px;
    width: 250px;
  }

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

  .player2-section-game,
  .player1-section-game {
    flex-direction: column;
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