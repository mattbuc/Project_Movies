<template>
  <teleport to="body">
    <div class="modal-overlay" v-if="isOpen" @click="closeModal">
      <div class="modal-container" @click.stop>
        <h2>Créer une Categorie</h2>
        <form @submit.prevent="submitForm">
          
          <label for="name">Nom de la categorie:</label>
          <input type="text" id="name" v-model="form.name" required>

          <br>
          <button type="submit">Créer</button>
        </form>

        <button @click="closeModal">Fermer</button>
      </div>
    </div>
  </teleport>
</template>

<script>

import CategoriesService from '../services/CategoriesService.js';
import PaginationBar from "@/components/PaginationBar.vue";

export default {
  components: {
    PaginationBar,
  },
  data() {
    return {
      isOpen: false,
      form: {
        name: '',
        // mediaObject: '',
      },
      variables: {
              page: 1,
      lastPage: null,
      totalCount: null,
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
        // Appel à votre fonction de création d'une categorie avec les données du formulaire
        const submitData = await CategoriesService.createCategory({
          name: this.form.name,

          // mediaObject: this.form.mediaObject,
        });
        this.isOpen = false;
        console.log(submitData);
      } catch (error) {
        console.error('Error creating actor:', error);
        this.error = 'Une erreur s\'est produite lors de la création de l\'acteur.';
      }
    },
    

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

.test{
  justify-content: center;
  display: flex;
  align-items: baseline;
}

ul + li {
  list-style-type: none;
  text-decoration: none;
}


</style>