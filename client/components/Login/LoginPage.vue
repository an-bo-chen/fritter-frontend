<!-- Page for account sign-in and registration -->
<!-- User should be NOT authenticated in order to see this page -->

<template>
  <main>
    <header class="back">
        <router-link
            to="/"
            class="backLink"
        >
            ← Back to Home
        </router-link>
    </header>
    <section>
      <header>
        <h2>Sign in to Fritter</h2>
      </header>
      <LoginForm 
        button="Sign In"
      />
      <h4>
        Don't have an account?
        <router-link 
          to="/signup"
          class="routerLink"
        >
          Sign up!
        </router-link>
      </h4>
    </section>
  </main>
</template>

<script>
import LoginForm from '@/components/Login/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
};
</script>

<style scoped>
.back {
    margin-top: 1em;
}
.backLink {
    text-decoration: none;
    color: black;
    margin-top: 1em;
 }
.routerLink {
     text-decoration: none;
 }
</style>
