<script>
import "../assets/main.css";
export default {
  name: "HistorialJugadores",
};
</script>

<template>

  <div class="imgbackg" alt="Background">
  <router-link to="/MenuPrincipal" class="game-title">Battle Arena</router-link>
  <h2 style="
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 30px;
font-family: Asimov, serif" id="listadoTitle">Historial de Jugadores</h2>

  <section class="historialPlayers">
    <table class="tableHistoring">
      <tr>
        <td>Juegos Finalizados</td>
        <td>Porcentaje de Juegos Ganados</td>
      </tr>
    </table>
  </section>
  </div>

</template>

<style scoped>

.tableHistoring
{
  position: relative;
  left: 0%;
  width: 95%;
  background-color: darkkhaki;
}

.historialPlayers
{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
}
</style>