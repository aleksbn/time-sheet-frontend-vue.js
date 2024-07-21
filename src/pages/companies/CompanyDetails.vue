<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occured"
      @close="handleError"
      :showClose="true"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <company-form
      v-if="hasCompany"
      @save-data="saveData"
      @delete-company="deleteCompany"
      :key="company.ID"
      :ID="company.ID"
      :Name="company.Name"
      :Address="company.Address"
      :City="company.City"
      :Country="company.Country"
      :Email="company.Email"
      :Mode="this.EditMode"
      :StartTime="company.StartTime"
      :EndTime="company.EndTime"
    ></company-form>
    <base-card v-else-if="!isLoading">
      <h3>There are some problems with loading of this company.</h3>
    </base-card>
    <base-dialog
      :showClose="false"
      fixed
      title="Select some delete options"
      :show="deleting"
    >
      <company-delete-options @cancel="cancelDeletion"></company-delete-options>
    </base-dialog>
  </div>
</template>

<script>
import CompanyForm from "../../components/companies/CompanyForm.vue";
import CompanyDeleteOptions from "@/components/companies/CompanyDeleteOptions.vue";

export default {
  components: {
    CompanyForm,
    CompanyDeleteOptions,
  },
  props: ["comid"],
  /**
   * Returns an object containing the initial data for the component.
   *
   * @return {Object} An object with the following properties:
   *   - isLoading: {boolean} A flag indicating if the component is currently loading.
   *   - deleting: {boolean} A flag indicating if the component is currently deleting.
   *   - error: {null|string} An error message, if any.
   *   - mode: {boolean} A flag indicating the mode of the component.
   *   - EditMode: {string} The edit mode of the component.
   */
  data() {
    return {
      isLoading: false,
      deleting: false,
      error: null,
      mode: true,
      EditMode: "old",
    };
  },
  methods: {
    /**
     * Save data function that sets isLoading to true, dispatches an editCompany action, pushes to the '/companies' route,
     * catches any errors and sets this.error, and sets isLoading to false.
     *
     * @param {Object} data - The data to be saved.
     */
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("companies/editCompany", data);
        this.$router.push("/companies");
      } catch (error) {
        this.error = error;
      }
      this.isLoading = false;
    },
    /**
     * Cancels the deletion process by setting deleting to false.
     */
    cancelDeletion() {
      this.deleting = false;
    },
    /**
     * Sets the 'deleting' flag to true.
     *
     */
    deleteCompany() {
      this.deleting = true;
    },
    /**
     * Resets the error state of the component by setting the `error` property to `null`.
     *
     * @return {void} This function does not return anything.
     */
    handleError() {
      this.error = null;
    },
    /**
     * Loads company data by dispatching the action "companies/loadCompany" to the Vuex store with the provided company ID.
     *
     * @return {void}
     */
    async loadCompany() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("companies/loadCompany", { id: this.comid });
      } catch (error) {
        this.error =
          `${error.message} in getting company.` || "Something went wrong!";
      }
      this.isLoading = false;
    },
  },
  /**
   * Asynchronously loads the company data and sets the comid and comidwt values in local storage.
   *
   * @return {Promise<void>} A promise that resolves when the company data has been loaded and the local storage values have been set.
   */
  async created() {
    await this.loadCompany();
    localStorage.setItem("comid", this.comid);
    localStorage.setItem("comidwt", this.comid);
  },
  computed: {
    /**
     * Checks if the company exists.
     *
     * @return {boolean} Returns true if the company is not loading and exists in the store, false otherwise.
     */
    hasCompany() {
      return !this.isLoading && this.$store.getters["companies/hasCompany"];
    },
    /**
     * Retrieves the company from the Vuex store.
     *
     * @return {Object} The company object.
     */
    company() {
      return this.$store.getters["companies/company"];
    },
    /**
     * Returns the value of the 'deleting' flag.
     *
     * @return {boolean} The value of the 'deleting' flag.
     */
    deletingDialog() {
      return this.deleting;
    },
  },
};
</script>
