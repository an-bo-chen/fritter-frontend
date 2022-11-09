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
            <section
                v-else
            >
                <p>Congrats! You followed everyone on Fritter!</p>
            </section>
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

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>