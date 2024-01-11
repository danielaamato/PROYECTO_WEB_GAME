<script>
export default {
  name: "StorePopup",
  // Datos iniciales del componente
  data() {
    return {
      currentImageIndex: 0, // Índice de la imagen actual
      currentAttackIndex: 0, // Índice del ataque actual
      images: [ // Array de imágenes para el carrusel
        "StorePopupImages/attack-image-1.png",
        "StorePopupImages/attack-image-2.png",
        "StorePopupImages/attack-image-3.png",
        "StorePopupImages/attack-image-4.png"
      ],
      attackList: [] // Lista de ataques obtenidos de la API
    }
  },

  // Acciones a realizar cuando el componente se monta
  mounted() {
    // Verifica si el usuario está autenticado
    if (localStorage.getItem("token") == null) {
      // Redirige a la vista de inicio si no hay token
      this.$router.push({ name: "HomeView" });
    } else {
      // Obtiene la información de la tienda si el usuario está autenticado
      this.getInfoShop();
    }
  },

  methods: {
    // Navega a la siguiente imagen y ataque
    nextProduct() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.currentAttackIndex = (this.currentAttackIndex + 1) % this.attackList.length;
    },

    // Navega a la imagen y ataque anterior
    previousProduct() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
      this.currentAttackIndex = (this.currentAttackIndex - 1 + this.attackList.length) % this.attackList.length;
    },

    // Obtiene información de la tienda desde la API
    getInfoShop() {
      fetch("https://balandrau.salle.url.edu/i3/shop/attacks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token")
        }
      })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              // Maneja los errores de respuesta no exitosa
              alert("Error while calling the API");
              return null;
            }
          })
          .then((data) => {
            // Asigna los datos obtenidos a attackList
            this.attackList = data;
          })
          .catch((error) => {
            // Maneja los errores de la solicitud fetch
            console.error(error);
            alert("Error while calling the API");
            this.attackList = [];
          });
    },
    buyAttack() {
      const attackToBuy = this.attackList[this.currentAttackIndex];

      // Comprueba si el usuario tiene el nivel necesario
      if (parseInt(localStorage.getItem("level")) < attackToBuy.level_needed) {
        alert("No tienes el nivel necesario para comprar este ataque.");
        return;
      }

      if (parseInt(localStorage.getItem("coins")) < attackToBuy.price) {
        alert("No tienes el dinero suficiente para comprar este ataque.");
        return;
      }

      // Realiza la solicitud de compra
      fetch(`https://balandrau.salle.url.edu/i3/shop/attacks/${attackToBuy.attack_ID}/buy`, {
      method: "POST",
          headers: {
            "Content-Type": "application/json",
            Bearer: localStorage.getItem("token")
      }
        })
          .then((res) => {
            if (res.ok) {
              if (res.headers.get("content-length") === "0") {
                return null; // No hay contenido para analizar como JSON
              } else {
                return res.json();
              }
            } else {
              throw new Error('Error en la compra: ' + res.status);
            }
          })
        .then(() => {
          alert("Ataque comprado con éxito.");
          // Avanza al siguiente ataque o vuelve al principio si es el último
          this.currentAttackIndex = (this.currentAttackIndex + 1) % this.attackList.length;

          // Actualizar la información de la lista
          this.getInfoShop();

          // Se actualiza las monedas del usuario en localStorage y en el estado del componente
          const newCoins = parseInt(localStorage.getItem("coins")) - attackToBuy.price;
          localStorage.setItem("coins", newCoins.toString());
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    }
  }
};
</script>

<template>
  <section class="popup" v-if="attackList && attackList.length > 0">
    <!-- Botón de cierre -->
    <button class="close-button" @click="$emit('close')">x</button>

    <!-- Sección de la imagen del producto -->
    <div class="image-section">
      <figure class="image-container">
        <img :src="images[currentImageIndex]" alt="Producto" class="product-image">
        <aside>
          <div class="attack-container">
            <p><strong>Nombre:</strong> {{ attackList[currentAttackIndex].attack_ID }}</p>
            <p><strong>Posiciones:</strong> {{ attackList[currentAttackIndex].positions }}</p>
            <p><strong>Fuerza:</strong> {{ attackList[currentAttackIndex].power }}</p>
            <p><strong>Nivel necesario:</strong> {{ attackList[currentAttackIndex].level_needed }}</p>
          </div>
        </aside>
      </figure>
    </div>

    <!-- Sección de la información del precio -->
    <div class="price-section">
      <div class="price-info">
        <span>{{attackList[currentAttackIndex].price}} </span>
        <img src="/MainMenuImages/coins-icon.png" alt="Moneda" class="coin-icon">
        <button class="CoolButton2 buy-button" @click="buyAttack">Buy Attack</button>
      </div>
    </div>

    <!-- Sección de los botones de navegación -->
    <nav class="arrow-buttons-container">
      <button class="arrow-button left-arrow" @click="previousProduct"></button>
      <button class="arrow-button right-arrow" @click="nextProduct"></button>
    </nav>
  </section>

  <div class = "popup" v-else>
    <!-- Botón de cierre -->
    <button class="close-button" @click="$emit('close')">x</button>
    <div class="animation">Try again! :)</div>
  </div>
</template>

<style scoped>
/* Importaciones de estilos externos */
@import "../assets/Frames/PopUp.css";
@import "../assets/Buttons/CloseButton.css";
@import "../assets/Buttons/ArrowButton.css";
@import "../assets/Buttons/CoolButton2.css";
@import "../assets/Loaders/LoaderDoots.css";

/* Estilos para el contenedor principal del popup */
.popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 70%;  /* Ancho del popup */
  height: 55%; /* Altura del popup */
}

/* Estilos comunes para las secciones del popup */
.image-section, .price-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Estilos para el contenedor de la imagen del producto */
.image-container {
  width: 80%; /* Ancho relativo para ser responsive */
  height: 250px; /* Altura fija */
  border: 2px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Estilos para la imagen del producto */
.product-image {
  width: 50%;
  height: 60%;
  object-fit: scale-down; /* Ajusta la imagen para cubrir el contenedor */
}

/* Estilos para la sección de información del precio */
.price-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Estilos para el ícono de moneda */
.coin-icon {
  width: 5%;
  height: auto;
  margin-left: 1%;
}

/* Estilos para los botones de navegación (flechas) */
.arrow-buttons-container {
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}

.arrow-button {
  cursor: pointer;
  border: solid 2px transparent;
  background: transparent;
  margin-right: 20%;
  margin-left: 20%;
}
/* Estilos para el botón de compra */
.buy-button {
  margin-left: 3%;
}

/* Ajuste para el botón de flecha derecha */
.right-arrow {
  transform: rotate(180deg);
}
</style>

