<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  }
}
</script>

<template>
                  <div class="test">
                    <Header/>   
                    <main>                 
                    <router-view />
                    </main>
                  </div>
                      
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.test {
  display: flex;
}

main {
  padding-left: 5%;
  width: 100%;
}

</style>
  
