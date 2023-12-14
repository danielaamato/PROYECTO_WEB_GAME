<script>
import "../assets/signup.css";

export default {
  name: "SignUp",

  data() {
    return {
      player_ID: "",
      password: "",
      img: "",
    };
  },

  methods: {
    async signUp()
    {
      const newPlayer = {
        player_ID: this.player_ID,
        password: this.password,
        img: this.img,
      };

      if (this.player_ID === "" || this.password === "" || this.img === "")
      {
        alert("Field all fields!");
      }
      else if (!this.playerIdAndPasswordValid(this.player_ID))
      {
        alert("The player ID must have from 1 to 20 characters!");
      }
      else if (!this.playerIdAndPasswordValid(this.password))
      {
        alert("The password must have from 1 to 20 characters!");
      }
      else
      {
        try
        {
          const response = await fetch(
              "https://balandrau.salle.url.edu/i3/players",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newPlayer),
              }
          );

          if (response.ok) {
            const result = await this.postUser(newPlayer);

            if (result)
            {
              // Redireccionar a la siguiente página
              this.$router.push({ name: "MenuPrincipal" });
            }
            else
            {
              alert(
                  "Failed to register because this player ID is already registered. Please try again."
              );
            }
          }
          else
          {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
          }
        } catch (error)
        {
          console.error(error);
          alert(
              "Failed to register because this player ID is already registered. Please try again."
          );
        }
      }
    },

    async postUser(newPlayer)
    {
      try
      {
        const response = await fetch(
            "https://balandrau.salle.url.edu/i3/players/join",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newPlayer),
            }
        );

        if (response.ok)
        {
          const responseData = await response.json();

          // Guardar el token y otras operaciones aquí si es necesario

          // Devolver true para indicar que la operación fue exitosa
          return true;
        }
        else
        {
          // Manejar errores específicos aquí si es necesario
          alert("Error while using the API");
          return false;
        }
      }
      catch (error)
      {
        console.error(error);
        return false;
      }
    },

    playerIdAndPasswordValid(field) {
      const emailRegex = /^.{1,20}$/;
      return emailRegex.test(field);
    },
  },
};
</script>

<template>
  <div id="imgbackg3" alt="Background">
    <section class="column1">
      <form class="signUp" @submit.prevent="signUp()">
        <h2>Sign Up</h2>
        <input class="imgurl-input"
               type="text"
               placeholder="Image Url"
               name="uname" required
               v-model="img"/>
        <input
            class="playerid-input"
            type="text"
            placeholder="Player ID"
            name="uname" required
            v-model="player_ID"/>
        <input
            class="password-input"
            type="password"
            placeholder="Password"
            name="psw" required
            v-model="password"/>
        <button type="submit" class="signupButtonTwo">Complete</button>
        <router-link to="/" class="signupButtonTwo">Back</router-link>
      </form>
    </section>
  </div>
</template>

<style scoped></style>


<!--
<script>
import "../assets/signup.css";
export default
{
  name: "SignUp",

  data()
  {
    return {
      player_ID: "",
      password: "",
      img: "",
    };
  },
  methods: {
    async signUp()
    {
      const newPlayer = {
        player_ID: this.player_ID,
        password: this.password,
        img: this.img,
      };

      if (this.player_ID === "" || this.password === "" || this.img === "")
      {
        alert("Field all fields!");
      }
      else if (!this.playerIdAndPasswordValid(this.player_ID))
      {
        alert("The player ID must have from 1 to 20 characters!");
      }
      else if (!this.playerIdAndPasswordValid(this.password))
      {
        alert("The password must have from 1 to 20 characters!");
      }
      else
      {
        try
        {
          const response = await
              fetch("https://balandrau.salle.url.edu/i3/players", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newPlayer),

              })
                  .then((res) => {
                    console.log("algo");
                  })
                  .then((response) =>
                  {
                    console.log("algo2");
                    if (response != null)
                    {
                      const result = this.postUser(newPlayer);

                      if (result)
                      {
                        console.log("algo3");
                        this.$router.replace({name: "login"});
                      }
                      else
                      {
                        alert("Failed to register because this player ID is already registered. Please try again.");
                      }
                    }
                  });
        }
        catch (error)
        {
          console.error(error);
          return false;
        }
      }
    },
    playerIdAndPasswordValid(field)
    {
      const emailRegex = /^.{1,20}$/;

      return emailRegex.test(field);
    },
  }
};
</script>

<template>
  <div id="imgbackg3" alt="Background">
      <section class="column1">
          <form class="signUp" @submit.prevent="signUp()">
              <h2>Sign Up</h2>
              <input class="imgurl-input"
                     type="text"
                     placeholder="Image Url"
                     name="uname" required
              v-model="img"/>
              <input
                  class="playerid-input"
                  type="text"
                  placeholder="Player ID"
                  name="uname" required
              v-model="player_ID"/>
              <input
                  class="password-input"
                  type="password"
                  placeholder="Password"
                  name="psw" required
              v-model="password"/>
            <button type="submit" class="signupButtonTwo">Complete</button>
            <router-link to="/" class="signupButtonTwo">Back</router-link>
          </form>
      </section>
  </div>
</template>

<style scoped></style>
-->