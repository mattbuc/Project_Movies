<!-- BottomNavBar.vue -->
<template>
  <div class="bottom-nav-bar">
    <router-link to="/page1" class="nav-link" :class="{ active: currentRoute === '/page1' }">Previous</router-link>
    <router-link to="/page2" class="nav-link" :class="{ active: currentRoute === '/page2' }">Next</router-link>
    <!-- Ajoutez d'autres liens de page selon vos besoins -->
  </div>
</template>

<script>
export default {
  computed: {
    nextPage() {
      return this.$route.path;
    },
    previousPage() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
/* Ajoutez du style CSS selon vos préférences */
.bottom-nav-bar {
  bottom: 0;
  right: 10%;
  background-color: #333;
  display: flex;
  justify-content: space-around;
  padding: 10px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 5px;
}

.active {
  font-weight: bold;
}
</style>
