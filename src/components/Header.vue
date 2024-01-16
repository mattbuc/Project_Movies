<template>

    <div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar">
				<div class="custom-menu">

        </div>
        <div v-if="!loggedIn">
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <router-link to="/"><span class="fa fa-home mr-3"></span> Accueil</router-link>
          </li>
          <li>
              <router-link to="/login"><span class="fa fa-download mr-3"></span> Se connecter</router-link>
          </li>
          <li>
            <router-link to="/register"><span class="fa fa-gift mr-3"></span> S'inscrire</router-link>
          </li>
          <li>
            <router-link to="/movies"><span class="fa fa-trophy mr-3"></span> Films</router-link>
          </li>
          <li>
            <router-link to="/actors"><span class="fa fa-cog mr-3"></span> Acteurs</router-link>
          </li>
          <li>
            <router-link to="/profil"><span class="fa fa-support mr-3"></span> Profil</router-link>
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
            <router-link to="/"><span class="fa fa-home mr-3"></span> Accueil</router-link>
          </li>
          <li>
            <router-link to="/register"><span class="fa fa-gift mr-3"></span> S'inscrire</router-link>
          </li>
          <li>
            <router-link to="/movies"><span class="fa fa-trophy mr-3"></span> Films</router-link>
          </li>
          <li>
            <router-link to="/actors"><span class="fa fa-cog mr-3"></span> Acteurs</router-link>
          </li>
          <li>
            <router-link to="/profil"><span class="fa fa-support mr-3"></span> Profil</router-link>
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