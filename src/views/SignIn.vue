<script>
import "../assets/signin.css";
export default {
  name: "SignIn",

  data()
  {
    return {
      player_ID: "",
      password: "",
    }
  },

  methods: {
    async login()
    {
      const player =
          {
            player_ID: this.player_ID,
            password: this.password,
          };

      const result = await this.postUser(player);

      if (result.success)
      {
        // Si la respuesta es exitosa, result.response es la respuesta del servidor como texto
        const { accessToken } = JSON.parse(result.response);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("player_ID", player.player_ID);
        localStorage.setItem("tokenBearer", "Bearer " + localStorage.getItem("token"));

        await this.$router.push({ name: "MenuPrincipal" });
      }
      else
      {
        // Si hay un error, result.response es el mensaje de error como texto
        alert("Error: Incorrect username or password");
      }
    },

    async postUser(player) {
      try
      {
        const response = await fetch
        (
            "https://balandrau.salle.url.edu/i3/players/join",
            {
              method: "POST",
              headers:
                  {
                "Content-Type": "application/json",
              },

              body: JSON.stringify(player),
            }
        );

        const responseText = await response.text();

        if (response.status === 200 || response.status === 201)
        {
          return { success: true, response: responseText };
        }
        else
        {
          return { success: false, response: responseText };
        }
      }
      catch (error)
      {
        return { success: false, error: error };
      }
    },
  },
};

</script>

<template>
  <div id="imgbackg2" alt="Background">
      <section class="column1">
        <form class="signIn" @submit.prevent="login">
          <div>
            <h2>Sign in</h2>
          </div>
          <div>
            <input class="playerid-input"
                   type="text"
                   placeholder="Player ID"
                   name="uname" required
                   v-model="player_ID"/>
          </div>
          <div>
            <input class="password-input"
                   type="password"
                   placeholder="Password"
                   name="psw" required
                   v-model="password"/>
          </div>
          <button type="submit" class="signinButtonTwo">Complete</button>
          <router-link to="/" class="signinButtonTwo">Back</router-link>
        </form>
      </section>
  </div>
</template>

<style scoped></style>
*/
