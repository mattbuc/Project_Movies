<script>

export default {
        props: ["film", "filmDetail"],
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
        <li class="film card">
            <img class="poster" :src="getMediaContentUrl(film.mediaObject)" />
            <p class="title">
                {{ film.title }}
                <br>
            </p>
            <dl>
                <dt>Release date</dt>
                <dd >{{ film.releaseDate }}</dd>
                <dt>Director</dt>
                <dd>{{ film.director }}</dd>

        </dl>
        <router-link :to="{ name: 'TheMovie', params: { id: film._id } }">Details</router-link>
    </li>
    <br>
</template>

<style scoped>
    .film {
        display: inline-block;
        width: 300px;
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 5px #ccc;
    }

    .film .poster {
        width: 100%;
        height: auto;
    }

    .film .title {
        font-weight: bold;
        font-size: 1.2em;
        margin: 10px 0;
    }

    .film dl {
        margin: 0;
        padding: 0;
    }

    .film dt {
        font-weight: bold;
        margin: 5px 0;
    }

    .film dd {
        margin: 0;
        padding: 0;
    }

    .film .plot {
        margin: 10px 0;
    }

</style>