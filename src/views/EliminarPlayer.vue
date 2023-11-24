<script>
import "../assets/eliminarplayer.css";
export default {
  name: "EliminarPlayer",
};
</script>

<template>
  <div class="imgbackg" alt="Background">
    <main class="popup-delete">
      <p id="deleteplayer">¿Desea eliminar a este jugador?</p>
      <router-link to="HomeView">
        <img src="public/InfoPlayerImages/checkmark.png" alt="Imagen CheckMark" id="imagen-check">
      </router-link>
      <router-link to="InfoPlayer">
        <img src="public/InfoPlayerImages/exmark.png" alt="Imagen ExMark" id="imagen-exmark">
      </router-link>
    </main>
  </div>
</template>


<style scoped></style>