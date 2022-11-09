<!-- Default page that also displays freets -->

<template>
  <main>
    <section>
      <header>
        <h2>Anonymous Feed</h2>
      </header>
      <CreateAnonymousFreetForm
        button="Anonymously Freet"
      />
    </section>
    <section>
      <header>
        <div class="left">
          <h2>
            Viewing Anonymous Freets
          </h2>
        </div>
      </header>
      <section
        v-if="$store.state.anonymousFreets.length"
      >
        <AnonymousFreetComponent
          v-for="anonymousFreet in $store.state.anonymousFreets"
          :key="anonymousFreet.id"
          :anonymousFreet="anonymousFreet"
        />
      </section>
      <article
        v-else
      >
        <h3>No anonymous freets found. Be the first to share a anonymous freet!</h3>
      </article>
    </section>
  </main>
</template>

<script>
import AnonymousFreetComponent from '@/components/AnonymousFreet/AnonymousFreetComponent.vue';
import CreateAnonymousFreetForm from '@/components/AnonymousFreet/CreateAnonymousFreetForm.vue';

export default {
  name: 'AnonymousFreetPage',
  components: {AnonymousFreetComponent, CreateAnonymousFreetForm},
  mounted() {
    this.loadAnonymousFreets();
  },
  methods: {
    async loadAnonymousFreets() {
      try {
        const r = await fetch(`/api/anonymousFreets`);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateAnonymousFreets', res);
      } catch (e) {

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
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
