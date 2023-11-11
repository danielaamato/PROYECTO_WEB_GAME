<script>
import "../assets/signin.css";
export default {
  name: "SignIn",
};
</script>

<template>
  <div class="imgbackg" alt="Background">
    <div class="row">
      <section class="column1">
        <form class="signIn">
          <div>
            <h2>Sign in</h2>
          </div>
          <div>
            <input class="playerid-input" type="text" placeholder="Player ID" name="uname" required />
          </div>
          <div>
            <input class="password-input" type="password" placeholder="Password" name="psw" required />
          </div>
          <router-link to="/Menu" class="signinButtonTwo">Complete</router-link>
          <router-link to="/" class="signinButtonTwo">Back</router-link>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
