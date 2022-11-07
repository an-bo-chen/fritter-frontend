import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various components.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    anonymousFreets: [], // All anonymous freets created in the app
    feedFilter: null, // Username to filter shown feed by (null = show all)
    feed: [], // Feed for the logged in user
    username: null, // Username of the logged in user
    anonymousUserId: null, // Id of the associated anonymous user
    following: [], // users that the logged in user is following
    followers: [], // users that follow the logged in user
    whoToFollow: [], // users that the logged in user does not currently follow
    isAnonymousMode: null, // true if Anonymous Mode and Public Mode otherwise
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/freets?author=${state.filter}` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },
    updateFeedFilter(state, feedFilter) {
      /**
       * Update the stored feed filter to the specified one.
       * @param feedFilter - Username of the user to fitler feed by
       */
      state.feedFilter = feedFilter;
    },
    updateFeed(state, feed) {
      /**
       * Update the stored feed to the provided feed.
       * @param feed - Feed to store
       */
      state.feed = feed;
    },
    async refreshFeed(state) {
      /**
       * Request the server for the currently available feed.
       */
      const url = state.feedFilter ? `/api/freets?author=${state.feedFilter}` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      const feed = state.feedFilter? res : res.feed;
      state.feed = feed;
    },
    setAnonymousUserId(state, anonymousUserId) {
      /**
       * Update the stored anonymousUserId to the specified one.
       * @param anonymousUserId - new anonymousUserId to set
       */
       state.anonymousUserId = anonymousUserId;
    },
    updateAnonymousFreets(state, anonymousFreets) {
      /**
       * Update the stored anonymous freets to the provided anonymous freets.
       * @param anonymousFreets - Anonymous freets to store
       */
      state.anonymousFreets = anonymousFreets;
    },
    async refreshAnonymousFreets(state) {
      /**
       * Request the server for the currently available anonymous freets.
       */
      const url = '/api/anonymousFreets';
      const res = await fetch(url).then(async r => r.json());
      state.anonymousFreets = res;
    },
    updateFollowing(state, following) {
      /**
       * Update the stored following to the specified one.
       * @param following - new list of following to store
       */
      state.following = following;
    },
    async refreshFollowing(state) {
      /**
       * Request the server for the users currently following the logged in user.
       */
      const url = '/api/follows/following';
      const res = await fetch(url).then(async r => r.json());
      state.following = res.following;
    },
    updateFollowers(state, followers) {
      /**
       * Update the stored followers to the specified one.
       * @param followers - new list of followers to store
       */
      state.followers = followers;
    },
    async refreshWhoToFollow(state) {
      /**
       * Request the server for the users currently not following the logged in user.
       */
      const url = `/api/follows/notfollowing`;
      const res = await fetch(url).then(async r => r.json());
      state.whoToFollow = res;
    },
    setMode(state, mode) {
      /**
       * Update the stored mode to the specified one.
       * @param mode - new mode to set
       */
      state.isAnonymousMode = mode;
    },
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
