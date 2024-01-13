<script>
export default {
  name: "MovementBlock",

  mounted() {
    // Eventos que se configuran cuando el componente se monta
    window.addEventListener('keydown', this.handleKeyPress); // Escuchar eventos de teclado
  },

  beforeUnmount() {
    // Limpieza antes de que el componente se desmonte
    window.removeEventListener('keydown', this.handleKeyPress); // Eliminar el listener de eventos de teclado
  },

  methods: {
    // Maneja las pulsaciones de teclas
    handleKeyPress(event) {
      // Verifica si el jugador está en el juego antes de procesar la tecla
      if (localStorage.getItem('inGame') === 'true') {
        let direction;
        switch (event.key) {
          // Asigna la dirección basada en la tecla presionada
          case 'ArrowUp':
            direction = "up";
            break;
          case 'ArrowDown':
            direction = "down";
            break;
          case 'ArrowLeft':
            direction = "left";
            break;
          case 'ArrowRight':
            direction = "right";
            break;
        }

        // Si se detectó una dirección, realiza el movimiento y el cambio de dirección
        if (direction) {
          this.movePlayer(direction);
          this.changeDirection(direction);
        }
      }
    },

    // Método para mover al jugador
    move(direction) {
      // Verifica si el jugador está en el juego antes de mover
      if (localStorage.getItem('inGame') === 'true') {
        this.movePlayer(direction);
        this.changeDirection(direction);
      }
    },

    // Método para manejar los ataques
    attack(key) {
      // Verifica si el jugador está en el juego antes de atacar
      if (localStorage.getItem('inGame') === 'true') {
        console.log(`Ataque con la tecla ${key}`);
        // Aquí se puede implementar la lógica de ataque
      }
    },

    // Llamada a la API para mover al jugador
    async movePlayer(direction) {
      try {
        const response = await fetch('https://balandrau.salle.url.edu/i3/players/arenas/move', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Bearer: localStorage.getItem("token")
          }, body: JSON.stringify({movement: direction})
        });

        if (response.ok) {
          console.log('Movimiento exitoso');
        } else {
          console.error('Error en el movimiento', await response.json());
        }
      } catch (error) {
        console.error('Error en la solicitud de movimiento', error);
      }
    },

    // Llamada a la API para cambiar la dirección del jugador
    async changeDirection(direction) {
      try {
        const response = await fetch('https://balandrau.salle.url.edu/i3/players/arenas/direction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Bearer: localStorage.getItem("token")
          },
          body: JSON.stringify({direction: direction})
        });

        if (response.ok) {
          console.log('Cambio de dirección exitoso');
        } else {
          console.error('Error en el cambio de dirección', await response.json());
        }
      } catch (error) {
        console.error('Error en la solicitud de cambio de dirección', error);
      }
    }
  }
};
</script>

<template>
  <div>
    <!-- Contenido para dispositivos de escritorio -->
    <img class="desktop-image" src="/MainMenuImages/leyenda-juego.png" alt="Imagen de escritorio">

    <!-- Contenido para dispositivos móviles -->
    <div class="movement-container">
      <h2>Movimiento</h2>
      <div class="grid-container">
        <!-- Botones de movimiento -->
        <div class="div1 up-key"><button class="mov-button" @click="move('up')">↑</button></div>
        <div class="div2 down-key"><button class="mov-button" @click="move('down')">↓</button></div>
        <div class="div3 left-key"><button class="mov-button" @click="move('left')">←</button></div>
        <div class="div4 right-key"><button class="mov-button" @click="move('right')">→</button></div>
        <!-- Botones de ataque -->
        <div class="div5 attack-1"><button class="mov-button" @click="attack('Q')">Q</button></div>
        <div class="div6 attack-2"><button class="mov-button" @click="attack('W')">W</button></div>
        <div class="div7 attack-3"><button class="mov-button" @click="attack('E')">E</button></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/Buttons/ArrowMovementButton.css";

.desktop-image {
  display: block;
  width: 100%;
  height: 100%;
  margin-top: 20%;
  margin-right: auto;
  margin-left: auto;
}

.movement-container {
  display: none;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 { grid-area: 2 / 2 / 3 / 3;}
.div2 { grid-area: 3 / 2 / 4 / 3; }
.div3 { grid-area: 3 / 1 / 4 / 2; }
.div4 { grid-area: 3 / 3 / 4 / 4; }
.div5 { grid-area: 2 / 5 / 3 / 6; }
.div6 { grid-area: 2 / 6 / 3 / 7; }
.div7 { grid-area: 2 / 7 / 3 / 8; }

@media (max-width: 1023px) {
  .movement-container {
    display: block;
  }
  .desktop-image {
    display: none;
  }
}

@media (min-width: 1024px) {
  .desktop-image {
    display: block;
  }
  .movement-container {
    display: none;
  }
}
</style>
