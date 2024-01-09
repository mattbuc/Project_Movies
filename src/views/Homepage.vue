<script>
import CardMovie from '../components/CardMovie.vue';
import CardActor from '../components/CardActor.vue';
import FilmService from '../services/FilmService.js';
import ActorService from '../services/ActorService.js';

export default {

    components: {
        CardMovie,
        CardActor
    },
    data() {
        return {
            films: [],
            actors: [],
            query: null,
        }
    },
    watch: {
        query() {
            this.films = [];
            this.actors = [];
        }
    },
    methods: {
        async fetchData() {
    try {
        const variables = {
            page: 1,
            itemsPerPage: 4,
            title: '',
        };
        const response = await FilmService.getLastMovie(variables);

        // Vérifiez s'il y a des erreurs dans la réponse GraphQL
        if (response.errors) {
            console.error("GraphQL Error Response:", response.errors);
        } else if (response.data && response.data.movies && response.data.movies.collection) {
            this.films = response.data.movies.collection;
            console.log("GraphQL Response:", this.films);
        } else {
            console.error("GraphQL Response is missing expected structure:", response);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

},
created(){
    this.fetchData();
},
}

</script>

<template>
    <section>
        <div>
            <h1>Accueil</h1>
            <p>Vous êtes sur la page d'accueil</p>
        </div>
    </section>
                <br>
    <section>
        <div>
            <h1>Movies</h1>
            <p>Voici les 4 derniers films de notre selection</p>
                        <br>
            <ul class="films">
                <CardMovie v-for="film in films" :key="film.title" :film="film" />
            </ul>
        </div>
    </section>
    <br>
    <section>
        <div>
            <h1>Acteurs</h1>
            <p>Voici les 4 derniers acteurs de notre selection</p>
                        <br>
            <ul class="actors">
                <CardActor v-for="actor in actors" :key="actors.lastname" :actor="actor" />
            </ul>
        </div>
    </section>
</template>

<style>

.films, .actors {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}



</style>