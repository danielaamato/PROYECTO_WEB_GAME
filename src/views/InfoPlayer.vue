<script>
import TopBar from "@/components/TopBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "SignIn",
  components: { SideBar, TopBar },

  data() {
    // Estado inicial del componente
    return {
      player_ID: "",
      img: "",
      xp: 0,
      level: 0,
      coins: 0,
      attackList: [],
      equippedAttacks: [],
      isMobile: window.innerWidth <= 700 // Determina si la vista es móvil
    };
  },

  created() {
    // Event listeners para el redimensionamiento de la ventana
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // Establece el estado inicial de 'isMobile'
  },

  unmounted() {
    // Limpieza: eliminar event listener al desmontar
    window.removeEventListener('resize', this.handleResize);
  },

  mounted() {
    // Comprobación de autenticación y obtención de datos del jugador
    if (!localStorage.getItem("token")) {
      this.$router.push({ name: "HomeView" });
    } else {
      this.getInfoPlayer();
    }
  },

  methods: {
    // Obtener información del jugador
    getInfoPlayer() {
      let playerID = localStorage.getItem("player_ID");

      fetch(`https://balandrau.salle.url.edu/i3/players/${playerID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
      })
          .then(res => res.status === 200 ? res.json() : Promise.reject('Error'))
          .then(this.chargeProfile)
          .catch(() => {
            this.$router.push({ name: "HomeView" });
            alert("Error while calling the API");
          });
    },

    // Cargar perfil del jugador
    chargeProfile(data) {
      if (data) {
        Object.assign(this, data);
        this.chargeAttacks();
      } else {
        console.error("Data is undefined or has unexpected structure.");
      }
    },

    // Cargar ataques del jugador
    chargeAttacks()
    {
      fetch("https://balandrau.salle.url.edu/i3/players/attacks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
      })
          // Check if response was correct
          .then((res) =>
          {
            if (res.status === 200)
            {
              return res.json();
            }
            else
            {
              alert("Error while calling the API");
              return null;
            }
          })
          .then((data) =>
          {
            this.attackList = data;
            this.equippedAttacks = data.filter((ataque) => ataque.equipped);
          });
    },
    // Manejar redimensionamiento de la ventana
    handleResize() {
      this.isMobile = window.innerWidth <= 700;
    }
  }
};
</script>


<template>
  <!-- Encabezado: Muestra TopBar o SideBar según el tipo de dispositivo -->
  <header>
    <!-- TopBar para dispositivos no móviles -->
    <TopBar class="top-bar" v-if="!isMobile" :showUserInfo="false"></TopBar>
    <!-- SideBar para dispositivos móviles -->
    <SideBar class="side-bar" v-if="isMobile" :showUserInfo="false"></SideBar>
  </header>

  <!-- Contenido principal -->
  <main>
    <!-- Sección del Perfil del Jugador -->
    <section class="imgbackg4" aria-label="Background">
      <article id="perfil-container">
        <h3 class="perfil-jugador">Perfil del Jugador</h3>
        <div id="idperfil">
          <img id="imagen-perfil" v-bind:src="img" alt="Imagen de perfil del jugador">
          <h2 class="nombre-perfil">Nombre del Jugador: {{ player_ID }}</h2>
        </div>
        <div id="idinfo">
          <p id="nivel-perfil">Nivel: {{ level }}</p>
          <p id="xp">XP: {{ xp }}</p>
          <p id="monedas">Monedas: {{ coins }}</p>
        </div>
        <router-link to="/EliminarPlayer">
          <img id="imagen-ajustes" src="../../public/InfoPlayerImages/icono-ajustes.webp" alt="Configuración del jugador">
        </router-link>
      </article>

      <!-- Sección de Ataques en la Mochila -->
      <section id="backpack-at">
        <h4>Ataques Backpack</h4>
        <div class="attackTable">
          <!-- Mensaje si no hay ataques equipados -->
          <div v-if="equippedAttacks.length === 0">
            <p>Sin Ataques equipados para próximos juegos</p>
          </div>
          <!-- Lista de ataques equipados -->
          <div v-for="ataque in equippedAttacks" :key="ataque.attack_ID" class="attack-container">
            <p><strong>Nombre:</strong> {{ ataque.attack_ID }}</p>
            <p><strong>Posiciones:</strong> {{ ataque.positions }}</p>
            <p><strong>Fuerza:</strong> {{ ataque.power }}</p>
            <p><strong>¿Equipado?:</strong> {{ ataque.equipped ? 'Si' : 'No' }}</p>
            <p><strong>¿En oferta?:</strong> {{ ataque.on_sale ? 'Si' : 'No' }}</p>
          </div>
        </div>
      </section>

      <!-- Sección de Ataques Equipados -->
      <section id="next-attacks">
        <h4>Ataques Equipados</h4>
        <div class="attackTable">
          <!-- Mensaje si no hay ataques equipados -->
          <div v-if="equippedAttacks.length === 0">
            <p>Sin Ataques equipados para próximos juegos</p>
          </div>
          <!-- Lista de ataques equipados -->
          <div v-for="ataque in equippedAttacks" :key="ataque.attack_ID" class="attack-container">
            <p><strong>Nombre:</strong> {{ ataque.attack_ID }}</p>
            <p><strong>Posiciones:</strong> {{ ataque.positions }}</p>
            <p><strong>Fuerza:</strong> {{ ataque.power }}</p>
            <p><strong>¿Equipado?:</strong> {{ ataque.equipped ? 'Si' : 'No' }}</p>
            <p><strong>¿En oferta?:</strong> {{ ataque.on_sale ? 'Si' : 'No' }}</p>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.imgbackg4 {
  background-image: url("../../public/HomeImages/fondo-de-pagina.png");
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
}

#perfil-container {
  text-align: center;
  background-color: #2980b9;
  border-radius: 3%;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 3%;
  left: 8%;
  width: 85%;
}


#backpack-at
{
  text-align: center;
  background-color: #87CEEB;
  width: 46%;
  height: 45%;
  border-radius: 3%;
  left: 5%;
  top: 53%;
  position: absolute;
  font-family: "Calisto MT";
  font-size: 1.2em;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  max-height: 62%;
  overflow-y: auto;
}

#next-attacks, backpack-at
{
  text-align: center;
  background-color: #87CEEB;
  right: 4%;
  top: 53%;
  height: 45%;
  border-radius: 3%;
  width: 42%;
  font-family: "Calisto MT",serif;
  font-size: 1.2em;
  position: absolute;
  overflow-y: auto;
}

#imagen-perfil {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 2%;
}

#imagen-ajustes {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.nombre-perfil {
  font-size: 1.5em;
  color: #282828;
}

#nivel-perfil {
  font-size: 1.2em;
  color: #ffffff;
  font-family: Asimov;
}

#xp {
  font-size: 1.2em;
  color: #ffffff;
  font-family: Asimov;
}

#monedas {
  font-size: 1.2em;
  color: #ffffff;
  font-family: Asimov;
}

.perfil-titulo {
  font-size: 2em; /* Ajusta el tamaño del título según tus necesidades */
  text-align: left;
  font-family: Asimov, serif;
  color: #FFDB58;
  margin-left: 5%;
}

.perfil-jugador {
  font-size: 2em; /* Ajusta el tamaño del título según tus necesidades */
  text-align: left;
  font-family: Asimov, serif;
  color: #FFDB58;
  margin-left: 5%;
  margin-bottom: 0;
  margin-top: 20px;
}

@media only screen and (max-width: 1100px) {
  .imgbackg {
    padding: 10px;
  }

  #perfil-container {
    width: 90%;
    top: 4%;
    left: 5%;
    position: relative;
  }

  #backpack-at,
  #next-attacks {
    width: 45%;
    right: 3%;
    font-size: 1em;
    position: absolute;
    top: 61%;
    border-radius: 5%;
    height: 37%;
  }


}

#ataques{
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
}

#idperfil{
  display: flex;
  align-items: center;
}

#idinfo{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.attack-container
{
  position: relative;
}


.attack-container::after
{
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: #000;
}

.attackTable
{
  overflow-x: auto;
  overflow-y: auto;
  display: flex;
  position: relative;
  height: 510px;
  width: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}
</style>