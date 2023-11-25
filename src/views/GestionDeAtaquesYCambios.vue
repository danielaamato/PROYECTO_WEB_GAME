<script>
import "../assets/gestiondeataquesycambios.css";
export default {
  name: "GestionDeAtaquesYCambios",
};
</script>

<template>

  <router-link to="/MenuPrincipal" class="game-title">Battle Arena</router-link>
  <h2 style="
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 30px;">Gestion de Ataques</h2>

  <section class="cambiarAtaques">
    <table class="tableAtaques">
      <tr>
        <td>Cambios de Ataque Disponibles (Máximo 3)</td>
      </tr>
    </table>
  </section>

  <section class="botones-ataques">
    <router-link id="crearataque-button" to="/CrearAtaque">Crear Ataque</router-link>
    <router-link id="venderataque-button" to="/VenderAtaque">Vender Ataque</router-link>
    <router-link to="/ComprarAtaque">Comprar Ataque</router-link>
  </section>

</template>

<style scoped></style>