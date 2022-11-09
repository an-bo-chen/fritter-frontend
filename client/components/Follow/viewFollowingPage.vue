<template>
    <main>
        <router-link
            to="/profile"
        >
            ← Back to Profile
        </router-link>
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
                <router-link to="/follow">
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