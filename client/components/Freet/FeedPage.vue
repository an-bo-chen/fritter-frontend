<!-- Default page that also displays freets -->

<template>
  <main>
    <header>
      <h2>
        Following Feed
      </h2>
    </header>
    <section>
      <header>
        <div class="left">
          <h2>
            Viewing Following Freets
            <span v-if="$store.state.feedFilter">
              by @{{ $store.state.feedFilter }}
            </span>
          </h2>
        </div>
        <div class="right">
          <GetFeedForm
            ref="getFeedForm"
            value="author"
            placeholder="🔍 Filter by following"
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
        <h3>Don't see any freets in your feed? Check out the 
          <router-link 
            to="/follow"
            class="routerLink"
          >
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
.routerLink {
     text-decoration: none;
 }
</style>
