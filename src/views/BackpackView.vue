<script>
import "../assets/backpack.css";
export default {
  name: "BackpackPopup",
  data() {
    return {
      availableAttacks: [],
      attackSlots: [
        { id: 1, attack: null },
        { id: 2, attack: null },
        { id: 3, attack: null },
      ],
      showAddAttackPopup: false, // Para controlar la visibilidad del popup de añadir ataque
    };
  },
  methods: {
    drag(attack) {
      this.currentDrag = attack;
    },
    drop(slotId) {
      const slot = this.attackSlots.find(s => s.id === slotId);
      if (slot) {
        slot.attack = this.currentDrag;
      }
    },
    addAttack() {
      // Lógica para añadir un nuevo ataque
    },
    toggleAddAttackPopup() {
      this.showAddAttackPopup = !this.showAddAttackPopup;
    },
  },
};
</script>

<template>
  <div class="popup-background">
    <div class="popup-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <div class="backpack-header">
        <span class="backpack-info">Backpack (cantidad de items: {{ availableAttacks.length }}/60)</span>
        <button class="sell-button">Sell</button>
      </div>
      <div class="attacks-grid">
        <span class="current-attacks-label">Current Attacks</span>
        <!-- Genera 60 celdas para la tabla -->
        <div v-for="n in 60" :key="n" class="grid-cell" :class="{ 'golden-slot': n <= 3, 'add-attack-slot': n === 4 }" @click="n === 4 && toggleAddAttackPopup()">
          <span v-if="n === 4">+</span>
        </div>
      </div>
      <div v-if="showAddAttackPopup" class="add-attack-popup">
        <input type="text" placeholder="Rango (x, y)" />
        <input type="text" placeholder="Nombre" />
        <button class="create-button">CREATE</button>
      </div>
    </div>
  </div>
</template>

<style scoped> </style>