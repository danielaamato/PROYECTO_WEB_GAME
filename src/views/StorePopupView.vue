<script>
import "../assets/storepopup.css"
export default {
  name: "StorePopup",
  props: ['productPrice'],
  methods: {
    nextProduct() {
      // Lógica para ir al siguiente producto
    },
    previousProduct() {
      // Lógica para ir al producto anterior
    },
  },
};
</script>

<template>
  <div class="popup-background">
    <div class="popup-content">
      <div class="close-container">
        <span class="close" @click="$emit('close')">&times;</span>
      </div>
      <img src="public/StorePopupImages/attack-image.png" alt="Imagen del Producto" class="product-image">
      <div class="product-info">
        <img src="public/MainMenuImages/coins-icon.png" alt="Monedas" class="coins-icon">
        <span>{{ productPrice }} monedas</span>
      </div>
      <div class="product-navigation">
        <!--En un futuro con la api implementaremos la logica en estos dos botones-->
        <button class="nav-button" @click="previousProduct"><span class="nav-arrow">&lt;</span></button>
        <button class="nav-button" @click="nextProduct"><span class="nav-arrow">&gt;</span></button>
      <button class="buy-button">Buy</button> <!-- Botón de Comprar -->
      </div>
    </div>
  </div>
</template>




<style scoped></style>
