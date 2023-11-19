<script>
import "../assets/signup.css";
export default {
  name: "SignUp",
};
</script>

<template>
  <div id="imgbackg3" alt="Background">
      <section class="column1">
          <form class="signUp">
              <h2>Sign Up</h2>
              <input class="imgurl-input" type="text" placeholder="Image Url" name="uname" required />
              <input class="playerid-input" type="text" placeholder="Player ID" name="uname" required />
              <input class="password-input" type="password" placeholder="Password" name="psw" required />
            <router-link to="/MenuPrincipal" class="signupButtonTwo">Complete</router-link>
            <router-link to="/" class="signupButtonTwo">Back</router-link>
          </form>
      </section>
  </div>
</template>

<style scoped></style>