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
