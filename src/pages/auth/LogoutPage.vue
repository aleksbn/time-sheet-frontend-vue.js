<template>
  <base-card>
    <p>You are being logged out...</p>
  </base-card>
</template>

<script>
export default {
  methods: {
    /**
     * Asynchronously logs the user out by dispatching the "auth/logout" action.
     *
     * @return {Promise<void>} A promise that resolves after the user is logged out.
     */
    async logout() {
      try {
        this.$store.dispatch("auth/logout");
      } catch (error) {
        alert(error);
      }
    },
  },
  /**
   * Lifecycle hook that is called when the component is created.
   *
   * @return {Promise<void>} Resolves when the logout process is completed.
   */
  async created() {
    await this.logout();
    this.$router.replace("/login");
  },
};
</script>
