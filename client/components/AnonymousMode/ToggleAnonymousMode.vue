<template>
    <section>
        <button 
            @click="toggle"
        >
            Change Mode
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
    </section>
</template>
<script>
import InlineForm from '@/components/common/InlineForm.vue';

export default {
    name: 'ToggleAnonymousMode',
    data() {
        return {
            alerts: {}
        };
    },
    methods: {
        async toggle() {            
            const options = {
                method: 'PATCH',
                body: JSON.stringify({
                    mode: !this.$store.state.isAnonymousMode
                }),
                headers: { 'Content-Type': 'application/json' }
            };

            try {
                const r = await fetch(`/api/anonymousMode/${this.$store.state.username}`, options)
                const res = await r.json();
                if (!r.ok) {
                    throw new Error(res.error);
                }
                
                this.$store.commit('setMode', res.mode.isAnonymousMode);

                this.$store.commit('alert', {
                    message: 'Successfully switched modes!', status: 'success'
                });
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }            
        }
    }
};
</script>

<style scoped>
button {
    background-color: white;
    color: black;
    position: relative;
    border:solid 1px lightgray;
    padding: 0px 10px;
    border-radius: 14px;
    margin-left: 0.25em;
    margin-right: 0.25em;
    font-family: inherit;
    font-size: medium;
    font-weight: bold;
    height: 2em;
}
button:hover {
    background-color: lightgray;
    color: black;
}
</style>
