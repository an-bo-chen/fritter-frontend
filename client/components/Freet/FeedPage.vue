<!-- Default page that also displays freets -->

<template>
  <main>
    <section>
      <header>
        <h2>Check out what your followers saying on Fritter!</h2>
      </header>
    </section>
    <section>
      <header>
        <div class="left">
          <h2>
            Viewing Feed
            <span v-if="$store.state.feedFilter">
              by @{{ $store.state.feedFilter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetFeedForm
            ref="getFeedForm"
            value="author"
            placeholder="🔍 Filter by following (optional)"
            button="🔄 Get freets"
          />
        </div>
      </header>
      <section
        v-if="$store.state.feed.length"
      >
        <FreetComponent
          v-for="freet in $store.state.feed"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No freets in feed. Check out the 
          <router-link to="/follow">
            follow page!
          </router-link>
        </h3>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import GetFeedForm from '@/components/Freet/GetFeedForm.vue';

export default {
  name: 'FeedPage',
  components: {FreetComponent, GetFeedForm},
  mounted() {
    this.$refs.getFeedForm.submit();
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
