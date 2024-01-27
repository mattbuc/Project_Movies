<script>
import { onMounted } from 'vue';
import { watch } from 'vue';
import CategoriesService from '../services/CategoriesService.js';
import PaginationBar from "@/components/PaginationBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import CategorieModal from "@/components/CategorieModal.vue";


export default {

    components: {
        PaginationBar,
        SearchBar,
        CategorieModal
    },
    data(){
            return {
                categories: [],
                variables: 
                {
                   
                    orderBy: "id",
                    page: parseInt(this.$route.query.page) || 1,
                    itemsPerPage: 4,
                },
                lastPage: 0,
                totalCount: null,
                loading: false,
            }
        },
    mounted() {
        this.getCategories(this.variables)
        },
     watch: {
             '$route.query.page'(newPage) {
                 this.variables.page = parseInt(newPage) || 1
                 this.getCategories(this.variables)
             },
         },
    methods: {
            async getCategories(variables) {
                this.error = null

                this.loading = true
                console.log("Le chargement commence...")

                try {
                    const response = await CategoriesService.getCategories(variables)
                    
                    this.categories = response.data.categories.collection
                    this.lastPage = response.data.categories.paginationInfo.lastPage
                    this.totalCount = response.data.categories.paginationInfo.totalCount 
                    console.log(this.categories)
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
                this.variables.name = newSearchTerm
                this.getCategories(this.variables)
            },
                 openCategorieModal() {
                 this.$refs.categorieModal.openModal();
            },
             updatePage(page) {
                this.variables.page = page;
                this.getCategories(this.variables);
            },
        },
        changePage(page) {
            this.variables.page = page;
            this.getCategories(this.variables);
        }
}

</script>

<template>
    <div id="search-category">
        <SearchBar @updatedSearch="search" :totalCount="totalCount"></SearchBar>
                <button @click="openCategorieModal">Ouvrir la modale</button>
        <CategorieModal ref="categorieModal" />
        <ul class="categories">
            
            <li v-for="category in categories" :key="categories._id">
                {{ category.name }}
            </li>
        </ul>
        <PaginationBar
      :current-page="variables.page"
      :last-page="lastPage"
      @update-page="updatePage"
    ></PaginationBar>
    </div>
</template>
  
