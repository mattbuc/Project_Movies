<script>

export default {
        props: ["film", "filmDetail"],

};

</script>

<template>
        <li class="film card">
            <img class="poster" :src="film.mediaObject" />
            <p class="title">
                {{ film.title }}
                <br>
            </p>
            <dl>
                <dt v-if="filmDetail">Release date</dt>
                <dd v-if="filmDetail">{{ filmDetail.release_date }}</dd>
                <dt>Director</dt>
                <dd>{{ film.director }}</dd>
                <dt v-if="filmDetail">Actors</dt>
                <dd v-if="filmDetail"></dd>
        </dl>
        <p class="plot">
            {{ film.plot }}
        </p>

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