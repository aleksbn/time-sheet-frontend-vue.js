<template #default>
  <form @submit.prevent="submitData">
    <div
      class="form-control"
      v-if="hasEmployees"
      :class="{ invalid: !employeeId.isValid }"
    >
      <label for="employeeId">Employee</label>
      <select name="employeeId" id="employeeId" v-model="employeeId.val">
        <option value="0" style="font-style: italic" disabled>
          Select an employee
        </option>
        <option v-for="emp in employees" :key="emp.ID" :value="emp.ID">
          {{ emp.FirstName + " " + emp.LastName }}
        </option>
      </select>
    </div>
    <div v-else>
      <p>
        There are no employees in this company. You must first add the
        employees.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !wtDate.isValid }">
      <label for="wtDate">Date</label>
      <input
        type="text"
        name="wtDate"
        @blur="clearValidity('wtDate')"
        v-model="wtDate.val"
      />
    </div>
    <div class="form-control" :class="{ invalid: !wtStartTime.isValid }">
      <label for="StartTime">Start time</label>
      <input
        type="time"
        name="wtStartTime"
        @blur="clearValidity('wtStartTime')"
        v-model="wtStartTime.val"
      />
    </div>
    <div class="form-control" :class="{ invalid: !wtEndTime.isValid }">
      <label for="EndTime">End time</label>
      <input
        type="time"
        name="wtEndTime"
        @blur="clearValidity('wtEndTime')"
        v-model="wtEndTime.val"
      />
    </div>
    <p v-if="!formIsValid">Please, fix the above errors and submit again.</p>
    <base-button style="display: inline">Save</base-button>
    <base-button style="display: inline" :type="'button'" @click="cancel"
      >Cancel</base-button
    >
  </form>
</template>

<script>
import moment from "moment";
import { toRaw } from "vue";
export default {
  emits: ["close", "cancel", "catchError"],
  /**
   * Initializes the data properties for the component.
   *
   * @return {Object} The initial data object with form validation flags and values.
   */
  data() {
    return {
      formIsValid: true,
      employeeId: {
        isValid: true,
        val: "0",
      },
      wtDate: {
        isValid: true,
        val: "",
      },
      wtStartTime: {
        isValid: true,
        val: "",
      },
      wtEndTime: {
        isValid: true,
        val: "",
      },
    };
  },
  methods: {
    /**
     * A function to clear the validity of an input field.
     *
     * @param {string} input - The key of the input field to clear validity for.
     * @return {void}
     */
    clearValidity(input) {
      this[input].isValid = true;
    },
    /**
     * Emits a "cancel" event.
     *
     * @return {void}
     */
    cancel() {
      this.$emit("cancel");
    },
    /**
     * Submits the form data to the server to add a new working time entry.
     *
     * @return {Promise<void>} A promise that resolves when the working time entry is successfully added.
     * @throws {Error} If the form data is invalid or there is an error adding the working time entry.
     */
    async submitData() {
      try {
        this.validateForm();

        if (!this.formIsValid) {
          return;
        }

        const formData = {
          wtEmployeeId: this.employeeId.val,
          wtDate: this.wtDate.val,
          wtStartTime: this.wtStartTime.val,
          wtEndTime: this.wtEndTime.val,
        };

        await this.$store.dispatch("workingTimes/addWorkingTime", formData);
        this.$emit("close");
      } catch (error) {
        this.$emit("cancel");
        this.$emit("catchError", error);
      }
    },
    /**
     * A function to validate the form data for adding a new working time entry.
     *
     * @return {void}
     */
    validateForm() {
      this.formIsValid = true;
      if (this.employeeId.val === "0") {
        this.employeeId.isValid = false;
        this.formIsValid = false;
      }
      if (
        this.wtDate.val === "" ||
        !moment(this.wtDate.val, "DD.MM.YYYY", true).isValid()
      ) {
        this.wtDate.isValid = false;
        this.formIsValid = false;
      }
      if (!this.wtStartTime.val.match(/\d+:\d+/)) {
        this.wtStartTime.isValid = false;
        this.formIsValid = false;
      }
      if (!this.wtEndTime.val.match(/\d+:\d+/)) {
        this.wtEndTime.isValid = false;
        this.formIsValid = false;
      }
    },
  },
  computed: {
    /**
     * A function that returns the employees from the Vuex store.
     *
     * @return {Array} The list of employees.
     */
    employees() {
      return this.$store.getters["employees/employees"];
    },
    /**
     * Check if there are any employees in the Vuex store.
     *
     * @return {boolean} True if there are employees, false otherwise.
     */
    hasEmployees() {
      return this.$store.getters["employees/hasEmployees"];
    },
    /**
     * A function that returns the selected employee ID.
     *
     * @return {type} description of return value
     */
    selectedEmpId() {
      return this.selectedEmployeeId;
    },
  },
  /**
   * A function to handle the asynchronous initialization logic when the component is created.
   *
   * @return {void}
   */
  async created() {
    await this.$store.dispatch("employees/loadEmployees", {
      link: `${localStorage.getItem("comid")}?PageNumber=0&PageSize=10000`,
    });
    this.wtDate.val = moment(
      new Date().toLocaleDateString().substring(0, 10)
    ).format("DD.MM.YYYY");
    const comId = localStorage.getItem("comid");
    if (comId) {
      await this.$store.dispatch("companies/loadCompany", { id: comId });
      const company = toRaw(this.$store.getters["companies/company"]);
      this.wtStartTime.val = company.StartTime;
      this.wtEndTime.val = company.EndTime;
    }
    const empId = localStorage.getItem("empid");
    if (empId) {
      await this.$store.dispatch("employees/loadEmployee", { empid: empId });
      const employee = this.$store.getters["employees/employee"];
      this.employeeId.val = employee.ID;
    }
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
select {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  font-size: 1em;
  border-radius: 15px;
  height: 40px;
}

input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid select {
  border: 1px solid red;
}

p {
  font-weight: bold;
  font-size: large;
}
</style>
