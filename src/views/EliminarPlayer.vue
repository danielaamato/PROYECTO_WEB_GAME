<script>
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


<style scoped>

.popup-delete {
  border: 2px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  background-color: #2980b9;
  width: 38%;
  height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 18%;
  left: 25%;
}

#deleteplayer {
  font-size: 40px;
  color: #ffffff;
  text-align: center;
  font-family: Asimov;
}

#imagen-check {
  max-width: 70%;
  max-height: 70%;
}

#imagen-exmark {
  max-width: 70%;
  max-height: 70%;
}

.imgbackg {
  background-image: url("../../public/HomeImages/fondo-de-pagina.png");
  width: 100%;
  height: 100vh;

  background-repeat: no-repeat;
  background-attachment: fixed;
  text-align: center;
}

</style>