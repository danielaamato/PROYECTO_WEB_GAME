<script>
import "../assets/header.css";
export default {
  name: "WinLossView",

  mounted() {
    // If the game has finished, clear the interval
    localStorage.setItem("inGame", 'false');
  },
};
</script>

<template>
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

    <main class="main-container-win-loss">
      <section class="main-section-win-loss">
        <section class="main-section1-win-loss">
          <h3>Win/Loss</h3>
        </section>

        <section class="main-section2-win-loss">
          <h3>XP</h3>
        </section>

        <section class="main-section3-win-loss">
          <h3>Rewards</h3>
          <h3>Stats</h3>
        </section>

        <section class="main-section4-win-loss">
          <img id="attack-image-win-loss" src="public/StorePopupImages/attack-image.png" alt="Attack image">
          <img id="coins-image-win-loss" src="public/MainMenuImages/coins-icon.png" alt="Coins Image">
          <h3>Winrate</h3>
        </section>

        <section class="main-section5-win-loss">
          <router-link to="/MenuPrincipal">
            <button id="continue-button-win-loss" class="continue-button-win-loss">Continue</button>
          </router-link>
        </section>

      </section>
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


#attack-image-win-loss {
  height: 100px;
  width: 100px;
}

#coins-image-win-loss {
  height: 100px;
  width: 100px;
}

.main-container-win-loss {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.main-section-win-loss {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFDB58;
  border-radius: 20px;
  width: 80%;
  height: 80%;
  padding: 10px;
}

.main-section1-win-loss {
  display: flex;
}

.main-section2-win-loss {
  display: flex;
}

.main-section3-win-loss {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 20%;
}

.main-section4-win-loss {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 20%;
}

.main-section5-win-loss {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
}

.continue-button-win-loss {


}

@media only screen and (max-width: 600px) {
  #attack-image-win-loss,
  #coins-image-win-loss {
    height: 50px;
    width: 50px;
  }

  .main-section-win-loss {
    width: 90%;
    height: auto;
    padding: 5px;
  }

  .main-section3-win-loss,
  .main-section4-win-loss,
  .main-section5-win-loss {
    flex-direction: column;
    align-items: center;
    height: auto;
  }

  .continue-button-win-loss {

  }
}




</style>