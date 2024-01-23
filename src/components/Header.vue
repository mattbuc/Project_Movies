<template>

    <div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar">
				<div class="custom-menu">

        </div>
        <div v-if="!loggedIn">
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <a @click="goToHome"><span class="fa fa-home mr-3"></span> Accueil</a>
          </li>
          <li>
              <a @click="goToLogin"><span class="fa fa-download mr-3"></span> Se connecter</a>
          </li>
          <li>
            <a @click="goToRegister"><span class="fa fa-gift mr-3"></span> S'inscrire</a>
          </li>
          <li>
            <a @click="goToMovies"><span class="fa fa-trophy mr-3"></span> Films</a>
          </li>
          <li>
            <a @click="goToActors"><span class="fa fa-cog mr-3"></span> Acteurs</a>
          </li>
          <li>
            <a @click="goToProfil"><span class="fa fa-support mr-3"></span> Profil</a>
          </li>
        </ul>
        </div>
        <div id="header" v-else>
        <div class="img bg-wrap text-center py-4" style="background-image;">
	  			<div class="user-logo">
	  				<img class="img" style="background-image;" :src="getPicture()" alt="Image de profil">
	  				<h3>{{ user.email }}</h3>
	  			</div>
	  		</div>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <a @click="goToHome"><span class="fa fa-home mr-3"></span> Accueil</a>
          </li>
          <li>
            <a @click="goToRegister"><span class="fa fa-gift mr-3"></span> Ajouter un compte</a>
          </li>
          <li>
            <a @click="goToMovies"><span class="fa fa-trophy mr-3"></span> Films</a>
          </li>
          <li>
            <a @click="goToActors"><span class="fa fa-cog mr-3"></span> Acteurs</a>
          </li>
          <li>
            <a @click="goToProfil"><span class="fa fa-support mr-3"></span> Profil</a>
          </li>
          <li>
            <a @click="submitLogout"><span class="fa fa-sign-out mr-3"></span> Se déconnecter</a>
          </li>
        </ul>
            
        </div>
            	</nav>
		</div>
</template>

<script>
import { useSession } from "../stores/session";
import { mapState, mapActions } from "pinia";
import '../assets/css/style.css';
import '../assets/css/bootstrap.min.css';



export default {
    data() {
         return {

         }
     },
      methods: {
          submitLogout() {
              this.logout()
             this.$router.push("login")
          },

          getPicture(picture) {
                  return "http://localhost:8088/WR506D//uploads//" + this.user.picture;
              },
          ...mapActions(useSession, ["logout"]),
          goToHome() {
              this.$router.push({ name: 'Home' });
          },
          goToRegister() {
              this.$router.push({ name: 'Register' });
          },
          goToLogin() {
              this.$router.push({ name: 'Login' });
          },
          goToMovies() {
              this.$router.push({ name: 'Movies' });
          },
          goToActors() {
              this.$router.push({ name: 'Actors' });
          },
          goToProfil() {
              this.$router.push({ name: 'Profil' });
          },
      },
      computed: {
          ...mapState(useSession, ["loggedIn", "user"])
      },
 }

</script>

<style scoped>

/* nav {
    background-color: #333;
    overflow: hidden;
    height: 100vh;
    padding-right: 8%;
    position: fixed;
} */

/* ul {
    justify-content: space-around;
    list-style-type: none;
}

li {
    list-style-type: none;
    text-decoration: none;
} */

.wrapper{
    position: fixed;
    height: 100vh;
    width: 0%;
}

.link {
    color: white;
    text-decoration: none;
}
</style>