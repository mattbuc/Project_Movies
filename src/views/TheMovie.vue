<script>

import { onMounted } from 'vue';
import { watch } from 'vue';
import CardMovie from '../components/CardMovie.vue';
import FilmService from '../services/FilmService.js';

export default {
    
    components: {
        CardMovie,
    },

}
</script>

<template>
    <div>
        <CardMovie :key="film.id" :film="film" />
    </div>
</template>