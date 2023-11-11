<script>
import "../assets/create-arena.css";
export default {
  name: "CreateArenaView",
};
</script>

<template>
  <div class="grid-container">
    <div class="game-name">Game Name</div>
    <div class="space"></div>
    <div class="options">options</div>

    <div class="space"></div>
    <div class="grid-create-arena">
      <div class="space"></div>
      <div class="grid-inputs">
        <div class="size-text">Size</div>
        <div class="size-input">
          <input type="text" name="size" id="size" />
        </div>
        <div class="hp-text">HP</div>
        <div class="hp-input">
          <input type="text" name="hp" id="hp" />
        </div>
      </div>
      <div class="grid-start-button">
        <div class="space"></div>
        <div class="start-button">
          <router-link to="/GameView">Start</router-link>
        </div>
        <div class="space"></div>
      </div>
    </div>
    <div class="space"></div>

    <div class="space"></div>
    <div class="space"></div>
    <div class="space"></div>
  </div>
</template>

<style scoped></style>
