
<template>
  <teleport to="body">
    <div class="modal-overlay" v-if="isOpen" @click="closeModal">
      <div class="modal-container" @click.stop>
        <h2>Créer un Film</h2>
        <form @submit.prevent="submitForm">
          
          <label for="title">Titre:</label>
          <input type="text" id="title" v-model="form.title" required>

          <br>

          <label for="release_date">Date de sortie:</label>
          <input type="date" id="release_date" v-model="form.releaseDate" required>

          <br>

          <label for="desc">Synopsis:</label>
          <input type="text" id="desc" v-model="form.description" required>

          <br>

          <label for="duration">Durée (minute):</label>
          <input type="numer" id="duration" v-model="form.duration" required>

          <br>

          <label for="note">Note:</label>
          <input type="number" id="note" v-model="form.note" min=0 max=10 required>

          <br>

          <label for="budget">Budget:</label>
          <input type="number" id="budget" v-model="form.budget" required>

          <br>

                    <label for="entree">Entrée:</label>
          <input type="number" id="entree" v-model="form.entries" required>

          <br>

          <label for="director">Réalisateur:</label>
          <input type="text" id="director" v-model="form.director" required>

          <br>

          <label for="website">Site internet  :</label>
          <input type="url" id="website" v-model="form.website" required>

          <br>


          <label for="actors">Acteurs:</label>
          <div v-for="actor in actorsOptions" :key="actor.id">
            <input
              type="checkbox"
              :id="`actor-${actor.id}`"
              v-model="form.actors"
              :value="actor.id"
            />
            <label :for="`actor-${actor.id}`">{{ actor.firstname }} {{ actor.lastname }}</label>
            
          </div>
                  <PaginationBar
              :current-page="variables_actors.page"
              :last-page="lastPage || 0"
              @update-page="updatePage"
            ></PaginationBar>

          <br>

          <label for="catergories">Genre:</label>
          <div v-for="category in categoriesOptions" :key="category.id">
            <input
              type="checkbox"
              :id="`category-${category.id}`"
              v-model="form.categories"
              :value="category.id"
            />
            <label :for="`category-${category.id}`">{{ category.name }}</label>
            
          </div>
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
        title: '',
        releaseDate: '',
        description: '',
        duration: '',
        note: '',
        entries: '',
        budget: '',
        director: '',
        actors: [],
        categories: [],
        website: '',
        // mediaObject: '',
      },
      variables_actors: {
        page: 1,
        itemsPerPage: 5,
        firstname: '',
      },
      variables_categories: {
        page: 1,
        itemsPerPage: 5,
        name: '',
      },
      actors: [],
      actorsOptions: [],
      categories: [],
      categoriesOptions: [],
      lastPage: null,
      totalCount: null,

    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
      // this.loadActors();
    },
    closeModal() {
      this.isOpen = false;
    },
    async submitForm() {
      try {
        // Appel à votre fonction de création d'acteur avec les données du formulaire
        const submitData = await FilmService.createMovie({
          title: this.form.title,
          releaseDate: this.form.releaseDate,
          description: this.form.description,
          duration: this.form.duration,
          note: this.form.note,
          entries: this.form.entries,
          budget: this.form.budget,
          director: this.form.director,
          actor: this.form.actor,
          categories: this.form.categories,
          website: this.form.website,
          // mediaObject: this.form.mediaObject,
        });
        this.isOpen = false;
        console.log(submitData);
      } catch (error) {
        console.error('Error creating actor:', error);
        this.error = 'Une erreur s\'est produite lors de la création de l\'acteur.';
      }
    },
    async loadActors() {
      try {
        // Charger les données des films

        const response = await ActorService.getActors({
          page: this.variables_actors.page,
          itemsPerPage: this.variables_actors.itemsPerPage,
        });
        console.log(response);
        this.actors = response.data.actors.collection;
        this.lastPage = response.data.actors.paginationInfo.lastPage;
        // Charger les options du formulaire à partir des données des films
        this.actorsOptions = this.actors.map(actor => ({ id: actor.id, nom: actor.firstname, lastname: actor.lastname }));
        console.log(this.actorsOptions);
      } catch (error) {
        console.error('Error loading actors:', error);
      }
    },
  updatePage(page) {
  this.variables_actors.page = page;
  this.loadActors(this.variables);  // Charger les films avec la nouvelle page
  console.log(this.variables_actors.page);
  console.log(this.variables_actors);
},
  },
  created() {
  this.loadActors();
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