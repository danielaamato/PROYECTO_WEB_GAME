<script>
import StorePopup from "@/views/StoreView.vue";

export default {
  name: "SidebarMenu",
  components: {StorePopup},
  props: {
    showUserInfo: {
      type: Boolean,
      default: true
    },
    isGameView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showStorePopup: false,
      isMenuOpen: false, // Controla la visibilidad del menú lateral
      player_ID: "",
      img: "",
      level: 0,
      coins: 0
    };
  },
  mounted() {
    // Llama a la función getInfoPlayer cuando el componente ha sido montado
    // If user has not already logged in go to SignIn
    if (localStorage.getItem("token") == null)
    {
      this.$router.push({ name: "HomeView" });
    }
    else
    {
      this.getInfoPlayer();
    }
  },
  methods: {
    handleOpenShop() {
      this.showStorePopup = true;
      this.isMenuOpen = false;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.getElementById("sidebar").style.width = "50%";
        document.getElementById("main").style.marginLeft = "50%";
      } else {
        document.getElementById("sidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
      }
    },
    getInfoPlayer() {
      //Get player ID
      let playerID = null;
      playerID = localStorage.getItem("player_ID");

      fetch("https://balandrau.salle.url.edu/i3/players/" + playerID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        }
      })
        .then(response => response.json())
        .then(data => {
          this.player_ID = data.player_ID;
          this.img = data.img;
          this.level = data.level;
          this.coins = data.coins;
        })
        .catch(error => console.error("Error:", error));
    }
  }
};
</script>


<template>
  <div class="sidebar-container">
    <!-- Barra Superior con Botón y Título -->
    <header class="top-bar-mobile">
      <button @click.stop="toggleMenu" class="openbtn">☰</button>
      <router-link class="game-title" to="/MenuPrincipal">Battle Arena</router-link>
    </header>

    <!-- Menú Lateral Desplegable -->
    <aside id="sidebar" class="sidebar" v-show="isMenuOpen">
      <!-- Botón de Cierre -->
      <button @click="toggleMenu" class="closebtn">✖</button>

      <!-- Sección de Información del Usuario -->
      <section class="user-info-mobile">
        <div class="user-profile">
          <img v-bind:src="img" alt="Foto de Perfil" class="profile-pic">
          <span class="username">{{ player_ID }}</span>
        </div>
        <div class="user-details">
          <div class="coins user-coins">
            <img src="public/MainMenuImages/coins-icon.png" alt="Icono de monedas" class="coins-icon">
            <span>{{ coins }}</span>
          </div>
          <span class="experience user-level">Nivel: {{ level }}</span>
        </div>
        <hr> <!-- Línea separadora -->
      </section>

      <!-- Navegación del Menú Lateral -->
      <nav>
        <!-- Botón de Perfil o Quit para pantallas de ordenador -->
        <router-link :to="isGameView ? '/MenuPrincipal' : '/InfoPlayer'" class="nav-button desktop" v-if="showUserInfo">
          {{ isGameView ? 'Salir' : 'Perfil' }}
        </router-link>
        <router-link to="/MenuPrincipal" class = "nav-button mobile" v-if="!showUserInfo">Menu</router-link>
        <button class="nav-button mobile button-store" @click.stop="handleOpenShop">Store</button>
        <!-- Popup Store -->

        <router-link to="/BackpackView" class="nav-button mobile">Backpack</router-link>
      </nav>
    </aside>

    <div v-if="showStorePopup" class="popup">
      <StorePopup @close="showStorePopup = false"></StorePopup>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal del sidebar */
.sidebar-container {
  width: 100%;
  z-index: 1;
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
.game-title {
  text-decoration: none;
  color: #FFDB58;
  font-size: 2em;
  font-weight: bold;
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

.experience {
  margin-top: 15px;
}

/* Imagen de perfil del usuario */
.profile-pic {
  border-radius: 50%;
  width: 30px;
  height: 30px;
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
  padding: 10px 15px; /* Ajusta el relleno según tus preferencias */
  color: white;
  background-color: #2980b9; /* Color de fondo del botón */
  text-decoration: none;
  display: block;
  text-align: center;
  border: none;
  border-radius: 5px; /* Bordes redondeados */
  font-size: 16px; /* Tamaño de la fuente */
  cursor: pointer;
  transition: background-color 0.3s ease; /* Transición suave para el hover */
  margin-right: 5%;
  margin-left: 5%;
  margin-top: 5%;
}

.button-store {
  width: 90%;
}

/* Ajuste del ancho del sidebar cuando está abierto */
.sidebar[style*="display: block;"] {
  width: 60%; /* Ajusta según tus necesidades */
}
</style>
