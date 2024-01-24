<template>
  <teleport to="body">
    <div class="modal-overlay" v-if="isOpen" @click="closeModal">
      <div class="modal-container" @click.stop>
        <h2>Créer un Film</h2>
        <form @submit.prevent="submitForm">
          
          <label for="title">Titre:</label>
          <input type="text" id="lastname" v-model="form.title" required>

          <label for="release_date">Date de sortie:</label>
          <input type="text" id="release_date" v-model="form.release_date" required>

          <br>

          <label for="desc">Synopsis:</label>
          <input type="text" id="desc" v-model="form.description" required>

          <br>

          <label for="duration">Durée:</label>
          <input type="text" id="duration" v-model="form.duration" required>

          <br>

          <label for="note">Note:</label>
          <input type="number" id="note" v-model="form.note" required>

          <br>

          <label for="entries">Entrée:</label>
          <input type="number" id="entries" v-model="form.entries" required>

          <br>

          <label for="budget">Entrée:</label>
          <input type="number" id="budget" v-model="form.entries" required>

          <br>

          <label for="notes">note:</label>
          <div v-for="movie in moviesOptions" :key="movie.id">
            <input
              type="checkbox"
              :id="`movie-${movie.id}`"
              v-model="form.movies"
              :value="movie.id"
            />
            <label :for="`movie-${movie.id}`">{{ movie.title }}</label>
            
          </div>
                  <PaginationBar
              :current-page="variables_movies.page"
              :last-page="lastPage || 0"
              @update-page="updatePage"
            ></PaginationBar>

          <br>
          <!-- 
          <label for="mediaObject">Image:</label>
          <input type="image" id="mediaObject" v-model="form.mediaObject" required>

          <br> -->


          <button type="submit">Créer</button>
        </form>

        <button @click="closeModal">Fermer</button>
      </div>
    </div>
  </teleport>
</template>

<script>

import ActorService from '../services/ActorService.js';
import FilmService from '../services/FilmService.js';
import PaginationBar from "@/components/PaginationBar.vue";

export default {
  components: {
    PaginationBar,
  },
  data() {
    return {
      isOpen: false,
      form: {
        lastname: '',
        firstname: '',
        dob: '',
        movies: [],
        reward: '',
        nationality: '',
        // mediaObject: '',
      },
      variables_movies: {
        page: 1,
        itemsPerPage: 5,
        title: '',
      },
      movies: [],
      moviesOptions: [],
      lastPage: null,
      totalCount: null,

    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
      this.loadMovies();
    },
    closeModal() {
      this.isOpen = false;
    },
    async submitForm() {
      try {
        // Appel à votre fonction de création d'acteur avec les données du formulaire
        const submitData = await ActorService.createActor({
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          dob: this.form.dob,
          movies: this.form.movies,
          reward: this.form.reward,
          nationality: this.form.nationality,
          // mediaObject: this.form.mediaObject,
        });
        this.isOpen = false;
        console.log(submitData);
      } catch (error) {
        console.error('Error creating actor:', error);
        this.error = 'Une erreur s\'est produite lors de la création de l\'acteur.';
      }
    },
    async loadMovies() {
      try {
        // Charger les données des films

        const response = await FilmService.getMovies({
          page: this.variables_movies.page,
          itemsPerPage: this.variables_movies.itemsPerPage,
        });
        console.log(response);
        this.movies = response.data.movies.collection;
        this.lastPage = response.data.movies.paginationInfo.lastPage;
        // Charger les options du formulaire à partir des données des films
        this.moviesOptions = this.movies.map(movie => ({ id: movie.id, title: movie.title }));
        console.log(this.moviesOptions);
      } catch (error) {
        console.error('Error loading movies:', error);
      }
    },
  updatePage(page) {
  this.variables_movies.page = page;
  this.loadMovies(this.variables);  // Charger les films avec la nouvelle page
  console.log(this.variables_movies.page);
  console.log(this.variables_movies);
},
  },
  created() {
  this.loadMovies();
},
}

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


</style>