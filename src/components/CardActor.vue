<script>

export default {
        props: ["actor", "actorDetail"],

};

</script>

<template>
        <li class="actor card">
            <p class="name">
                {{ actor.firstname }}{{ actor.lastname }}
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