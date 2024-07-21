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
    <employee-form
      @save-data="saveData"
      @delete-employee="deleteEmployee"
      v-if="hasEmployee"
      :key="employee.ID"
      :ID="employee.ID"
      :FirstName="employee.FirstName"
      :LastName="employee.LastName"
      :Degree="employee.Degree"
      :JobTitle="employee.JobTitle"
      :HourlyRate="employee.HourlyRate"
      :Department="employee.Department"
      :DepartmentId="employee.DepartmentId"
      :Address="employee.Address"
      :Phone="employee.Phone"
      :Email="employee.Email"
      :DateOfBirth="employee.DateOfBirth"
      :StartOfEmployment="employee.StartOfEmployment"
      :Mode="this.EditMode"
    ></employee-form>
    <h3 v-else-if="!isLoading">
      There's some problems with loading of this employee.
    </h3>
    <base-dialog
      :showClose="false"
      fixed
      title="Select some delete options"
      :show="deleting"
    >
      <employee-delete-options
        @cancel="cancelDeletion"
      ></employee-delete-options>
    </base-dialog>
  </div>
</template>

<script>
import EmployeeForm from "../../components/employees/EmployeeForm.vue";
import EmployeeDeleteOptions from "@/components/employees/EmployeeDeleteOptions.vue";

export default {
  components: {
    EmployeeForm,
    EmployeeDeleteOptions,
  },
  props: ["empid"],
  /**
   * Returns an object containing the initial data for the component.
   *
   * @return {Object} An object with the following properties:
   *   - isLoading: {boolean} A flag indicating if the component is currently loading.
   *   - deleting: {boolean} A flag indicating if the component is currently deleting.
   *   - mode: {boolean} A flag indicating the mode of the component.
   *   - EditMode: {string} The edit mode of the component.
   *   - error: {null|string} An error message, if any.
   */
  data() {
    return {
      isLoading: false,
      deleting: false,
      mode: true,
      EditMode: "old",
      error: null,
    };
  },
  methods: {
    /**
     * Saves the data by dispatching an action to edit the employee and
     * navigating to the employee list page.
     *
     * @param {Object} data - The data to be saved.
     * @return {Promise} A promise that resolves when the data is saved.
     */
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("employees/editEmployee", data);
        this.$router.push("/employees/" + localStorage.getItem("comid"));
      } catch (error) {
        this.error = error;
      }
      this.isLoading = false;
    },
    /**
     * Asynchronously loads an employee from the store.
     *
     * @return {Promise<void>} A promise that resolves when the employee is loaded.
     */
    async loadEmployee() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("employees/loadEmployee", {
          empid: this.empid,
        });
      } catch (error) {
        this.error =
          `${error.message} in getting employee.` || "Something went wrong!";
      }
      this.isLoading = false;
    },
    /**
     * A function that handles errors by setting the error to null.
     */
    handleError() {
      this.error = null;
    },
    /**
     * Cancels the deletion process.
     *
     * @return {void}
     */
    cancelDeletion() {
      this.deleting = false;
    },
    /**
     * Sets the `deleting` property to `true`, indicating that the employee is being deleted.
     *
     * @return {void}
     */
    deleteEmployee() {
      this.deleting = true;
    },
  },
  /**
   * Asynchronously executes the created lifecycle hook by loading an employee, setting local storage for empid, and empidwt.
   *
   * @return {Promise<void>} A promise that resolves when the employee is successfully loaded and local storage is set.
   */
  async created() {
    await this.loadEmployee();
    localStorage.setItem("empid", this.empid);
    localStorage.setItem("empidwt", this.empid);
  },
  computed: {
    /**
     * Checks if there is an employee available in the store and if the loading state is not active.
     *
     * @return {boolean} Returns true if there is an employee available and the loading state is not active, otherwise false.
     */
    hasEmployee() {
      return !this.isLoading && this.$store.getters["employees/hasEmployee"];
    },
    /**
     * Retrieves the employee from the Vuex store using the "employees/employee" getter.
     *
     * @return {Object} The employee object retrieved from the Vuex store.
     */
    employee() {
      return this.$store.getters["employees/employee"];
    },
  },
};
</script>
