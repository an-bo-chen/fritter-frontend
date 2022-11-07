<template>
    <main>
        <section>
            <header>
                <h2>@{{$store.state.username}}</h2>
            </header>
        </section>
        <section>
            <router-link 
                to="/profile/following"
            >
                {{$store.state.following.length}} Following
            </router-link>
            <router-link 
                to="/profile/followers"
            >
                {{$store.state.followers.length}} Followers
            </router-link>
        </section>
        <section>
            <header v-if="$store.state.isAnonymousMode">
                <h2>Anonymous Mode</h2>
            </header>
            <header v-else>
                <h2>Public Mode</h2>
            </header>
            <ToggleAnonymousMode />
        </section>
        <section>
            <h2>Your Posts</h2>
            <section
                v-if="freets.length"
            >
                <FreetComponent
                    v-for="freet in freets"
                    :key="freet.id"
                    :freet="freet"
                />
            </section>
            <article
                v-else
            >
                <h3>Create a new post!</h3>
            </article>
        </section>
    </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import FollowComponent from '@/components/Follow/FollowComponent.vue';
import ToggleAnonymousMode from '@/components/AnonymousMode/ToggleAnonymousMode.vue';

export default {
    name: 'ProfilePage',
    components: {
        FreetComponent,
        FollowComponent,
        ToggleAnonymousMode
    },
    data() {
        return {
            freets: [],
        };
    },
    created() {
        this.loadFreets(),
        this.loadFollowing(),
        this.loadFollowers()
    },
    methods: {
        async loadFreets() {
            try {
                const r = await fetch(`/api/freets?author=${this.$store.state.username}`);
                const res = await r.json();
                if (!r.ok) {
                    throw new Error(res.error);
                }

                this.freets = res;
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        },
        async loadFollowing() {
            try {
                const r = await fetch(`/api/follows/following`);
                const res = await r.json();
                if (!r.ok) {
                    throw new Error(res.error);
                }

                this.$store.commit('updateFollowing', res.following)
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        },
        async loadFollowers() {
            try {
                const r = await fetch(`/api/follows/followers`);
                const res = await r.json();
                if (!r.ok) {
                    throw new Error(res.error);
                }

                this.$store.commit('updateFollowers', res.followers)
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        }
    }
};
</script>