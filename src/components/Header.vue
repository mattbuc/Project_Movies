<template>
    <!-- <div v-if="!loggedIn"> -->
    <nav>
        <ul>
            <li>
                <router-link to="/" class="link">Accueil</router-link>
            </li>
            <li>
                <router-link to="/login" class="link">Se connecter</router-link>
            </li>
            <li>
                <router-link to="/register" class="link">S'inscrire</router-link>
            </li>
            <li>
                <router-link to="/movie" class="link">Films</router-link>
            </li>
            <li>
                <router-link to="/actors" class="link">Acteurs</router-link>
            </li>
            <li>
                <router-link to="/profil" class="link">Profil</router-link>
            </li>
        </ul>
    </nav>
    <!-- <div id="header" v-else>
        <div class="flex">
            <div>Bonjour, {{ user.email }}</div>
            <div>
                <a @click="submitLogout">Se déconnecter</a>
            </div>
        </div>
    </div> -->
</template>

<script>
// import { useSession } from "../stores/session";
// import { mapState, mapActions } from "pinia";

// export default {
//     data() {
//         return {

//         }
//     },
//     // methods: {
//     //     submitLogout() {
//     //         this.logout()
//     //         this.$router.push("login")
//     //     },
//     //     ...mapActions(useSession, ["logout"])
//     // },
//     // computed: {
//     //     ...mapState(useSession, ["loggedIn", "user"])
//     // },
// }

</script>

<style scoped>
nav {
    background-color: #333;
    overflow: hidden;
    height: 100vh;
    padding-right: 8%;
}

ul {
    justify-content: space-around;
    list-style-type: none;
}

li {
    list-style-type: none;
    text-decoration: none;
}

.link {
    color: white;
    text-decoration: none;
}
</style>