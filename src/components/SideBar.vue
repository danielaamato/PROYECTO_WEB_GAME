<script>
export default {
  name: "SidebarMenu",
  data() {
    return {
      isMenuOpen: false, // Controla la visibilidad del menú lateral
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.getElementById("sidebar").style.width = "50%";
        document.getElementById("main").style.marginLeft = "50%";
      } else {
        document.getElementById("sidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
      }
    }
  }
};
</script>


<template>
  <div class="sidebar-container">
    <!-- Barra Superior con Botón y Título -->
    <header class="top-bar-mobile">
      <button @click="toggleMenu" class="openbtn">☰</button>
      <h1 class="game-title-mobile">Battle Arena</h1>
    </header>

    <!-- Menú Lateral Desplegable -->
    <aside id="sidebar" class="sidebar" v-show="isMenuOpen">
      <!-- Botón de Cierre -->
      <button @click="toggleMenu" class="closebtn">✖</button>

      <!-- Sección de Información del Usuario -->
      <section class="user-info-mobile">
        <div class="user-profile">
          <img src="public/MainMenuImages/profile-pic.jpg" alt="Foto de Perfil" class="profile-pic">
          <span class="username">xXxCacoDemon73</span>
        </div>
        <div class="user-details">
          <div class="coins user-coins">
            <img src="public/MainMenuImages/coins-icon.png" alt="Icono de monedas" class="coins-icon">
            <span>100</span>
          </div>
          <span class="experience user-level">Nivel: 1</span>
        </div>
        <hr> <!-- Línea separadora -->
      </section>

      <!-- Navegación del Menú Lateral -->
      <nav>
        <router-link to="/InfoPlayer" class="nav-button mobile">Perfil</router-link>
        <router-link to="/AnotherRoute" class="nav-button mobile">Otro Botón</router-link>
        <router-link to="/ThirdRoute" class="nav-button mobile">Tercer Botón</router-link>
      </nav>
    </aside>
  </div>
</template>

<style scoped>
/* Contenedor principal del sidebar */
.sidebar-container {
  width: 100%;
}

/* Barra superior en modo móvil con botón de apertura y título */
.top-bar-mobile {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
}

/* Título del juego en la barra superior móvil */
.game-title-mobile {
  text-decoration: none;
  color: #FFDB58;
  font-size: 2em;
}

/* Botón para abrir el menú lateral */
.openbtn {
  font-size: 20px;
  cursor: pointer;
  background-color: #111;
  color: white;
  padding: 10px 15px;
  border: none;
}

/* Estilos del menú lateral */
.sidebar {
  height: 100%;
  width: 0; /* Inicialmente oculto */
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

/* Botón para cerrar el menú lateral */
.closebtn {
  font-size: 20px;
  cursor: pointer;
  background-color: #111;
  color: white;
  padding: 10px 15px;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
}

/* Información del usuario en el menú lateral */
.user-info-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: white;
  padding: 10px;
  text-align: center;
}

/* Perfil del usuario con imagen y nombre */
.user-profile, .user-coins, .user-level {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

/* Imagen de perfil del usuario */
.profile-pic {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

/* Detalles adicionales del usuario como monedas y nivel */
.user-details {
  margin-top: 10px;
}

.coins-icon {
  width: 30px;
  height: 30px;
}

/* Estilo para la línea separadora entre información del usuario y botones */
hr {
  height: 1px;
  width: 100%;
  background-color: #ccc;
  margin-top: 10px;
}

/* Estilos para los botones de navegación en el menú lateral */
.nav-button.mobile {
  padding: 10px;
  color: white;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-top: 10px;
}

/* Ajuste del ancho del sidebar cuando está abierto */
.sidebar[style*="display: block;"] {
  width: 60%; /* Ajusta según tus necesidades */
}
</style>
