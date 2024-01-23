<script>
import { onMounted } from 'vue';
import { watch } from 'vue';
import CardMovie from '../components/CardMovie.vue';
import FilmService from '../services/FilmService.js';
import PaginationBar from "@/components/PaginationBar.vue";
import SearchBar from "@/components/SearchBar.vue";


export default {

    components: {
        CardMovie,
        PaginationBar,
        SearchBar,
    },
    data(){
            return {
                films: [],
                variables: 
                {
                    page: parseInt(this.$route.query.page) || 1,
                    itemsPerPage: 4,
                    
                    
                    orderBy: "id",
                },
                lastPage: 0,
                totalCount: null,

                loading: false,
                props: movie => ({ movie, actorDetail: true }),
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
                    console.log(response);
                    this.films = response.data.movies.collection
                    this.lastPage = response.data.movies.paginationInfo.lastPage
                    this.totalCount = response.data.movies.paginationInfo.totalCount 
                    console.log(this.films)
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
            updatePage(page) {
                this.variables.page = page;
                this.getMovies(this.variables);
            },
        },
}

</script>

<template>
    <div id="search-film">
        <br>
                <h1>Films</h1>
        <SearchBar @updatedSearch="search" :totalCount="totalCount"></SearchBar>
        <ul class="films">
            <!-- Utilisez la boucle v-for pour afficher chaque film en utilisant le composant Film -->
            <CardMovie :key="film.id" :film="film" v-for="film in films" />
        </ul>
        <PaginationBar
      :current-page="variables.page"
      :last-page="lastPage"
      @update-page="updatePage"
    ></PaginationBar>
    <div v-if="loading" class="loading-indicator">Loading...</div>
    </div>
</template>
  