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
    <department-form
      v-else-if="hasDepartment"
      @save-data="saveData"
      @delete-department="deleteDepartment"
      :key="department.ID"
      :comid="this.comid"
      :ID="department.ID"
      :Name="department.Name"
      :Mode="this.EditMode"
    ></department-form>
    <h3 v-else-if="!isLoading">
      There's some problems with loading of this department.
    </h3>
    <base-dialog
      :showClose="false"
      fixed
      title="Select some delete options"
      :show="deleting"
    >
      <department-delete-options
        @cancel="cancelDeletion"
      ></department-delete-options>
    </base-dialog>
  </div>
</template>

<script>
import DepartmentForm from "../../components/departments/DepartmentForm.vue";
import DepartmentDeleteOptions from "@/components/departments/DepartmentDeleteOptions.vue";

export default {
  components: {
    DepartmentForm,
    DepartmentDeleteOptions,
  },
  props: ["depid", "comid"],
  /**
   * Returns an object containing the initial data for the component.
   *
   * @return {Object} An object with the following properties:
   *   - error: {null|string} An error message, if any.
   *   - isLoading: {boolean} A flag indicating if the component is currently loading.
   *   - deleting: {boolean} A flag indicating if the component is currently deleting.
   *   - mode: {boolean} A flag indicating the mode of the component.
   *   - EditMode: {string} The edit mode of the component.
   */
  data() {
    return {
      error: null,
      isLoading: false,
      deleting: false,
      mode: true,
      EditMode: "old",
    };
  },
  methods: {
    /**
     * Asynchronously saves the given data by dispatching a store action to edit the department and navigates to the
     * department list page.
     *
     * @param {Object} data - The data to be saved.
     * @return {Promise<void>} - A promise that resolves when the data is saved and the navigation is complete.
     */
    async saveData(data) {
      await this.$store.dispatch("departments/editDepartment", data);
      this.$router.push(`/departments/${this.comid}`);
    },
    /**
     * Cancels the deletion process by setting deleting to false.
     *
     */
    cancelDeletion() {
      this.deleting = false;
    },
    /**
     * Sets the deleting flag to true, initiating the deletion process.
     *
     */
    deleteDepartment() {
      this.deleting = true;
    },
    /**
     * Asynchronously loads a department with the given company and department ID.
     *
     */
    async loadDepartment() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("departments/loadDepartment", {
          comid: this.comid,
          depid: this.depid,
        });
      } catch (error) {
        this.error =
          `${error.message} in getting department.` || "Something went wrong!";
      }
      this.isLoading = false;
    },
    /**
     * Sets the error variable to null.
     *
     * @return {void} No return value.
     */
    handleError() {
      this.error = null;
    },
  },
  /**
   * Asynchronously loads a department with the given company and department ID,
   * and sets the "depid" and "depidwt" values in local storage.
   *
   * @return {Promise<void>} A promise that resolves when the department is loaded
   * and the local storage values are set.
   */
  async created() {
    await this.loadDepartment();
    localStorage.setItem("depid", this.depid);
    localStorage.setItem("depidwt", this.depid);
  },
  computed: {
    /**
     * Determines if the user has a department based on whether the page is still loading and if the department has been fetched from the store.
     *
     * @return {boolean} True if the user has a department, false otherwise.
     */
    hasDepartment() {
      return (
        !this.isLoading && this.$store.getters["departments/hasDepartment"]
      );
    },
    /**
     * Retrieves the department from the Vuex store.
     *
     * @return {Object} The department object.
     */
    department() {
      return this.$store.getters["departments/department"];
    },
  },
};
</script>
