<script>
import InlineForm from '@/components/common/InlineForm.vue';
export default {
  name: 'CreateFollowForm',
  mixins: [InlineForm],
  methods: {
    async submit() {
        const options = {
            method: 'POST', 
            body: JSON.stringify({
                username: this.value
            }),
            headers: {'Content-Type': 'application/json'}
        };

        try {
            const r = await fetch('/api/follows', options);
            
            if (!r.ok) {
                const res = await r.json();
            throw new Error(res.error);
            }
            
            this.$store.commit('refreshFollowing');
            this.$store.commit('refreshWhoToFollow');
            
            this.$store.commit('alert', {
                message: `Successfully followed user ${this.value}`, status: 'success'
            });
        } catch (e) {
            this.$set(this.alerts, e, 'error');
            setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
    }
  }
};
</script>