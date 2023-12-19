<script>
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

<style scoped>
.popup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegúrate de que tenga un z-index alto para estar sobre otros elementos */
}

.popup-content {
  width: 1400px; /* o el ancho que prefieras */
  height: 800px; /* o la altura que prefieras */
  background-color: white; /* o cualquier otro color de fondo */
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  overflow: auto; /* Para manejar el contenido que exceda el tamaño del popup */
  position: relative; /* Para posicionar correctamente el botón de cerrar */
  display: flex;
  flex-direction: column;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 30px;
  color: #000; /* o el color que prefieras */
}

.backpack-info {
  margin-right: auto;
}

.backpack-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  justify-content: flex-end; /* Alinea el texto a la derecha */
}

.sell-button {
  background-color: darkslategray;
  color: white;
  border-radius: 15px; /* Bordes redondeados */
  padding: 5px 10px;
  cursor: pointer;
  width: 100%; /* Hace que el botón se extienda a lo ancho del contenedor */
  text-align: center; /* Centra el texto dentro del botón */
}

.attacks-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr); /* 10 columnas */
  grid-template-rows: repeat(6, 1fr); /* 6 filas */
  gap: 10px; /* Espacio entre celdas */
  position: relative;
}

.grid-cell {
  border: 1px solid #ccc; /* Borde para cada celda */
  width: 100px; /* Ancho de la celda */
  height: 100px; /* Altura de la celda */
  display: flex;
  justify-content: center;
  align-items: center;
}

.attack-slot, .attack, .add-attack {
  border: 1px solid black; /* Borde para cada celda */
  width: 30px; /* Ancho fijo */
  height: 30px; /* Altura fija */
  display: flex;
  justify-content: center;
  align-items: center;
}

.attack img, .attack-slot img {
  max-width: 100%;
  max-height: 100%;
}

.current-attacks-label {
  position: absolute;
  top: -20px;
  left: 10px;
  font-weight: bold;
  color: #000;
}

.golden-slot {
  background-color: #FFDB58; /* Color dorado para las tres primeras casillas */
}

.add-attack-slot {
  background-color: #d3d3d3; /* Color gris claro para el cuarto elemento */
}

.add-attack-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  z-index: 1010;
}

.create-button {
  background-color: green; /* Verde pastel */
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

</style>