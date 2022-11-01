<template>
    <main>
        <section>
            <header>
                <h2>Look at your profile!</h2>
            </header>
        </section>
        <section v-if="$store.state.isAnonymousMode">
            <header>
                <h2>Anonymous Mode</h2>
            </header>
        </section>
        <section v-else>
            <header>
                <h2>Public Mode</h2>
            </header>
        </section>
        <section>
            <ToggleAnonymousMode />
        </section>
    </main>
</template>

<script>
import ToggleAnonymousMode from '@/components/AnonymousMode/ToggleAnonymousMode.vue';

export default {
    name: 'ProfilePage',
    components: {ToggleAnonymousMode},

};
</script>