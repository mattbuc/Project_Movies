<script>
import { onMounted } from 'vue';
import { watch } from 'vue';
import CardMovie from '../components/CardMovie.vue';
import FilmService from '../services/FilmService.js';
import BottomNavBar from "@/components/BottomNavBar.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {

    components: {
        CardMovie,
        BottomNavBar,
        SearchBar
    },
    data(){
            return {
                films: [],
                variables: 
                {
                    // page: parseInt(this.$route.query.page) || 1,
                    // itemsPerPage: 10,
                    title: '',
                    
                    orderBy: "id",
                },
                lastPage: null,
                totalCount: null,

                loading: false
            }
        },
    mounted() {
        this.getMovies(this.variables)
        },
    watch: {
            '$route.query.page'(newPage) {
                this.variables.page = parseInt(newPage) || 1
                this.getMovies(this.variables)
            },
        },
    methods: {
            async getMovies(variables) {
                this.error = null

                this.loading = true
                console.log("Le chargement commence...")

                try {
                    const response = await FilmService.getMovies(variables)
                    
                    this.movies = response.data.movies.collection
                    this.lastPage = response.data.movies.paginationInfo.lastPage
                    this.totalCount = response.data.movies.paginationInfo.totalCount 
                    console.log(this.movies)
                } catch (error) {
                    this.error = error.toString()
                    console.log(this.error)
                } finally {
                    this.loading = false
                    console.log("Le chargement est terminé.")
                    console.log("---------------------------")
                }
            },
            search(newSearchTerm) {
                this.variables.title = newSearchTerm
                this.getMovies(this.variables)
            },
        },
}

</script>

<template>
    <div id="search-film">
        <SearchBar @updatedSearch="search" :totalCount="totalCount"></SearchBar>
        <RouterLink :to="{ name: 'Film', params: { id: film.id }}" v-for="film in films">
        <ul class="films">
            <!-- Utilisez la boucle v-for pour afficher chaque film en utilisant le composant Film -->
            <CardMovie :key="film.id" :film="film" />
        </ul>
        </RouterLink>
        <!-- <bottom-nav-bar /> -->
    </div>
</template>
  