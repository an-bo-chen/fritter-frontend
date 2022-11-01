<!-- Form for getting freets (all, from user) (inline style) -->
<template>
    <button
        @click="toggle"
    >
    Change Mode!
    </button>
</template>
<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
  name: 'ToggleAnonymousMode',
  methods: {
    async toggle() {      
        const r = await fetch(`/api/anonymousMode/${this.$store.state.username}`, {
            method: 'PATCH',
            body: JSON.stringify({
                mode: !this.$store.state.isAnonymousMode
            }),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        this.$store.commit('setMode', r.mode.isAnonymousMode);
    }
  }
};
</script>
