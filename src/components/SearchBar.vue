<script>
    export default {
        props: {
            totalCount: null
        },
        data() {
            return {
                search: '',
                searchTimer: null
            }
        },
        watch: {
            search(newSearchTerm) {
                if (this.searchTimer) {
                    clearTimeout(this.searchTimer)
                }

                this.searchTimer = setTimeout(() => {
                    this.$emit('updatedSearch', newSearchTerm)
                }, 500)
            },
        }
    }
</script>

<template>
    <div class="search">
        <form @submit.prevent="">
            <input type="text" id="search" placeholder="Rechercher" v-model="search">
        </form>
        
        <div>
            <div class="results">
                <p><span>{{ totalCount }}</span>&nbsp;résultats trouvés.</p>
            </div>

        </div>
    </div>
</template>