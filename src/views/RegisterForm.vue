<script>
import UserService from '@/services/UserService.js'
import { onMounted } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useSession } from "../stores/session";

export default {
    name: 'RegisterForm',
    data() {
        return {
            title: 'Inscription',
            error: ''
        }
    },
    methods: {
        async register() {
            this.error = null;
            try {
                const response = await UserService.register({
                    email: this.email,
                    plainPassword: this.password,
                })
                const session = useSession();
                this.$router.push('/login')
            } catch (error) {
                this.error = error.toString()
            }
        }
    }
}
</script>

<template>
    <div id="login-form">

        <form @submit.prevent>
            <h1>{{ title }}</h1>
            <p>Remplissez ce formulaire pour vous connecter.</p>
            <hr>

            <label for="email"><b>Email</b></label>
            <input type="text" v-model="email" placeholder="Entrez votre courriel" id="email" name="email" required>

            <label for="psw"><b>Mot de passe</b></label>
            <input type="password" v-model="password" placeholder="Entrez votre mot de passe" id="password" name="password"
                required>

            <p><button type="submit" @click="register">S'enregistrer</button></p>
            <router-link to="/login"><button>Connexion</button></router-link>
            <p>{{ error }}</p>
            <!-- <p><button type="submit" v-on:submit.prevent="submitLoggin">Se connecter</button></p> -->
        </form>
    </div>
</template>
  
<style scoped></style>