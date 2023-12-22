<script>

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
              const { token } = result.response;

              localStorage.setItem("token", token);
              localStorage.setItem("player_ID", newPlayer.player_ID);
              localStorage.setItem("tokenBearer", "Bearer " + localStorage.getItem("token"));

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
          }
        }
        catch (error)
        {
          console.error(error);
          alert(
              "Failed to register because this player ID is already registered. Please try again."
          );
        }
      }
    },

    async postUser(newPlayer) {
      try {
        const response = await fetch("https://balandrau.salle.url.edu/i3/players/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlayer),
        });

        if (response.ok) {
          const responseData = await response.json();

          if (response.status === 200) {
            // Return an object with response property for success
            return { response: responseData };
          } else {
            // Return an object with response property for other HTTP statuses
            return { response: response.statusText };
          }
        } else {
          switch (response.status) {
            case 404:
              alert("Wrong user and/or password");
              return null;
            default:
              this.$router.push({name: "HomeView"});
              alert("Error while using the API");
              return null;
          }
        }
      } catch (error) {
        console.error(error);
        return { response: "Error occurred while processing the request." };
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

<style scoped>

#imgbackg3 {
  background-image: url("../../public/HomeImages/fondo-de-pagina.png");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
}

.column1,
.column2 {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 70%;
  height: 100%;
  margin: 0 auto;
}

@media only screen and (hover: none) and (pointer: coarse) {
  .column2 {
    display: none;
  }
  .signUp {
    position: absolute;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
  }
}

.openEvents-button {
  display: block !important;
}

.signUp {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #2980b9;
  border-radius: 30px;
  width: 330px;
}


.signupButtonTwo {
  top: 50px;
  display: inline !important;
  font-family: Asimov, serif;
  font-size: 25px;
  color: #282828;
  margin-bottom: 10px;
}

form {
  top: 200%;
}

h2 {
  font-size: 70px;
  color: #FFDB58;
  font-family: Asimov, serif;
}

body {
  overflow: hidden;
}

.imgurl-input,
.playerid-input,
.password-input {
  width: 70%; /* Ajusta el ancho de los campos de entrada según tus necesidades */
  margin-bottom: 20px; /* Ajusta el margen inferior según tus necesidades */
}

.playerid-input {
  margin-bottom: 20px; /* Ajusta el margen inferior según tus necesidades */
}

.password-input {
  margin-bottom: 30px; /* Ajusta el margen inferior según tus necesidades */
}

</style>
