<template>
  <div>
    <base-card>
      <user-form
        v-if="hasCurrentUser"
        :Mode="'old'"
        :key="currentUser.Email"
        :FirstName="currentUser.FirstName"
        :LastName="currentUser.LastName"
        :Email="currentUser.Email"
      ></user-form>
      <p v-else>There's something wrong with loading of the user data.</p>
    </base-card>
  </div>
</template>

<script>
import UserForm from "../../components/auth/UserForm.vue";

export default {
  components: {
    UserForm,
  },
  methods: {
    /**
     * Loads the user data from the authentication store.
     *
     * @return {Promise<void>} A promise that resolves when the user data is successfully loaded.
     */
    async loadUser() {
      await this.$store.dispatch("auth/getUser");
    },
  },
  computed: {
    /**
     * Retrieves the current user from the authentication store.
     *
     * @return {Object|null} The current user object, or null if no user is logged in.
     */
    currentUser() {
      return this.$store.getters["auth/currentUser"];
    },
    /**
     * Checks if the current user is present in the state object.
     *
     * @param {Object} state - The state object containing the current user.
     * @return {boolean} Returns true if the current user is present, otherwise false.
     */
    hasCurrentUser() {
      return this.$store.getters["auth/hasCurrentUser"];
    },
  },
  /**
   * Executes the necessary actions when the component is created.
   *
   * @return {Promise<void>} A promise that resolves once the user data is loaded.
   */
  async created() {
    await this.loadUser();
  },
};
</script>
