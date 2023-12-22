<script>

export default {
  name: "EliminarPlayer",
  methods: {
    deletePlayer()
    {

      fetch("https://balandrau.salle.url.edu/i3/players", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Bearer: localStorage.getItem("token"),
        },
      })
          .then(response =>
          {
            if (!response.ok)
            {
              throw new Error(`Error deleting player. Status: ${response.status}`);
            }

            this.$storage.clearStorageSync();
            this.$router.push ({name: "HomeView"});
          });
    }
  },
};
</script>

<template>
  <div class="imgbackg" alt="Background">
    <main class="popup-delete">
      <p id="deleteplayer">¿Desea eliminar a este jugador?</p>

      <!-- Use router-link for the checkmark image with click event -->
      <router-link to="HomeView" id="imagen-check" @click="deletePlayer">
        <img src="public/InfoPlayerImages/checkmark.png" alt="Checkmark Image" id="imgCheck"/>
      </router-link>

      <router-link to="InfoPlayer" id="imagen-exmark">
        <img src="public/InfoPlayerImages/exmark.png" alt="Exmark Image" id="imgEx"/>
      </router-link>
      <ToastContainer />
    </main>
  </div>
</template>

<style scoped>

.popup-delete {
  border: 2px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  background-color: #2980b9;
  width: 38%;
  height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 25%;
  left: 30%;
}

#deleteplayer {
  font-size: 40px;
  color: #ffffff;
  text-align: center;
  font-family: Asimov;
}

#imagen-check
{
  width: 15%;
  height: 10%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 33%;
  right: 52%;
}

#imagen-exmark
{
  width: 15%;
  height: 10%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 33%;
  left: 53%;
}

#imgCheck
{
  max-width: 70%;
  max-height: 90%;
}

#imgEx {
  max-width: 70%;
  max-height: 90%;
}

@media only screen and (max-width: 1100px)
{
  #imagen-check
  {
    width: 15%;
    height: 10%;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 27%;
    right: 52%;
  }

  #imagen-exmark
  {
    width: 15%;
    height: 10%;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 27%;
    left: 57%;
  }
}

.imgbackg {
  background-image: url("../../public/HomeImages/fondo-de-pagina.png");
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  text-align: center;
}

</style>
