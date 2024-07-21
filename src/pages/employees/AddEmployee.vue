<template>
  <div>
    <section>
      <h2 style="text-align: center">Add a new employee</h2>
    </section>
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
    <section>
      <employee-form
        @save-data="saveData"
        :Mode="this.EditMode"
      ></employee-form>
    </section>
  </div>
</template>

<script>
import EmployeeForm from "../../components/employees/EmployeeForm.vue";
export default {
  components: {
    EmployeeForm,
  },
  /**
   * Returns an object containing the initial data for the component.
   *
   * @return {Object} An object with the following properties:
   *   - error: {null|string} An error message, if any.
   *   - isLoading: {boolean} A flag indicating if the component is currently loading.
   *   - EditMode: {string} The edit mode of the component.
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
     * A method to handle errors by setting the error to null.
     */
    handleError() {
      this.error = null;
    },
    /**
     * Asynchronously saves the provided data by dispatching an action to add the employee to the store.
     * If successful, navigates to the employees page with the company ID from local storage.
     * If an error occurs, sets the error property of the component to the caught error.
     *
     * @param {Object} data - The data to be saved.
     * @return {Promise<void>} A promise that resolves when the data is saved and the navigation is complete.
     */
    async saveData(data) {
      try {
        await this.$store.dispatch("employees/addEmployee", data);
        this.$router.push(`/employees/ + ${localStorage.getItem("comid")}`);
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>
