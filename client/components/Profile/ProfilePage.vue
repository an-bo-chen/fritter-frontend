<template>
    <main>
        <section>
            <header>
                <h2>Profile</h2>
            </header>
        </section>
        <section class="profile">
            <section>
                <header v-if="$store.state.isAnonymousMode">
                    <h3>@anonymous_user</h3>
                </header>
                <header v-else>
                    <h3>@{{$store.state.username}}</h3>
                </header>
                <header>
                    <h4>Joined: {{ $store.state.dateJoined }}</h4>
                </header>
            </section>
            <section v-if="!$store.state.isAnonymousMode">
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
                    <h3>You are currently in Anonymous Mode</h3>
                </header>
                <header v-else>
                    <h3>You are currently in Public Mode</h3>
                </header>
                <ToggleAnonymousMode />
            </section>
        </section>
        <section
            v-if="$store.state.isAnonymousMode"
        >
            <h2>Your Anonymous Freets</h2>
                <section
                    v-if="anonymousFreets.length"
                >
                <AnonymousFreetComponent
                    v-for="anonymousFreet in anonymousFreets"
                    :key="anonymousFreet.id"
                    :anonymousFreet="anonymousFreet"
                    @updateProfile="loadAnonymousFreets"
                />
                </section>
                <article
                    v-else
                >
                    <h3>
                        Share a new 
                        <router-link to="/anonymous-feed">
                            anonymous freet
                        </router-link>
                        !
                    </h3>
                </article>
        </section>
        <section 
            v-else
        >
            <h2>Your Freets</h2>
            <section
                v-if="freets.length"
            >
                <FreetComponent
                    v-for="freet in freets"
                    :key="freet.id"
                    :freet="freet"
                    @updateProfile="loadFreets"
                />
            </section>
            <article
                v-else
            >
                <h3>
                    Share a new 
                    <router-link to="/">
                        freet
                    </router-link>
                    !
                </h3>
            </article>
        </section>
    </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import AnonymousFreetComponent from '@/components/AnonymousFreet/AnonymousFreetComponent.vue';
import FollowComponent from '@/components/Follow/FollowComponent.vue';
import ToggleAnonymousMode from '@/components/AnonymousMode/ToggleAnonymousMode.vue';

export default {
    name: 'ProfilePage',
    components: {
        FreetComponent,
        AnonymousFreetComponent,
        FollowComponent,
        ToggleAnonymousMode
    },
    data() {
        return {
            freets: [],
            anonymousFreets: []
        };
    },
    created() {
        this.loadFreets(),
        this.loadAnonymousFreets(),
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
        async loadAnonymousFreets() {
            try {
                const r = await fetch(`/api/anonymousFreets?authorId=${this.$store.state.anonymousUserId}`);
                const res = await r.json();
                if (!r.ok) {
                    throw new Error(res.error);
                }

                this.anonymousFreets = res;
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

<style scoped>
.profile {
    border:solid 1px lightgray;
    border-style: solid;
    border-radius: 15px;
    margin-bottom: 1em;
    padding: 1em;
    position: relative;
    width: 70em;
    height: 15em;
}

</style>