<script>
import "../assets/header.css";
import TopBar from "@/components/TopBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  // Nombre del componente
  name: "CreateArenaView",

  // Componentes hijos utilizados en el componente principal
  components: { SideBar, TopBar },

  // Estado de datos inicial para el objeto arena
  data() {
    return {
      arena: {
        game_ID: "",
        size: 0,
        HP_max: 0,
      },
    };
  },

  methods: {
    // Método para manejar la presentación del formulario de creación de arena
    createArena() {
      // Validación de campos de entrada
      if (this.arena.size === "" || this.arena.HP_max === "" || this.arena.game_ID === "") {
        alert("Field all fields!");
      } else if (!this.isSizeValid()) {
        alert("The size must be between 2 and 10!");
      } else if (!this.isHPValid()) {
        alert("The HP must be at least 15!");
      } else if (!this.isNameValid()) {
        alert("The game ID must have from 1 to 20 characters!");
      } else {
        // Enviar la creación de la arena y almacenar el ID del juego en el almacenamiento local
        this.postArena();
        localStorage.setItem("game_ID", this.arena.game_ID);
      }
    },

    // Método para enviar una solicitud POST para crear una arena
    postArena() {
      fetch("https://balandrau.salle.url.edu/i3/arenas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
        body: JSON.stringify(this.arena),
      })
          .then((res) => {
            // Manejar diferentes estados de respuesta HTTP
            if (res.status === 200 || res.status === 201) {
              localStorage.setItem("inGame", 'true');
              this.$router.push({ name: "GameView" });
            } else if (res.status === 403) {
              alert("You are already in a game!");
            } else {
              // Registrar y alertar el error si la llamada a la API falla
              res.json().then((errorData) => {
                console.error("Error while calling the API:", errorData);
                alert("Error while calling the API: " + errorData.message);
              });
            }
          });
    },

    // Método para validar la longitud del ID del juego
    isNameValid() {
      return this.arena.game_ID.length < 21;
    },

    // Método para validar el tamaño de la arena
    isSizeValid() {
      const size = parseInt(this.arena.size);
      return size >= 2 && size <= 10;
    },

    // Método para validar el HP máximo de la arena
    isHPValid() {
      const HP_max = parseInt(this.arena.HP_max);
      return HP_max >= 15;
    },
  },
};
</script>

<template>
  <head>
    <!-- Configuración del título de la página -->
    <title>Create Arena</title>
  </head>

  <body>
  <header>
    <!-- Muestra TopBar en pantallas no móviles -->
    <TopBar v-if="!isMobile"></TopBar>
    <!-- Muestra SideBar en pantallas móviles -->
    <SideBar v-if="isMobile"></SideBar>
  </header>

  <main class="main-container-create-arena">
    <section class="main-space-create-arena"></section>
    <form class="arena-section-create-arena" @submit.prevent="createArena()">
      <!-- Entrada para el nombre del juego -->
      <input v-model="this.arena.game_ID" type="text" id="arena-id" placeholder="Game Name" class="arena-input-create-arena">

      <!-- Entrada para el tamaño de la arena -->
      <input v-model="this.arena.size" type="number" id="arena-size" placeholder="Size" class="arena-input-create-arena">

      <!-- Entrada para el HP máximo de la arena -->
      <input v-model="this.arena.HP_max" type="number" id="arena-hp" placeholder="HP" class="arena-input-create-arena">

      <!-- Botón para iniciar la arena -->
      <button type="submit" id="create-arena-button" class="start-button-create-arena">Start</button>
    </form>
  </main>

  </body>
</template>

<style scoped>

body {
  background-image: url("public/HomeImages/fondo-de-pagina.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.start-button-create-arena {
  background-color: sandybrown;
  border-style: solid;
  border-width: 3px;
}

.arena-section-create-arena {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFDB58;
  width: 300px;
  padding: 10px;
  border-style: solid;
  border-width: 5px;
}

.arena-input-create-arena {
  width: 200px;
  height: 50px;
  margin: 10px;
  font-size: 20px;
  text-align: center;
  border-style: solid;
  border-width: 5px;
  border-color: #181818;
}

.main-space-create-arena {
  height: 150px;
}

.main-container-create-arena {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (max-width: 600px) {

  .arena-section-create-arena {
    width: 90%;
    border-radius: 15px;
  }

  .arena-input-create-arena {
    width: 80%;
    margin: 5px;
    font-size: 16px;
  }

  .main-space-create-arena {
    height: auto;
  }

  .main-container-create-arena {
    align-items: center;
  }
}

</style>
