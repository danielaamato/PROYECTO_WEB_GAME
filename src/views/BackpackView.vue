<script>
import TopBar from "@/components/TopBar.vue";
import SideBar from "@/components/SideBar.vue";
import CreateItemPopup from "@/views/CreateItemPopUp.vue";
import SellItemPopup from "@/views/SellItemPopup.vue";

export default {
  name: "BackpackView",
  components: {
    SellItemPopup,
    CreateItemPopup,
    SideBar,
    TopBar
  },
  data() {
    return {
      selectedAttackId: null,
      // Estado para controlar la visibilidad del popup de creación de ítems
      showCreateItemPopup: false,
      showSellItemPopup: false,
      forceRenderKey: 0, //Clave para forzar el rerenderizaje de la tabla
      // Lista de ataques del usuario
      attacksList: [],
      // Estado para controlar si la vista es móvil o no
      isMobile: window.innerWidth <= 700
    };
  },
  // Ciclo de vida: se ejecuta cuando el componente se monta
  mounted() {
    this.checkAuthentication();
    this.getAttacksList();
  },
  // Ciclo de vida: se ejecuta cuando el componente se crea
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  // Ciclo de vida: se ejecuta cuando el componente se desmonta
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    // Verifica si el usuario está autenticado
    checkAuthentication() {
      if (localStorage.getItem("token") == null) {
        this.$router.push({name: "HomeView"});
      }
    },
    // Obtiene la lista de ataques del usuario
    getAttacksList() {
      fetch("https://balandrau.salle.url.edu/i3/players/attacks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
      })
          .then(this.handleResponse)
          .then(this.updateAttacksList)
          .catch(this.handleError);
    },
    // Maneja la respuesta del servidor
    handleResponse(res) {
      if (res.status === 200) {
        return res.json();
      } else {
        alert("Error while calling the API");
        return null;
      }
    },
    // Actualiza la lista de ataques con los datos obtenidos
    updateAttacksList(data) {
      if (data) {
        this.attacksList = data;
      }
    },
    // Maneja los errores en las solicitudes fetch
    handleError(error) {
      console.error("Error:", error);
      alert("Error while calling the API");
    },
    // Maneja el cambio de tamaño de la ventana
    handleResize() {
      this.isMobile = window.innerWidth <= 700;
    },
    toggleEquip(attackId, isEquipped) {
      // Verificar si se excede el límite de ataques equipados
      if (!isEquipped && this.countEquippedAttacks() >= 3) {
        alert("No puedes equipar más de tres ataques.");
        this.forceRender()
        return;
      }

      const url = `https://balandrau.salle.url.edu/i3/players/attacks/${attackId}`;
      const method = isEquipped ? 'DELETE' : 'POST'; // DELETE para desequipar, POST para equipar

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token")
        },
      })
          .then(res => {
            if (res.status === 200 || res.status === 204) {
              // Actualizar la lista de ataques
              this.getAttacksList();
            } else {
              throw new Error('Error al cambiar el estado de equipamiento');
            }
          })
          .catch(error => {
            console.error("Error:", error);
            alert("Error al cambiar el estado de equipamiento.");
          });
    },
    countEquippedAttacks() {
      return this.attacksList.filter(attack => attack.equipped).length;
    },
    showSellPopup(attackId) {
      this.selectedAttackId = attackId;
      this.showSellItemPopup = true;
    },
    onAttackSold() {
      this.getAttacksList();
    },
    handleCloseSellItemPopup() {
      this.showSellItemPopup = false;
    },
    handleCloseCreateAttack() {
      this.showCreateItemPopup = false;
      this.forceRender();
    },
    forceRender() {
      this.forceRenderKey++;
    }
  }
};
</script>

<template>
  <!-- Encabezado de la vista, muestra la barra superior dependiendo del tamaño de la pantalla -->
  <header>
    <!-- Barra superior para pantallas no móviles -->
    <TopBar v-if="!isMobile"></TopBar>
    <!-- Barra lateral para pantallas móviles -->
    <SideBar v-if="isMobile"></SideBar>
  </header>

  <!-- Contenido principal de la vista -->
  <main class="imgbackg">
    <!-- Sección de listado de ataques -->
    <section class="listadoAtaques">
      <!-- Contenedor superior con título y botón de agregar -->
      <div class="top-container">
        <h2 class="title-container">Listado de Ataques</h2>
        <button type="button" class="CoolButton1 add-button" @click="showCreateItemPopup = true">Create attack</button>
      </div>

      <!-- Tabla de ataques -->
      <div class="tableContainer card" :key="forceRenderKey">
        <table class="tableListing">
          <!-- Cabecera de la tabla -->
          <thead>
          <tr>
            <th>ID Ataque</th>
            <th>Posiciones</th>
            <th>Poder</th>
            <th>Equipado</th>
            <th>En Venta</th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <!-- Cuerpo de la tabla -->
          <tbody>
          <tr v-if="attacksList.length === 0">
            <td colspan="7">No hay ataques en la mochila</td>
          </tr>
          <tr v-for="attack in attacksList" :key="attack.attack_ID">
            <td>{{ attack.attack_ID }}</td>
            <td>{{ attack.positions }}</td>
            <td>{{ attack.power }}</td>
            <td>{{ attack.equipped ? 'Sí' : 'No' }}</td>
            <td>{{ attack.on_sale ? 'Sí' : 'No' }}</td>
            <td class="checkbox-cell">
              <div class="center-content">
                <label class="container" v-if="!attack.on_sale">
                  <input type="checkbox" :checked="attack.equipped" @change="toggleEquip(attack.attack_ID, attack.equipped)">
                  <div class="checkmark"></div>
                </label>
              </div>
            </td>
            <td class="button-cell">
              <div class="center-content">
                <div class="sell-button" @click.stop="showSellPopup(attack.attack_ID)">
                  <div class="button-wrapper">
                    <div class="text">Sell Now</div>
                    <span class="icon">
                        <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                        </svg>
                    </span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Popup para crear un nuevo ítem -->
      <div v-if="showCreateItemPopup" class="popup">
        <CreateItemPopup @close="handleCloseCreateAttack"></CreateItemPopup>
      </div>

      <!-- Popup para crear un nuevo ítem -->
      <div v-if="showSellItemPopup" class="popup">
        <SellItemPopup :attackId="selectedAttackId" @attack-sold="onAttackSold" @close="handleCloseSellItemPopup"></SellItemPopup>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import "../assets/Buttons/SellButton.css";
@import "../assets/Columns/CoolColumn.css";
@import "../assets/Buttons/Checkbox.css";
@import "../assets/Buttons/CoolButton1.css";

.card {
  width: 90%;
  margin-right: auto;
  margin-left: auto;
}

/* Estilos para el contenedor superior con título y botón de agregar */
.top-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* Estilos para el título del listado de ataques */
.title-container {
  font-size: 3.5vw;
  text-decoration: underline;
  margin-left: 5%;
}

/* Estilos para el botón de agregar ítem */
.add-button {
  margin-right: 20%;
}

.CoolButton1 {
  background: #3aa856;
}

.CoolButton1:hover {
  background-color: #fff;
  color: #2a7a3f;
  border: 2px solid #2a793f;
  box-shadow: 5px 5px #2a793f;
}

/* Estilos para el contenedor de la tabla */
.tableContainer {
  overflow-x: auto;
  overflow-y: scroll;
  max-height: 600px;
  margin-bottom: 20px;
}

/* Estilos para la tabla de listado de ataques */
.tableListing {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 219, 88, 20%);
}

.listadoAtaques {
  padding: 20px;
  text-align: center;
}

/* Estilos para las celdas y encabezados de la tabla */
.tableListing th, .tableListing td {
  border: 1px solid #000000;
  padding: 8px;
  text-align: center;
}

/* Estilos para los encabezados de la tabla */
.tableListing th {
  background-color: sandybrown;
}

/* Estilos para las celdas de checkbox y botón */
.checkbox-cell, .button-cell {
  text-align: center;
  vertical-align: middle;
}

/* Estilos para centrar contenido dentro de celdas */
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Estilos para pantallas pequeñas o móviles */
@media (max-width: 600px) {
  .tableListing {
    width: 100%;
  }

  .add-button {
    margin-right: 5%;
  }
}
</style>