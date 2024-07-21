<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occured"
      :showClose="true"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="refresh">Refresh</base-button>
          <base-button link v-if="hasCompanies" to="/addcompany"
            >Add company</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCompanies">
          <company-item
            v-for="company in filteredCompanies"
            :key="company.ID"
            :ID="company.ID"
            :Name="company.Name"
            :Address="company.Address"
            :City="company.City"
            :Country="company.Country"
            :Email="company.Email"
            :StartTime="company.StartTime"
            :EndTime="company.EndTime"
          ></company-item>
        </ul>
        <h3 v-else-if="!isLoading">
          There are no companies for this user.
          <router-link to="/addcompany">Add one!</router-link>
        </h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CompanyItem from "../../components/companies/CompanyItem.vue";
import * as helpers from "../../helpers.js";
export default {
  /**
   * A function that returns an object with isLoading set to false and error set to null.
   *
   * @return {Object} An object with isLoading set to false and error set to null.
   */
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    CompanyItem,
  },
  computed: {
    /**
     * Retrieves the list of filtered companies from the Vuex store.
     *
     * @return {Array} An array of filtered company objects.
     */
    filteredCompanies() {
      return this.$store.getters["companies/companies"];
    },
    /**
     * Checks if there are any companies available.
     *
     * @return {boolean} Returns true if there are companies available, false otherwise.
     */
    hasCompanies() {
      return !this.isLoading && this.$store.getters["companies/hasCompanies"];
    },
  },
  methods: {
    /**
     * Asynchronously loads companies by dispatching the action "companies/loadCompanies" to the Vuex store.
     *
     * @return {void}
     */
    async loadCompanies() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("companies/loadCompanies");
      } catch (error) {
        this.error =
          `${error.message} in getting companies.` || "Something went wrong!";
      }
      this.isLoading = false;
    },
    /**
     * Refreshes the list of companies asynchronously.
     *
     * @return {Promise} A promise that resolves after loading the companies.
     */
    async refresh() {
      await this.loadCompanies();
    },
    /**
     * Resets the error state by setting the `error` property to `null`.
     *
     * @return {void}
     */
    handleError() {
      this.error = null;
    },
  },
  /**
   * Initializes the component upon creation by loading companies and resetting local storage.
   *
   * @return {void}
   */
  async created() {
    await this.loadCompanies();
    helpers.ResetLocalStorage();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
