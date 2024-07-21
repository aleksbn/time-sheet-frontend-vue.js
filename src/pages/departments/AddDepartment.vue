<template>
  <div>
    <section>
      <h2 style="text-align: center">Add a new department</h2>
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
      <department-form
        @save-data="saveData"
        :Mode="this.EditMode"
      ></department-form>
    </section>
  </div>
</template>

<script>
import DepartmentForm from "../../components/departments/DepartmentForm.vue";
export default {
  components: {
    DepartmentForm,
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
     * A method that handles errors by setting the error to null.
     *
     * @return {void} No return value.
     */
    handleError() {
      this.error = null;
    },
    /**
     * Asynchronously saves data for a new department.
     *
     * @param {Object} data - The data to save for the new department
     * @return {Promise<void>} A promise that resolves when the data is saved successfully, or rejects with an error
     */
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("departments/addDepartment", data);
        this.$router.push(`/departments/${localStorage.getItem("comid")}`);
      } catch (error) {
        this.error = error;
      }
      this.isLoading = false;
    },
  },
};
</script>
