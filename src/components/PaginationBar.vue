<template>
  <div class="pagination-bar">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Précédent</button>
    <span>{{ currentPage }} / {{ lastPage }}</span>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === lastPage">Suivant</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.lastPage) {
        this.$emit('update-page', page);
      }
    },
  },
};
</script>

<style scoped>
.pagination-bar {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  cursor: pointer;
}
</style>