<script>

</script>

<template>
  <div class="popup">
    <button class="close-button" @click="$emit('close')">x</button>
    <div class="grid-container">

    </div>
  </div>
</template>

<style scoped>
@import "../assets/Frames/PopUp.css";
@import "../assets/Buttons/CloseButton.css";

.popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 80%;
}

.grid-container {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
