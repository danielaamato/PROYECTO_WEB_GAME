<script>
import "../assets/signup.css";
export default {
  name: "SignUp",
};
</script>

<template>
  <div class="imgbackg" alt="Background">
    <div class="row">
      <section class="column1">
        <form class="signUp">
          <div>
            <h2>Sign Up</h2>
          </div>
          <div>
            <input class="imgurl-input" type="text" placeholder="Image Url" name="uname" required />
          </div>
          <div>
            <input class="playerid-input" type="text" placeholder="Player ID" name="uname" required />
          </div>
          <div>
            <input class="password-input" type="password" placeholder="Password" name="psw" required />
          </div>
          <router-link to="/MenuPrincipal" class="signupButtonTwo">Complete</router-link>
          <router-link to="/" class="signupButtonTwo">Back</router-link>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped></style>