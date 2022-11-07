<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'GetFeedForm',
  mixins: [InlineForm],
  data() {
    return {value: this.$store.state.feedfilter};
  },
  methods: {
    async submit() {
      
      try {
        if (this.value !== undefined && this.value !== '' && !this.$store.state.following.map(follow => follow.followee).includes(this.value)) {
          throw new Error('You must enter an author that you are following!')
        }

        const url = this.value ? `/api/freets?author=${this.value}` : '/api/follows/following/freets';

        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        const feed = this.value ? res : res.feed;
        this.$store.commit('updateFeedFilter', this.value);
        this.$store.commit('updateFeed', feed);
      } catch (e) {
        if (this.value === this.$store.state.feedFilter) {
          // This section triggers if you filter to a user but they
          // change their username when you refresh
          this.$store.commit('updateFeedFilter', null);
          this.value = ''; // Clear filter to show all users' freets
          this.$store.commit('refreshFeed');
        } else {
          // Otherwise reset to previous fitler
          this.value = this.$store.state.feedFilter;
        }

        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
