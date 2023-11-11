<script>
import "../assets/home.css";
export default {
  name: "HomeView",
};
</script>

<template>
  <div class="imgbackg" alt="Background">
  </div>
  <div class="text-container">
    <h1>BATTLE ARENA</h1>
    <div class="botones">
    <!-- Usamos router link para pasar a otra vista -->
      <router-link to="/SignUp" class="signupButton">Sign Up</router-link>
      <router-link to="/SignIn" class="signinButton">Sign In</router-link>
    </div>
  </div>

</template>


