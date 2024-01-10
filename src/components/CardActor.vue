<script>

export default {
        props: ["actor", "actorDetail"],
        methods: {
        getMediaContentUrl(mediaObject) {
        // Assurez-vous que la propriété 'collection' existe et n'est pas vide
        if (mediaObject && mediaObject.collection && mediaObject.collection.length > 0) {
                    console.log("erreur : ",mediaObject.collection);
            return "http://localhost:8088/WR506D/"+ mediaObject.collection[0].contentUrl;

        }
        },
    },

};

</script>

<template>
        <li class="actor card">
        <img class="poster" :src="getMediaContentUrl(actor.mediaObject)" />
            <p class="name">
                {{ actor.firstname }} {{ actor.lastname }}
                <br>
            </p>
            <dl>
                <dt v-if="actorDetail">Films</dt>
                <dd v-if="actorDetail">{{ actorDetail.actor.movies.title }}</dd>
                <dt>Récompense</dt>
                <dd>{{ actor.reward }}</dd>
                <dt v-if="actorDetail">Actors</dt>
                <dd v-if="actorDetail"></dd>
        </dl>

    </li>
    <br>
</template>

<style scoped>
    .actor {
        display: inline-block;
        width: 300px;
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 5px #ccc;
    }

        .actor .poster {
        width: 100%;
        height: auto;
    }

    .actor .name {
        font-weight: bold;
        font-size: 1.2em;
        margin: 10px 0;
    }

    .actor dl {
        margin: 0;
        padding: 0;
    }

    .actor dt {
        font-weight: bold;
    }

    .actor dd {
        margin-left: 10px;
    }

    .actor .plot {
        margin: 10px 0;
    }
</style>