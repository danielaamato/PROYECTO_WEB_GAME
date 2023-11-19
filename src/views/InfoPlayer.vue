<script>
import "../assets/infoplayer.css";
export default {
  name: "SignIn",
};
</script>

<template>
    <div class="imgbackg4" alt="Background">
      <div id="perfil-container">
        <h3 class="perfil-titulo">Perfil del Jugador</h3>
        <div id="idperfil">
          <img id="imagen-perfil" src="../../public/InfoPlayerImages/foto-usuario.png" alt="Imagen de perfil">
          <h2 class="nombre-perfil">Nombre del Jugador</h2>
        </div>
        <div id="idinfo">
          <p id="nivel-perfil">Nivel: 10</p>
          <p id="xp">XP: X</p>
          <p id="monedas">Monedas: X</p>
        </div>
        <router-link to="/EliminarPlayer">
          <img id="imagen-ajustes" src="../../public/InfoPlayerImages/icono-ajustes.webp" alt="Imagen de ajustes">
        </router-link>
      </div>

      <div id="ataques">
        <div id="backpack-at">Ataques Backpack
        </div>
        <div id="next-attacks">Proximos Ataques
        </div>
      </div>
    </div>
</template>

<style scoped></style>