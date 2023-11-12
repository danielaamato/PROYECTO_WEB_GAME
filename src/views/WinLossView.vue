<script>
import "../assets/win-loss.css";
export default {
  name: "WinLossView",
};
</script>

<template>
  <div class="imgbackg" alt="Background">
    <div class="grid-container">
      <div class="space">
        <router-link to="/" class="style-button">Home</router-link>
      </div>
      <div class="space"></div>
      <div class="space"></div>

      <div class="space"></div>
      <div class="grid-win-loss">
        <div class="win-loss">Win/Loss</div>
        <div class="grid-win-loss1">
          <div class="space"></div>
          <div class="xp">xp</div>
          <div class="space"></div>

          <div class="rewards">reward</div>
          <div class="space"></div>
          <div class="stats">stats</div>

          <div class="space"></div>
          <div class="grid-rewards">
            <div class="atack">atack</div>
            <div class="coins">coins</div>
            <div class="winrate">winrate</div>
          </div>
          <div class="space"></div>

          <div class="space"></div>
          <div class="space">
            <router-link to="/GameView" class="style-button">Continue</router-link>
          </div>
          <div class="space"></div>
        </div>
      </div>
      <div class="space"></div>
    </div>
  </div>
</template>

<style scoped></style>