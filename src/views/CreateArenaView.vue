<script>
import "../assets/create-arena.css";
export default {
  name: "CreateArenaView",
};
</script>

<template>
  <div class="imgbackg" alt="Background">
    <div class="grid-container">
      <div class="space">
        <router-link to="/" class="style-button">Home</router-link>
      </div>
      <div class="space"></div>
      <div class="options">options</div>

      <div class="space"></div>
      <div class="grid-create-arena">
        <div class="space"></div>
        <div class="space"></div>
        <div class="space"></div>

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
        <div class="space"></div>

        <div class="space"></div>
        <div class="space">
          <router-link to="/GameView" class="style-button">Start</router-link>
        </div>
        <div class="space"></div>

      </div>
      <div class="space"></div>
    </div>
  </div>

</template>

<style scoped></style>
