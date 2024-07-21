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
    <section>
      <employee-filter
        v-if="show"
        @change-filter="setFilters"
      ></employee-filter>
    </section>
    <section>
      <base-card>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <div class="controls">
          <base-button @click="refresh">Refresh</base-button>
          <base-button link to="/addemployee" v-if="hasEmployees"
            >Add employee</base-button
          >
        </div>
        <table v-if="hasEmployees">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Title</th>
            <th>Degree</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Hourly rate</th>
            <th></th>
          </tr>
          <employee-item
            v-for="employee in filteredEmployees"
            :key="employee.ID"
            :ID="employee.ID"
            :FirstName="employee.FirstName"
            :LastName="employee.LastName"
            :JobTitle="employee.JobTitle"
            :Degree="employee.Degree"
            :Address="employee.Address"
            :Phone="employee.Phone"
            :DateOfBirth="employee.DateOfBirth"
            :StartOfEmployment="employee.StartOfEmployment"
            :HourlyRate="employee.HourlyRate"
            :DepartmentId="employee.DepartmentId"
            :Department="employee.Department"
          ></employee-item>
        </table>
        <h3 v-else-if="hasDepartments">
          There are no employees.
          <router-link to="/addemployee">Add one</router-link>, or
          <router-link :to="generateLink"
            >randomly generate both employees and their working
            times!</router-link
          >
        </h3>
        <h3 v-else>
          You must
          <router-link to="/adddepartment">add department</router-link> before
          you add any employees.
        </h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import EmployeeItem from "../../components/employees/EmployeeItem.vue";
import { defineAsyncComponent } from "vue";
export default {
  components: {
    EmployeeItem,
    EmployeeFilter: defineAsyncComponent(() =>
      import("../../components/employees/EmployeeFilter.vue")
    ),
  },
  computed: {
    /**
     * Check if there are employees based on loading status and store getters.
     *
     * @return {Boolean} Whether there are employees or not.
     */
    hasEmployees() {
      return !this.isLoading && this.$store.getters["employees/hasEmployees"];
    },
    /**
     * Checks if there are departments available and not in a loading state.
     *
     * @return {boolean} Returns true if there are departments and not in loading state, false otherwise.
     */
    hasDepartments() {
      return (
        !this.isLoading && this.$store.getters["departments/hasDepartments"]
      );
    },
    /**
     * Generates a link based on the company id stored in localStorage.
     *
     * @return {string} The generated link.
     */
    generateLink() {
      return `/generate/${localStorage.getItem("comid")}`;
    },
    /**
     * Filters the list of employees based on the active filters.
     *
     * @return {Array} The filtered list of employees.
     */
    filteredEmployees() {
      let employees = this.$store.getters["employees/employees"];
      employees = employees.filter((employee) =>
        employee.ID.includes(this.activeFilters.id)
      );
      employees = employees.filter((employee) =>
        employee.FirstName.toUpperCase().includes(
          this.activeFilters.firstName.toUpperCase()
        )
      );
      employees = employees.filter((employee) =>
        employee.LastName.toUpperCase().includes(
          this.activeFilters.lastName.toUpperCase()
        )
      );
      employees = employees.filter((employee) =>
        employee.Department.name
          .toUpperCase()
          .includes(this.activeFilters.department.toUpperCase())
      );
      employees = employees.filter(
        (employee) =>
          +this.activeFilters.hourlyRate === 0 ||
          +employee.HourlyRate === +this.activeFilters.hourlyRate
      );
      return employees;
    },
  },
  watch: {
    /**
     * Refreshes the active filters and triggers a refresh of the data.
     *
     * @return {void}
     */
    activeFilters() {
      this.refresh();
    },
  },
  /**
   * Initializes the data object with default values for isLoading, error, activeFilters, and show.
   *
   * @return {Object} The initialized data object.
   */
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        id: "",
        firstName: "",
        lastName: "",
        department: "",
        hourlyRate: 0,
        pageNumber: 0,
        pageSize: 10,
      },
      show: false,
    };
  },
  methods: {
    /**
     * Asynchronously loads employees from the server based on the current active filters.
     *
     * This function sets `isLoading` to `true`, dispatches a Vuex action to load employees from the server,
     * and sets `show` to `true` if the operation is successful. If an error occurs, `error` is set to the
     * error message.
     *
     * @return {Promise<void>} A promise that resolves when the employees have been loaded.
     */
    async loadEmployees() {
      this.isLoading = true;
      try {
        if (
          localStorage.getItem("comid") !== null &&
          localStorage.getItem("depid") === null
        ) {
          await this.$store.dispatch("employees/loadEmployees", {
            link: `${localStorage.getItem("comid")}?PageNumber=${
              this.activeFilters.pageNumber
            }&PageSize=${this.activeFilters.pageSize}`,
          });
        } else {
          await this.$store.dispatch("employees/loadEmployees", {
            link: `${localStorage.getItem("comid")}/${localStorage.getItem(
              "depid"
            )}?PageNumber=${this.activeFilters.pageNumber}&PageSize=${
              this.activeFilters.pageSize
            }`,
          });
        }
        this.show = true;
      } catch (error) {
        this.error =
          `${error.message} in getting employees.` || "Something went wrong!";
      }
      this.isLoading = false;
    },
    /**
     * A function that handles errors by setting the error property to null.
     *
     * @return {void} No return value.
     */
    handleError() {
      this.error = null;
    },
    /**
     * Asynchronously refreshes the list of employees by loading them from the server.
     *
     * @return {Promise<void>} A promise that resolves when the employees have been refreshed.
     */
    async refresh() {
      await this.loadEmployees();
    },
    /**
     * A function that sets the filters based on the updated filters object.
     *
     * @param {Object} updatedFilters - The updated filters object.
     * @return {void} No return value.
     */
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
      this.activeFilters.hourlyRate === isNaN(updatedFilters.hourlyRate)
        ? 0
        : parseFloat(updatedFilters.hourlyRate);
    },
  },
  /**
   * Asynchronously executes the created lifecycle hook by loading employees, removing the "empid" item from local storage.
   *
   * @return {Promise<void>} A promise that resolves when the employees are successfully loaded and the "empid" item is removed from local storage.
   */
  async created() {
    await this.loadEmployees();
    localStorage.removeItem("empid");
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

table {
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
  margin: 20px 0;
}

th,
td {
  text-align: left;
  border-bottom: 1px solid #ddd;
  padding: 15px;
  margin: 15px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
  /* Light gray */
}

tr:nth-child(odd) {
  background-color: rgba(255, 0, 0, 0.801);
  /* Red */
  color: #fff;
  /* White text on red rows */
}

tr:nth-child(even):hover,
tr:nth-child(odd):hover {
  background-color: rgba(0, 0, 255, 0.5);
  /* Blue on hover */
  color: #fff;
  /* White text on blue rows on hover */
}
</style>
