<script>
import { onMounted } from 'vue';
import { watch } from 'vue';
import CardActor from '../components/CardActor.vue';
import ActorService from '../services/ActorService.js';
import PaginationBar from "@/components/PaginationBar.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {

    components: {
        CardActor,
        PaginationBar,
        SearchBar
    },
    data(){
            return {
                actors: [],
                variables: 
                {
                   
                    orderBy: "id",
                    page: parseInt(this.$route.query.page) || 1,
                    itemsPerPage: 4,
                },
                lastPage: 0,
                totalCount: null,
                loading: false,
                props: actor => ({ actor, actorDetail: true }),
            }
        },
    mounted() {
        this.getActors(this.variables)
        },
    watch: {
            '$route.query.page'(newPage) {
                this.variables.page = parseInt(newPage) || 1
                this.getActors(this.variables)
            },
        },
    methods: {
            async getActors(variables) {
                this.error = null

                this.loading = true
                console.log("Le chargement commence...")

                try {
                    const response = await ActorService.getActors(variables)
                    
                    this.actors = response.data.actors.collection
                    this.lastPage = response.data.actors.paginationInfo.lastPage
                    this.totalCount = response.data.actors.paginationInfo.totalCount 
                    console.log(this.actors)
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
                this.variables.lastname = newSearchTerm
                this.getActors(this.variables)
            },
            updatePage(page) {
                this.variables.page = page;
                this.getActors(this.variables);
            },
        },
}

</script>

<template>
    <div id="search-actor">
        <SearchBar @updatedSearch="search" :totalCount="totalCount"></SearchBar>
        <ul class="actors">
            <!-- Utilisez la boucle v-for pour afficher chaque actor en utilisant le composant Actor -->
            <CardActor v-for="actor in actors" :key="actor._id" :actor="actor" />
        </ul>
        <PaginationBar
      :current-page="variables.page"
      :last-page="lastPage"
      @update-page="updatePage"
    ></PaginationBar>
    </div>
</template>
  