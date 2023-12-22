<script>
export default {
  name: "HomeView",

  mounted(){
    localStorage.setItem("token", null);
  },
};
</script>

<template>

  <div id="imgbackg1" alt="Background">
    <div class="dispback">
        <h1>BATTLE ARENA</h1>
          <router-link to="/SignUp" class="signupButton">Sign Up</router-link>
          <router-link to="/SignIn" class="signinButton">Sign In</router-link>
    </div>
  </div>

</template>
<style scoped>

#imgbackg1 {
  background-image: url("../../public/HomeImages/fondo-de-pagina.png");
  width: 100%;
  height: 100vh;
  text-align: center;
}

h1 {
  color: #FFDB58;
  font-family: Asimov, serif;
  font-size: 80px;
  margin-top: 150px;
}

.signupButton,
.signinButton {
  display: block; /* Hacemos que los enlaces sean bloques para que estén uno debajo del otro */
  margin-bottom: 10px; /* Ajustamos el espacio entre los enlaces según tus preferencias */
  background-color: #FFA500;
  color: #fff;
  padding: 15px 130px;
  font-family: Asimov, serif;
  font-size: 30px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  margin-left: 10px;
}

.signupButton:hover,
.signinButton:hover {
  background-color: #2980b9;
}

.dispback{
  align-items: center;
  flex-direction: column;
  display: flex;
}

</style>


