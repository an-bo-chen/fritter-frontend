<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';

export default {
  name: 'App',
  components: {NavBar},
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/users/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(res => {
      const user = res.user;
      this.$store.commit('setUsername', user ? user.username : null);
      this.$store.commit('setDateJoined', user ? user.dateJoined : null);
    });

    if (this.$store.state.username) {
      fetch(`/api/anonymousMode/${this.$store.state.username}`, {
        credentials: 'same-origin'
      }).then(res => res.json()).then(res => {
        const mode = res.mode.isAnonymousMode;
        this.$store.commit('setMode', mode);
      });
      
      fetch(`/api/anonymousUsers/${this.$store.state.username}`, {
        credentials: 'same-origin'
      }).then(res => res.json()).then(res => {
        const anonymousUserId = res.anonymousUser._id
        this.$store.commit('setAnonymousUserId', anonymousUserId);
      });
    }

    // Clear alerts on page refresh
    this.$store.state.alerts = {};
  }
};
</script>

<style>
/* Chirp font family obtained at https://www.cdnfonts.com/chirp-2.font */
@import url('https://fonts.cdnfonts.com/css/chirp-2');

* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  flex-direction: column;
  display: flex;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
  font-family: "Chirp";
}

main {
  padding: 0 5em 5em;
  font-family: "Chirp";
}

.alerts {
    position: absolute;
    z-index: 99;
    bottom: 0;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10%);
    width: 100%;
    text-align: center;
}

.alerts article {
    border-radius: 5px;
    padding: 10px 20px;
    color: #fff;
}

.alerts p {
    margin: 0;
}

.alerts .error {
    background-color: rgb(166, 23, 33);
}

.alerts .success {
    background-color: rgb(45, 135, 87);
}
</style>
