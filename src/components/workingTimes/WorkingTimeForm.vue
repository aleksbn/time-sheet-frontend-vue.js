<template>
  <div>
    <form @submit.prevent="submitForm()">
      <div class="form-control" v-if="this.Mode === 'old'">
        <label for="ID">ID</label>
        <input type="text" name="ID" disabled :value="this.ID" />
      </div>
      <div class="form-control">
        <label for="Name">Name</label>
        <input type="text" name="Name" disabled :value="fullName" />
      </div>
      <div class="form-control" :class="{ invalid: !wtDate.isValid }">
        <label for="wtDate">Date</label>
        <input
          type="text"
          name="wtDate"
          ref="wtDate"
          @blur="clearValidity('wtDate')"
        />
      </div>
      <div class="form-control" :class="{ invalid: !wtStartTime.isValid }">
        <label for="StartTime">Start time</label>
        <input
          type="time"
          name="StartTime"
          ref="wtStartTime"
          @blur="clearValidity('wtStartTime')"
        />
      </div>
      <div class="form-control" :class="{ invalid: !wtEndTime.isValid }">
        <label for="EndTime">End time</label>
        <input
          type="time"
          name="EndTime"
          ref="wtEndTime"
          @blur="clearValidity('wtEndTime')"
        />
      </div>
      <p v-if="!formIsValid">Please, fix the above errors and submit again.</p>
      <base-button style="display: inline">Save</base-button>
      <base-button style="display: inline" :type="'button'" @click="cancel"
        >Cancel</base-button
      >
    </form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["ID", "Employee", "WtDate", "StartTime", "EndTime", "Mode"],
  emits: ["close", "cancel", "catchError"],
  methods: {
    /**
     * Emits a "cancel" event.
     *
     * @return {void}
     */
    cancel() {
      this.$emit("cancel");
    },
    /**
     * Submits the form asynchronously.
     *
     * @return {Promise<void>} A promise that resolves when the form is submitted successfully.
     */
    async submitForm() {
      try {
        this.wtDate.val = this.$refs.wtDate.value;
        this.wtStartTime.val = this.$refs.wtStartTime.value;
        this.wtEndTime.val = this.$refs.wtEndTime.value;

        this.validateForm();

        if (!this.formIsValid) {
          return;
        }

        const formData = {
          wtDate: this.wtDate.val,
          wtStartTime: this.wtStartTime.val,
          wtEndTime: this.wtEndTime.val,
          wtEmployeeId: this.Employee.id,
        };

        if (this.Mode === "old") {
          formData.wtId = this.ID;
        }

        await this.$store.dispatch("workingTimes/editWorkingTime", formData);
        this.$emit("close");
      } catch (error) {
        this.$emit("cancel");
        this.$emit("catchError", error);
      }
    },
    /**
     * Sets the validity of a specific input field to true.
     *
     * @param {string} input - The name of the input field to set validity for.
     * @return {void}
     */
    clearValidity(input) {
      this[input].isValid = true;
    },
    /**
     * Validates the form based on the value of the `wtDate`, `wtStartTime`, and `wtEndTime` properties.
     *
     * @return {void}
     */
    validateForm() {
      this.formIsValid = true;
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
  /**
   * Returns an object containing the initial data for the component.
   *
   * @return {Object} An object with the following properties:
   *   - formIsValid: a boolean indicating whether the form is valid or not
   *   - wtDate: an object with the following properties:
   *     - isValid: a boolean indicating whether the date input is valid or not
   *     - val: a string representing the value of the date input
   *   - wtEndTime: an object with the following properties:
   *     - isValid: a boolean indicating whether the end time input is valid or not
   *     - val: a string representing the value of the end time input
   *   - wtStartTime: an object with the following properties:
   *     - isValid: a boolean indicating whether the start time input is valid or not
   *     - val: a string representing the value of the start time input
   */
  data() {
    return {
      formIsValid: true,
      wtDate: {
        isValid: true,
        val: "",
      },
      wtEndTime: {
        isValid: true,
        val: "",
      },
      wtStartTime: {
        isValid: true,
        val: "",
      },
    };
  },
  computed: {
    /**
     * Returns the full name of the employee.
     *
     * @return {string} The full name of the employee, formatted as "firstName lastName".
     */
    fullName() {
      return `${this.Employee.firstName} ${this.Employee.lastName}`;
    },
  },
  /**
   * Initializes the component after it has been mounted.
   *
   * If the component's mode is set to "old", it sets the value of the date input,
   * start time input, and end time input to the corresponding values from the
   * component's props.
   *
   * @return {void}
   */
  mounted() {
    if (this.Mode === "old") {
      this.$refs.wtDate.value = moment(this.WtDate.substring(0, 10)).format(
        "DD.MM.YYYY"
      );
      this.$refs.wtStartTime.value = this.StartTime;
      this.$refs.wtEndTime.value = this.EndTime;
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
