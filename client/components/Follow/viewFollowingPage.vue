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
                <h2>Following</h2>
            </header>
        </section>
        <section
                v-if="$store.state.following.length"
            >
                <FollowComponent
                    v-for="follow in $store.state.following"
                    :key="follow._id"
                    :username="follow.followee"
                />
            </section>
            <article 
                v-else
            >
                You currently are not following anyone. Check out the 
                <router-link 
                    to="/follow"
                    class="routerLink"
                >
                    follow page!
                </router-link>
            </article>
    </main>
</template>
  
<script>
import FollowComponent from '@/components/Follow/FollowComponent.vue';

export default {
    name: 'FollowingPage',
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