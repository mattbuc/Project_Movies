<script>
import { onMounted } from 'vue';
import { watch } from 'vue';
import CardMovie from '../components/CardMovie.vue';
import FilmService from '../services/FilmService.js';
import BottomNavBar from "@/components/BottomNavBar.vue";

export default {

    components: {
        CardMovie,
        BottomNavBar,
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
        async allMovies() {
    try {
        const response = await FilmService.getMovie();
        this.films = response.data.movies.collection;
        console.log(this.films);
        console.log(this.response);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
        },
        // async searchFilms() {
        //     try {
        //         this.films = await FilmService.getSearchMovie(this.query);
        //     } catch (error) {
        //         console.log(this.films);
        //         console.error(error);
        //     }
        // }
    },
created(){
    this.allMovies();
},
}

</script>

<template>
    <div id="search-film">
        <form @submit.prevent>
            <label for="search">Rechercher :</label>
            <input @input="searchFilms" id="search" type="text" ref="boutonSearch" v-model="query">
        </form>
        <h2>Nombre de films trouvés pour <strong>{{ query }}</strong></h2>
        <ul class="films">
            <!-- Utilisez la boucle v-for pour afficher chaque film en utilisant le composant Film -->
            <CardMovie v-for="film in films" :key="film.id" :film="film" />
        </ul>
        <bottom-nav-bar />
    </div>
</template>
  