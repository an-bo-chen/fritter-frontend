<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="freet"
  >
    <header>
      <h3 class="author">
        @anonymous_user
      </h3>
    </header>
    <textarea
      v-if="editing"
      class="content"
      :value="draft"
      @input="draft = $event.target.value"
    />
    <p
      v-else
      class="content"
    >
      {{ anonymousFreet.content }}
    </p>
    <p class="info">
      Posted at {{ anonymousFreet.dateModified }}
      <i v-if="anonymousFreet.dateModified !== anonymousFreet.dateCreated">(edited)</i>
    </p>
    <section>
      <div
        v-if="$store.state.anonymousUserId === anonymousFreet.anonymousAuthorId"
        class="actions"
      >
        <button
          v-if="editing"
          @click="submitEdit"
        >
          ✅ Save changes
        </button>
        <button
          v-if="editing"
          @click="stopEditing"
        >
          🚫 Discard changes
        </button>
        <button
          v-if="!editing"
          @click="startEditing"
        >
          ✏️ Edit
        </button>
        <button @click="deleteFreet">
          🗑️ Delete
        </button>
      </div>
    </section>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>

<script>
export default {
  name: 'AnonymousFreetComponent',
  props: {
    // Data from the stored anonymous freet
    anonymousFreet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false, // Whether or not this anonymous freet is in edit mode
      draft: this.anonymousFreet.content, // Potentially-new content for this anonymous freet
      alerts: {} // Displays success/error messages encountered during anonymous freet modification
    };
  },
  methods: {
    startEditing() {
      /**
       * Enables edit mode on this anonymous freet.
       */
      this.editing = true; // Keeps track of if a freet is being edited
      this.draft = this.anonymousFreet.content; // The content of our current "draft" while being edited
    },
    stopEditing() {
      /**
       * Disables edit mode on this anonymous freet.
       */
      this.editing = false;
      this.draft = this.anonymousFreet.content;
    },
    deleteFreet() {
      /**
       * Deletes this anonymous freet.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted anonymous freet!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    submitEdit() {
      /**
       * Updates anonymous freet to have the submitted draft content.
       */
      if (this.anonymousFreet.content === this.draft) {
        const error = 'Error: Edited anonymous freet content should be different than current anonymous freet content.';
        this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
        setTimeout(() => this.$delete(this.alerts, error), 3000);
        return;
      }

      const params = {
        method: 'PATCH',
        message: 'Successfully edited anonymous freet!',
        body: JSON.stringify({content: this.draft}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/anonymousFreets/${this.anonymousFreet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshAnonymousFreets');
        this.$emit('updateProfile');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>

.freet {
    border:solid 1px lightgray;
    border-style: solid;
    border-radius: 15px;
    margin-bottom: 1em;
    padding: 1em;
    position: relative;
}
.actions button {
  background-color: white;
  color: black;
  position: relative;
  border:solid 1px lightgray;
  border-radius: 14px;
  margin-left: 0.25em;
  margin-right: 0.25em;
  font-family: inherit;
  font-size: medium;
  font-weight: bold;
  height: 2em;
}
.actions button:hover {
  background-color: lightgray;
  color: black;
}
.content {
  font-weight: bold;
  width: 100em;
}

textarea {
    resize: none;
    max-width: 96.5em;
    font-family: inherit;
}
</style>