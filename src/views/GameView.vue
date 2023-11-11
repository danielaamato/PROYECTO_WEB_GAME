<script>
import "../assets/game.css";
export default {
  name: "GameView",
};
</script>

<template>
  <div class="grid-container">
    <div class="game-name">Game Name</div>
    <div class="space"></div>
    <div class="space">
      <router-link to="/WinLossView">Go to WinLossView</router-link>
    </div>

    <div class="space"></div>
    <div class="grid-map">
      <div class="grid-hp-bar-player2">
        <div class="space"></div>
        <div class="player2-text">Player 2</div>
        <div class="player2-hp-bar">HP bar</div>
      </div>
      <div class="map">Map</div>
      <div class="grid-hp-bar-player1">
        <div class="player1-text">Player 1</div>
        <div class="player1-hp-bar">HP bar</div>
        <div class="space"></div>
      </div>
      <div class="space"></div>
    </div>
    <div class="space"></div>

    <div class="space"></div>
    <div class="grid-atacks">
      <div class="atack1">atack1</div>
      <div class="atack2">atack2</div>
      <div class="atack3">atack3</div>
    </div>
    <div class="space"></div>

  </div>


</template>

<style scoped></style>