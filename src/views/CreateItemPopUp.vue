<script>
export default {
  name: "CreateItemPopup",
  data() {
    return {
      itemName: '', // Nombre del ataque
      itemRange: '', // Rango del ataque en formato (x,y)
      itemImg: 'null'
    };
  },
  methods: {
    createItem() {
      if (this.validateItem()) {
        const attackData = {
          attack_ID: this.itemName,
          positions: this.itemRange,
          img: this.itemImg
        };

        fetch("https://balandrau.salle.url.edu/i3/shop/attacks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Bearer: localStorage.getItem("token")
          },
          body: JSON.stringify(attackData)
        })
            .then(response => {
              if (response.status === 201) {
                alert("Ataque creado!"); // Log del ataque creado
                this.$emit('close'); // Cerrar el popup
              } else {
                // Manejar el error según los datos del JSON
                throw new Error(`Error en la solicitud: Estado ${response.status}`);
              }
            })
            .catch(() => {
              alert("Error al crear el ataque.");
            });
      }
    },
    validateItem() {
      // Validar el nombre del ataque
      if (this.itemName.length < 1 || this.itemName.length > 20) {
        alert("El nombre del ataque debe tener entre 1 y 20 caracteres.");
        return false;
      }

      // Validar el rango del ataque
      const rangePattern = /^\(\d+,\d+\)$/;
      if (!rangePattern.test(this.itemRange)) {
        alert("El rango debe estar en el formato (x,y) con números positivos.");
        return false;
      }

      return true;
    }
  }
};
</script>

<template>
  <div class="popup">
    <button class="close-button" @click="$emit('close')">x</button>
    <div class="create-item-container">
      <input type="text" v-model="itemName" placeholder="Nombre del Ataque" maxlength="20" />
      <input type="text" v-model="itemRange" placeholder="Rango (x,y)" pattern="\\(\\d+,\\d+\\)" />
      <button class="CoolButton1" @click="createItem">Crear</button>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/Frames/PopUp.css";
@import "../assets/Buttons/CloseButton.css";
@import "../assets/Buttons/CoolButton1.css";

.popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 30%;  /* Ancho del popup */
  height: 40%; /* Altura del popup */
}

.create-item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Espacio entre los campos de entrada y el botón */
}

/* Estilos para los campos de entrada */
input[type="text"] {
  padding: 10px;
  width: 80%;
  border-radius: 4px;
  font-size: 1em; /* Ajusta el tamaño de la fuente */
}

/* Estilos para el botón */
.CoolButton1 {
  margin-top: 20%;
  background: #3aa856;
}

.CoolButton1:hover {
  background-color: #fff;
  color: #2a7a3f;
  border: 2px solid #2a793f;
  box-shadow: 5px 5px #2a793f;
}
/* Media query para pantallas menores de 900px */
@media (max-width: 900px) {
  .popup {
    width: 70%;  /* Ancho del popup */
    height: 40%; /* Altura del popup */
  }

  input[type="number"] {
    width: 100%;
    font-size: 1em;
  }
}
</style>

