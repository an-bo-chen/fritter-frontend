<template>
    <article
        class="follow"
    >
        <header>
            <h3>
                @{{ username }}
            </h3>
        </header>
        <section>
            <button
                v-if="isFollowing"
                @click="unfollow"
            >
                Unfollow
            </button>
            <button
                v-else
                @click="follow"
            >
                Follow
            </button>
        </section>
    </article>
</template>

<script>

export default {
    name: 'FollowComponent',
    props: {
        username: String,
        required: true
    },
    data() {
      return {
        isFollowing: false,
        alerts: {}
      };  
    },
    mounted() {
        this.loadFollowing();
    },
    methods: {
        loadFollowing() {
            this.isFollowing = this.$store.state.following.map(follow => follow.followee).includes(this.username);
        },
        follow() {
            const params = {
                url: `/api/follows`,
                method: 'POST',
                body: JSON.stringify({
                    username: this.username
                }),
                callback: () => {
                    this.$store.commit('alert', {
                        message: `Successfully followed user ${this.username}`, status: 'success'
                    });
                }
            };
            this.request(params);
            this.isFollowing = true;
        },
        unfollow() {
            const params = {
                url: `/api/follows/${this.username}`,
                method: 'DELETE',
                callback: () => {
                    this.$store.commit('alert', {
                        message: `Successfully unfollowed user ${this.username}`, status: 'success'
                    });
                }
            };
            this.request(params);
            this.isFollowing = false;
        },
        async request(params) {
            /**
             * Submits a request to the follow's endpoint
             * @param params - Options for the request
             * @param params.body - Body for the request
             * @param params.callback - Function to run if the request succeeds
             */
            const options = {
                method: params.method, headers: {'Content-Type': 'application/json'}
            };

            if (params.body) {
                options.body = params.body;
            }

            try {
                const r = await fetch(params.url, options);
                if (!r.ok) {
                    const res = await r.json();
                    throw new Error(res.error);
                }

                this.$store.commit('refreshFollowing');
                this.$store.commit('refreshWhoToFollow');

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
.follow {
    border:solid 1px lightgray;
    border-style: solid;
    border-radius: 15px;
    margin-bottom: 1em;
    padding: 1em;
    position: relative;
}

button {
  background-color: white;
  color: black;
  position: relative;
  border:solid 1px lightgray;
  border-radius: 14px;
  margin-left: 0.25em;
  font-family: inherit;
  font-size: large;
  font-weight: bold;
  height: 2em;
}

 button:hover {
  background-color: lightgray;
  color: black;
}
</style>