<script>

export default {
        props: ["actor"],
        methods: {
        getMediaContentUrl(mediaObject) {
        // Assurez-vous que la propriété 'collection' existe et n'est pas vide
        if (mediaObject && mediaObject.collection && mediaObject.collection.length > 0) {
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
                <dt>Films</dt>
                <dd>{{ actor.movies.collection.movie_id }}</dd>
                <dt>Récompense</dt>
                <dd>{{ actor.reward }}</dd>

            </dl>
            <router-link :to="{ name: 'TheActor', params: { id: actor._id } }">Details</router-link>
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