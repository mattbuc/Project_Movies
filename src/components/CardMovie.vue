<script>

export default {
    props: ["film"]
}

</script>

<template>
    <li class="film card">
        <img class="poster" :src="film.poster" />
        <p class="title">
            {{ film.title }}
            <br>
        </p>
        <dl>
            <dt>Release date</dt>
            <dd>{{ film.released_date }}</dd>
            <dt>Director</dt>
            <dd>{{ film.director }}</dd>
            <dt>Actors</dt>
            <dd>{{ film.actors }}</dd>
        </dl>
        <p class="plot">
            {{ film.plot }}
        </p>

    </li>
    <br>
</template>