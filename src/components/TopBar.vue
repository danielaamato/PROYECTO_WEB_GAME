<template>
  <header class="top-bar">
    <!-- Título del juego / Botón de inicio -->
    <a href="#" class="game-title">Battle Arena</a>

    <!-- Información del usuario para pantallas de ordenador -->
    <nav class="user-info desktop">
      <img src="public/MainMenuImages/profile-pic.jpg" alt="Foto de Perfil" class="profile-pic">
      <span class="username">xXxCacoDemon73</span>
      <div class="coins">
        <div class="coins-icon"></div>
        <span>100</span>
      </div>
      <span class="experience">Nivel: 1</span>
    </nav>

    <!-- Botón de Perfil para pantallas de ordenador -->
    <router-link to="/InfoPlayer" class="nav-button desktop">Perfil</router-link>
  </header>
</template>

<script>
  export default {
    name: "TopBar",
  };
</script>

<style scoped>
  /* Estilos generales para la barra superior */
  .top-bar {
    background-color: #333;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1%;
  }

  /* Estilos para el título del juego */
  .game-title {
    text-decoration: none;
    color: #FFDB58;
    font-family: Asimov, serif;
    font-size: 2em;
  }

  /* Estilos para la información del usuario en pantallas de ordenador */
  .user-info.desktop {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .user-info.desktop > span, .user-info.desktop > div {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .profile-pic, .coins-icon {
    border-radius: 50%;
    object-fit: cover;
    width: 40px;
    height: 40px;
  }

  .coins-icon {
    background-image: url('../../public/MainMenuImages/coins-icon.png');
    background-size: cover;
    background-repeat: no-repeat;
  }

  .nav-button.desktop {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
</style>
