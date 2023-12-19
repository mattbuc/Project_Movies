<script>
import CardMovie from '../components/CardMovie.vue';
import FilmService from '../services/FilmService.js';

export default {

    components: {
        CardMovie
    },
    data() {
        return {
            films: [],
            query: null,
        }
    },
    watch: {
        query() {
            this.films = [];
        }
    },
    methods: {
        async fetchData() {
            try {
                this.films = await FilmService.getAll(1, 4);
            } catch (error) {
                console.log(this.films);
                console.error("Error fetching data:", error);
            }
        }
    },
    created() {
        this.fetchData();
        console.log("Films:", this.films);
    }

}

</script>

<template>
    <section>
        <div>
            <h1>Accueil</h1>
            <p>Vous êtes sur la page d'accueil</p>
        </div>
    </section>
    <section>
        <div>
            <h1>Movies</h1>
            <p>Voici les 4 derniers films de notre selection</p>
            <ul class="films">
                <CardMovie v-for="film in films" :key="film.title" :film="film" />
            </ul>
        </div>
    </section>
    <section>
        <div>
            <h1>Acteurs</h1>
            <p>Voici les 4 derniers acteurs de notre selection</p>
        </div>
    </section>
</template>

<style></style>