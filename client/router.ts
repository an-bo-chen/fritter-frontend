import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/Freet/HomePage.vue';
import FeedPage from './components/Freet/FeedPage.vue';
import AnonymousFreetsPage from './components/AnonymousFreet/AnonymousFreetsPage.vue';
import FollowPage from './components/Follow/FollowPage.vue';
import FollowingPage from './components/Follow/ViewFollowingPage.vue';
import FollowersPage from './components/Follow/ViewFollowersPage.vue';
import ProfilePage from './components/Profile/ProfilePage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', name: 'Home', component: HomePage},
  {path: '/feed', name: 'Explore', component: FeedPage},
  {path: '/follow', name: 'Follow', component: FollowPage},
  {path: '/anonymousFreets', name: 'Test', component: AnonymousFreetsPage},
  {path: '/profile', name: 'Profile', component: ProfilePage},
  {path: '/profile/following', name: 'Following', component: FollowingPage},
  {path: '/profile/followers', name: 'Followers', component: FollowersPage},
  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '*', name: 'Not Found', component: NotFound}
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if ((to.name === 'Account' || to.name === 'Profile' || to.name === 'Follow' || to.name === 'Following' || to.name === 'Followers') && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Account or Profile or Follow and are not signed in
      return;
    }
  }

  next();
});

export default router;
