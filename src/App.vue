<script setup>
import Menu from './components/Menu.vue'
import HomeView from "@/views/HomeView.vue";
</script>

<template>

  <!-- Menu Principal Componente -->
  <Menu />

  <!-- Resto de Contenido -->
  <router-view />
</template>

<style scoped></style>
