<script>

import { onMounted } from 'vue';
import { watch } from 'vue';
import CardActor from '../components/CardMovie.vue';
import ActorService from '../services/FilmService.js';

export default {
    
    components: {
        CardActor,
    },

}
</script>

<template>
    <div>
        <CardActor :key="actor._id" :actor="actor" />
    </div>
</template>