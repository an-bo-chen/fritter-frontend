<template>
    <main>
        <section>
            <header>
                <div class="left">
                    <h2>Who to Follow</h2>
                </div>
                <div class="right">
                    <CreateFollowForm
                        value="username"
                        placeholder="🔍 Find an user to follow!"
                        button="Follow"
                    />
                </div>
            </header>
            <section
                v-if="$store.state.whoToFollow.length"
            >
                <FollowComponent
                    v-for="user in $store.state.whoToFollow"
                    :key="user._id"
                    :username="user.username"
                />
            </section>
            <article
                v-else
            >
                Congrats! You followed everyone on Fritter!
            </article>
        </section>
    </main>
</template>

<script>
import FollowComponent from '@/components/Follow/FollowComponent.vue';
import CreateFollowForm from '@/components/Follow/CreateFollowForm.vue';

export default {
  name: 'FollowPage',
  components: {FollowComponent, CreateFollowForm},
  mounted() {
    this.loadWhoToFollow();
  },
  methods: {
    loadWhoToFollow() {
        this.$store.commit('refreshWhoToFollow');
    }
  }
};  
</script>