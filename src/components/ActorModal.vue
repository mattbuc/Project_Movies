<template>
  <teleport to="body">
    <div class="modal-overlay" v-if="isOpen" @click="closeModal">
      <div class="modal-container" @click.stop>
        <h2>Créer un acteur</h2>
        <form @submit.prevent="submitForm">
          
          <label for="lastname">Nom:</label>
          <input type="text" id="lastname" v-model="form.lastname" required>

          <label for="firstname">Prénom:</label>
          <input type="text" id="firstname" v-model="form.firstname" required>

          <br>

          <label for="dob">Date de naissance:</label>
          <input type="date" id="dob" v-model="form.dob" required>

          <br>

          <label for="reward">Récompense:</label>
          <select id="reward" v-model="form.reward" required>
            Choisir une récompense
            <option value="César">César</option>
            <option value="Oscar">Oscar</option>
            <option value="Palme d'or">Palme d'or</option>
          </select>

          <br>

          <label for="nationality">Nationalité:</label>
          <input type="text" id="nationality" v-model="form.nationality" required>

          <br>

          <label for="movies">Films:</label>
          <div v-for="movie in moviesOptions" :key="movie.id" required>
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
  max-height: 80%;
  overflow-y: auto;
  
  /* Utilisation d'une grille pour aligner les éléments du formulaire */
  display: grid;
  grid-template-columns: 1fr; /* Deux colonnes égales, ajustez selon vos besoins */
  grid-gap: 10px; /* Espacement entre les éléments du formulaire */
}

/* Style pour aligner les labels avec les champs de formulaire */
label {
  display: inline-block;
  width: 100%;
  text-align: left;
  padding-right: 10px; /* Espacement entre le label et le champ de formulaire */
}


</style>