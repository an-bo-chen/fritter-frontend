<template>
    <main>
        <header class="back">
            <router-link
                to="/profile"
                class="backLink"
            >
                ← Back to Profile
            </router-link>
        </header>
        
        <section>
            <header>
                <h2>Followers</h2>
            </header>
        </section>
        <section
                v-if="$store.state.followers.length"
            >
                <FollowComponent
                    v-for="follow in $store.state.followers"
                    :key="follow._id"
                    :username="follow.follower"
                />
            </section>
            <article 
                v-else
            >
                You currently have no followers. Share a new 
                <router-link 
                    to="/"
                    class="routerLink"
                >
                    freet
                </router-link>
                and get noticed!
            </article>
    </main>
</template>
  
<script>
import FollowComponent from '@/components/Follow/FollowComponent.vue';

export default {
    name: 'FollowersPage',
    components: {
        FollowComponent
    }
};
</script>

<style scoped>
.back {
    margin-top: 1em;
}
.backLink {
    text-decoration: none;
    color: black;
    margin-top: 1em;
 }
 .routerLink {
     text-decoration: none;
 }
</style>