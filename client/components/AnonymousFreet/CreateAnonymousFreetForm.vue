<!-- Form for creating freets (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateAnonymousFreetForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/anonymousFreets',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'content', label: 'Content', value: ''}
      ],
      title: 'Post Your Private Thoughts!',
      button: 'Anonymously Freet',
      refreshAnonymousFreets: true,
      callback: () => {
        const message = 'Successfully created an anonmous freet!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>

<style scoped>
form {
  border:solid 1px #ccc;
  border-style: solid;
  border-radius: 8px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1em;
  position: relative;
}
article > div {
  display: flex;
  flex-direction: column;
}
form > article p {
  margin: 0;
}
form h3,
form > * {
  margin: 0.3em 0;
}
form h3 {
  margin-top: 0;
}

button {
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 50px;
  width: 12em;
  height: 2em;
  font-family: inherit;
  font-weight: bold;
}

button:hover {
  background-color: #1581c4;
}
textarea {
  border:solid 1px #ccc;
  resize: none;
  font-family: inherit;
  font-size: inherit;
}
</style>
