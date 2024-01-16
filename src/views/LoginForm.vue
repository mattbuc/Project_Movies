<script>
import UserService from '@/services/UserService.js'
import { onMounted } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useSession } from "../stores/session";

export default {
    name: 'LoginForm',
    data() {
        return {
            title: 'Authentification',
            error: '',
        }
    },

    methods: {
        async login() {
            this.error = null;
            try {
                const response = await UserService.login({ 
                    username: this.email, 
                    password: this.password })
                    console.log(response);
                const session = useSession();

                session.login({
                     user: {
                            email: response.user.email,
                     }, 
                     token: response.token 
                     });
                this.$router.push('/')
            } catch (error) {
                this.error = error.toString()
            }
        }
    },
    computed: {
        ...mapState(useSession, ['loggedIn'])
    },
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

            <p><button type="submit" @click="login">Se connecter</button></p>
            <router-link to="register"><button>S'inscrire</button></router-link>
            <p>{{ error }}</p>
        </form>
    </div>
</template>

<style scoped></style>
