<script>
import "../assets/listadojugadores.css";
export default {
  name: "ListadoJugadores",
};
</script>

<template>

    <router-link to="/MenuPrincipal" class="game-title">Battle Arena</router-link>
    <h2 style="
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 30px;">Listado de Jugadores</h2>

  <section class="listadoPlayers">
    <input type="text" placeholder="Buscar Jugador...">

      <table>
        <tr>
          <td>Nombre</td>
          <td>XP</td>
          <td>Nivel</td>
          <td>Monedas</td>
          <td>Imagen</td>
        </tr>
      </table>
  </section>

</template>

<style scoped></style>