<template>
  <teleport to="body">
    <div class="modal-overlay" v-if="isOpen" @click="closeModal">
      <div class="modal-container" @click.stop>
        <h2>Créer un acteur</h2>
        <form @submit.prevent="submitForm">
          <!-- Ajoutez vos champs de formulaire ici -->
          <label for="lastname">Nom:</label>
          <input type="text" id="lastname" v-model="form.lastname" required>

          <label for="firstname">Prénom:</label>
          <input type="text" id="firstname" v-model="form.firstname" required>

          <br>

          <label for="dob">Date de naissance:</label>
          <input type="date" id="dob" v-model="form.dob" required>

          <br>

          <label for="movie">Film:</label>
          <input type="text" id="movie" v-model="form.movies" required>

          <br>

          <label for="reward">Récompense:</label>
          <input type="text" id="reward" v-model="form.reward" required>

          <br>

          <label for="nationality">Nationalité:</label>
          <input type="text" id="nationality" v-model="form.nationality" required>

          <br>

          <label for="mediaObject">Image:</label>
          <input type="image" id="mediaObject" v-model="form.mediaObject" required>

          <br>


          <button type="submit">Créer</button>
        </form>
        <button @click="closeModal">Fermer</button>
      </div>
    </div>
  </teleport>
</template>

<script>

import ActorService from '../services/ActorService.js';

export default {
  data() {
    return {
      isOpen: false,
      form: {
        lastname: '',
        firstname: '',
        dob: '',
        movies: '',
        reward: '',
        nationality: '',
        mediaObject: '',
      },
    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
    async submitForm() {
      try {
        // Appel à votre fonction de création d'acteur avec les données du formulaire
        await ActorService.createActor({
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          dob: this.form.dob,
          movies: this.form.movies,
          reward: this.form.dob,
          nationality: this.form.nationality,
          mediaObject: this.form.mediaObject,
        });
      } catch (error) {
        console.error('Error creating actor:', error);
        this.error = 'Une erreur s\'est produite lors de la création de l\'acteur.';
      }
    },
  },
};
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