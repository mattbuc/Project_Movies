<script>

import { onMounted } from 'vue';
import { watch } from 'vue';
import FilmService from '../services/FilmService.js';

export default {
    components: {},
    data() {
        return {
            movie: {},
        };
    },
    methods: {
        async fetchData() {
            try {
                const movieId = "/WR506D/api/movies/" + this.$route.params.id;
                const response = await FilmService.getMovieById(movieId);
                console.log("Information sur le film : ", response);
                console.log(movieId);

                this.movie = response.data.movie;
                console.log(this.movie);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
    },
    created() {
        this.fetchData();
    },
};
</script>

<template>
    <div>
        <h1>Film</h1>
        <div class="actor-details">
            <h3>{{ movie.title }}</h3>
            <p>Sortie le : {{ movie.releaseDate }}</p>
            <p>Note : {{ movie.note }}</p>
            <p>Durée : {{ movie.duration }}</p>
            <p>Genre : {{ movie.categories.collection[0].name }}</p>
            <p>Synopsis : {{ movie.description }}</p>
            <p>Site web: {{ movie.website }}</p>
            <p>Acteur :</p>
            <ul>
                <li v-for="actor in movie.actor.collection" :key="actor.id">{{ actor.lastname }} {{actor.firstname}}</li>
            </ul>
        </div>
    </div>
</template>