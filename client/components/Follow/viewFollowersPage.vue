<template>
    <main>
        <router-link
            to="/profile"
        >
            ← Back to Profile
        </router-link>
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
                <router-link to="/">
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