<script>
  export default {
    name: "OfertaEspecial"
  };
</script>

<template>
    <div class="popup">
      <button class="close-button" @click="$emit('close')">x</button>
        <video controls>
          <source src="public/MainMenuImages/oferta-especial.mp4" type="video/mp4">
        </video>
    </div>
</template>

<style scoped>
@import "../assets/Frames/PopUp.css";
@import "../assets/Buttons/CloseButton.css";

.popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 60%;  /* Ancho del popup */
  height: 70%; /* Altura del popup */
}

.video-container {
  position: relative;
  width: 100%; /* Ancho completo del contenedor */
  padding-top: 56.25%; /* Relación de aspecto para 16:9 */
  overflow: hidden;
}

video {
  position: absolute;
  top: auto;
  left: auto;
  width: 90%;
  height: 90%;
}
</style>
