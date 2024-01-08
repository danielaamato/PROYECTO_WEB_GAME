<script>
export default {
  name: "StorePopup",
  props: ['productPrice'],
  data() {
    return {
      currentImageIndex: 0,
      images: [
        "StorePopupImages/attack-image-1.png",
        "StorePopupImages/attack-image-2.png",
        "StorePopupImages/attack-image-3.png",
        "StorePopupImages/attack-image-4.png"
      ]
    };
  },
  methods: {
    nextProduct() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
    previousProduct() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    },
  },
};
</script>

<template>
  <div class="popup">
    <!-- Botón de cierre -->
    <button class="close-button" @click="$emit('close')">x</button>
    <!-- Sección de la imagen del producto -->
    <div class="image-section">
      <div class="image-container">
        <img :src="images[currentImageIndex]" alt="Producto" class="product-image">
      </div>
    </div>

    <!-- Sección de la información del precio -->
    <div class="price-section">
      <div class="price-info">
        <span>{{ productPrice }} </span>
        <img src="public/MainMenuImages/coins-icon.png" alt="Moneda" class="coin-icon">
      </div>
    </div>

    <!-- Sección de los botones de flecha -->
    <div class="arrow-section">
      <div class="arrow-buttons-container">
        <div class="arrow-button left-arrow" @click="previousProduct"></div>
        <div class="arrow-button right-arrow" @click="nextProduct"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../../../WebstormProjects/pw1final/src/assets/Frames/PopUp.css";
@import "../../../../WebstormProjects/pw1final/src/assets/Buttons/CloseButton.css";
@import "../../../../WebstormProjects/pw1final/src/assets/Buttons/ArrowButton.css";

.popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 70%;  /* Ancho del popup */
  height: 55%; /* Altura del popup */
}

.image-section, .price-section, .arrow-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  width: 80%; /* Ancho relativo para ser responsive */
  height: 250px; /* Altura fija */
  border: 2px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.product-image {
  width: 50%;
  height: 60%;
  object-fit: scale-down; /* Ajusta la imagen para cubrir el contenedor */
}

.price-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.coin-icon {
  width: 5%;
  height: auto;
  margin-left: 1%;
}

.arrow-buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.arrow-button {
  cursor: pointer;
  border: solid 2px transparent;
  margin-left: 20%;
}

.right-arrow {
  transform: rotate(180deg);
  margin-right: 20%;
}
</style>
