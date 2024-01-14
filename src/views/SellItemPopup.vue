<script>
export default {
  name: "SellItemPopup",
  props: {
    attackId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sellPrice: 0 // Variable para almacenar el precio de venta
    };
  },
  methods: {
    sellItem() {
      // Lógica para vender el ataque
      const url = `https://balandrau.salle.url.edu/i3/shop/attacks/${this.attackId}/sell`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token")
        },
        body: JSON.stringify({ price: this.sellPrice })
      })
          .then(response => {
            if (response.status === 200) {
              alert("Ataque puesto en venta!"); // Log del ataque creado
              this.$emit('attack-sold');
              this.$emit('close'); // Cerrar el popup
            } else {
              // Manejar el error según los datos del JSON
              throw new Error(`Error en la solicitud: Estado ${response.status}`);
            }
          })
          .catch(()=> {
            alert("Error al vender el ataque.");
          });
    }
  }
};
</script>


<template>
  <div class="popup">
    <button class="close-button " @click="$emit('close')">x</button>
    <div class="sell-container">
      <input type="number" v-model="sellPrice" placeholder="Precio de venta" />
      <button class = "CoolButton1" @click="sellItem">Vender</button>
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
  width: 40%;  /* Ancho del popup */
  height: 20%; /* Altura del popup */
}

.sell-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Espacio entre el campo de entrada y el botón */
}

/* Estilos adicionales para el campo de entrada y el botón */
input[type="number"] {
  padding: 5%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2vw;
}

button {
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
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

/* Media query para pantallas menores de 900px */
@media (max-width: 900px) {
  .popup {
    width: 50%;  /* Ancho del popup */
    height: 40%; /* Altura del popup */
  }

  .sell-container {
    flex-direction: column; /* Cambia la dirección a columna */
    width: 80%; /* Ajusta el ancho si es necesario */
  }

  input[type="number"] {
    width: 100%; /* Ajusta el ancho del campo de entrada */
    font-size: 1em; /* Ajusta el tamaño de la fuente para pantallas más pequeñas */
  }

  button {
    width: 100%; /* Ajusta el ancho del botón */
    margin-top: 10px; /* Espacio entre el campo de entrada y el botón */
  }
}
</style>
