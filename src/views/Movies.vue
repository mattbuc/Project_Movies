<script>
import Film from '../components/CardMovie.vue';
import FilmService from '../services/FilmService.js';

export default {

    components: {
        Film
    },
    data() {
        return {
            films: [],
            query: '',
        }
    },
    watch: {
        query() {
            this.films = [];
        }
    },
    mounted() {
        // Permet de faire le focus sur l'input
        this.$refs.boutonSearch.focus();
    },
    methods: {
        async searchFilms() {
            try {
                this.films = await FilmService.search(this.query);
            } catch (error) {
                console.log(this.films);
                console.error(error);
            }
        }
    }
}

</script>

<template>
    <div id="search-film">
        <form @submit.prevent>
            <label for="search">Rechercher :</label>
            <input @input="searchFilms" id="search" type="text" ref="boutonSearch" v-model="query">
        </form>
        <h2>Nombre de films trouvés pour <strong>{{ query }}</strong> : {{ films.length }}</h2>
        <ul class="films">
            <!-- Utilisez la boucle v-for pour afficher chaque film en utilisant le composant Film -->
            <Film v-for="film in films.slice(0, 50)" :key="film.title" :film="film" />
        </ul>
    </div>
</template>
  