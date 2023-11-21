<script>
import "../assets/eliminarplayer.css";
export default {
  name: "EliminarPlayer",
};
</script>

<template>
  <div class="imgbackg" alt="Background">
    <div class="popup-delete">
        <p id="deleteplayer">¿Desea eliminar a este jugador?</p>
        <router-link id="routcheck" to="HomeView">
          <img id="imagen-check" src="public/InfoPlayerImages/checkmark.png" alt="Imagen CheckMark">
        </router-link>
        <router-link id="routex" to="InfoPlayer">
          <img id="imagen-exmark" src="public/InfoPlayerImages/exmark.png" alt="Imagen ExMark">
        </router-link>
    </div>
  </div>
</template>

<style scoped></style>