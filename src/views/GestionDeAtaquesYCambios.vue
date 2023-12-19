<script>
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

<style scoped>

.tableAtaques
{
  position: relative;
  left: 0%;
  width: 95%;
  background-color: darkkhaki;
}

.cambiarAtaques
{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
}

.botones-ataques
{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  position: absolute;
  top: 85%;
  left: 45%;
}

#crearataque-button
{
  position: relative;
  bottom: 20px;
}

#venderataque-button
{
  position: relative;
  bottom: 10px;
}

@media only screen and (max-width: 767px)
{
  .botones-ataques
  {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-around;
    align-items: center;
    position: absolute;
    top: 85%;
    left: 34%;
  }

  h2
  {
    font-size: xxx-large;
  }
}

</style>