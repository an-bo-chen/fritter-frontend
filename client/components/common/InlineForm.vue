<!-- Reusable component for a form in an inline style (input and button on same line) -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
  <form @submit.prevent="submit">
    <input
      v-model="value"
      type="text"
      :placeholder="placeholder"
    >
    <button
      type="submit"
    >
      {{ button }}
    </button>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>

<script>
export default {
  name: 'InlineForm',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    button: {
      type: String,
      default: 'Submit'
    }
  },
  data() {
    return {value: '', alerts: {}};
  }
};
</script>

<style scoped>
form {
    display: flex;
    position: relative;
}

input {
    padding: 0 5px;
    min-width: 200px;
    border-radius: 14px;
    border: none;
    border:solid 1px #ccc;
    font-family: inherit;
}

button {
  background-color: white;
  color: black;
  position: relative;
  border-radius: 14px;
  margin-left: 0.5em;
  margin-right: 0.5em;
  font-family: inherit;
  height: 2em;
}

button:hover {
  background-color: lightgray;
  color: black;
}
</style>
