<script>
import "../assets/historialjugadores.css";
export default {
  name: "HistorialJugadores",
};
</script>

<template>

  <router-link to="/MenuPrincipal" class="game-title">Battle Arena</router-link>
  <h2 style="
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 30px;">Historial de Jugadores</h2>

  <section class="historialPlayers">
    <table class="tableHistoring">
      <tr>
        <td>Juegos Finalizados</td>
        <td>Porcentaje de Juegos Ganados</td>
      </tr>
    </table>
  </section>

</template>

<style scoped></style>