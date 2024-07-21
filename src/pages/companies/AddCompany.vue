<template>
  <div>
    <section>
      <h2 style="text-align: center">Add a new company</h2>
    </section>
    <base-dialog
      :show="!!error"
      title="An error occured"
      :showClose="true"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <section>
      <company-form @save-data="saveData" :Mode="this.EditMode"></company-form>
    </section>
  </div>
</template>

<script>
import CompanyForm from "../../components/companies/CompanyForm.vue";
export default {
  components: {
    CompanyForm,
  },
  /**
   * A function that returns an object containing error, isLoading, and EditMode properties.
   *
   * @return {Object} The object with error, isLoading, and EditMode properties.
   */
  data() {
    return {
      error: null,
      isLoading: false,
      EditMode: "new",
    };
  },
  methods: {
    /**
     * Clears the error message by setting it to null.
     */
    handleError() {
      this.error = null;
    },
    /**
     * A function that saves company data by dispatching an action to add a new company, updating the router, and handling errors.
     *
     * @param {Object} data - The data of the company to be added.
     */
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("companies/addCompany", data);
        this.$router.push("/companies");
      } catch (error) {
        this.error = error;
      }
      this.isLoading = false;
    },
  },
};
</script>
