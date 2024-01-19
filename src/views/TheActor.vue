<script>

import { onMounted } from 'vue';
import { watch } from 'vue';
import CardActor from '../components/CardMovie.vue';
import ActorService from '../services/FilmService.js';

export default {
    
    components: {
        CardActor,
    },
    data() {
        return {
            actor: [],
        }
    },
    methods: {
        async fetchData() {
    try {
        const response = await ActorService.getActorById();
                console.log(response);
        this.actor = response.data.actor.collection;
        console.log(this.actor);

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
    <div>
        <h1>Acteur</h1>
            <h3>{{actor.lastname}} {{actor.firstname}}</h3>
    </div>
</template>