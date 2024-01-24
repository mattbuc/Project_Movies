<template>
    <div>
        <div>
            <h2>Profil</h2>
            <div class="profil">
                <img class="pp" :src="getPicture()" alt="photo de profil" />
                <p>Adresse mail : {{user.email}}</p>
                <button>Modification du profil</button>
            </div>
        </div>

    </div>
</template>

<script>

import { useSession } from "../stores/session";
import { mapState, mapActions } from "pinia";

export default {
        methods: {
            getPicture(picture) {
                  return "http://localhost:8088/WR506D//uploads//" + this.user.picture;
              },
        },
          
          computed: {
          ...mapState(useSession, ["loggedIn", "user"])
      },
};
</script>

<style scoped>
h1 {
    color: black;
}

.profil {
    justify-content: center;
    display: flex;  
    flex-direction: column;
    width: 20%;
    align-items: center;
    margin-left: 20%;
    margin-top: 5%;
}

.pp {
    border-radius: 50%;
}

</style>
