<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header
        v-if="$store.state.isAnonymousMode"
      >
      <h2>Account settings for @anonymous_user</h2>
      </header>
      <header v-else>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header>
      <ChangeUsernameForm 
        button="Change Username"
      />
      <ChangePasswordForm
        button="Change Password"
      />
    </section>
    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <LogoutForm 
        button="Sign Out"
      />
      <DeleteAccountForm 
        button="Delete Account"
      />
    </section>
  </main>
</template>

<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm
  }
};
</script>
