<template>
    <div>
        <h1>Acteur</h1>
        <div class="actor-details">
            <h3>{{ actor.lastname }} {{ actor.firstname }}</h3>
            <p>Date de naissance : {{ actor.dob }}</p>
            <p>Nationalité : {{ actor.nationality }}</p>
            <p>Filmographie :</p>
            <ul>
                <li v-for="movie in actor.movies.collection" :key="movie.id">{{ movie.title }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { watch } from 'vue';
import ActorService from '../services/ActorService.js';

export default {
    components: {},
    data() {
        return {
            actor: {},
        };
    },
    methods: {
        async fetchData() {
            try {
                const actorId = "/WR506D/api/actors/" + this.$route.params.id;
                const response = await ActorService.getActorById(actorId);
                console.log("Information sur l'acteur : ", response);

                this.actor = response.data.actor;
                console.log(this.actor);
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

<style scoped>
.actor-details {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 50%;
}

ul {
    list-style-type: none;
}

</style>