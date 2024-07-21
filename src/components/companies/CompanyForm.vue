<template>
  <div>
    <base-card>
      <form @submit.prevent="submitForm()">
        <div class="form-control" v-if="this.Mode === 'old'">
          <label for="ID">ID:</label>
          <input type="text" name="ID" disabled :value="this.ID" />
        </div>
        <div class="form-control" :class="{ invalid: !comName.isValid }">
          <label for="Name">Name:</label>
          <input
            type="text"
            name="Name"
            ref="comName"
            :disabled="!editMode"
            @blur="clearValidity('comName')"
          />
        </div>
        <p class="invalid" v-if="!comName.isValid">
          Company name cannot be empty.
        </p>
        <div class="form-control" :class="{ invalid: !comAddress.isValid }">
          <label for="Address">Address:</label>
          <input
            type="text"
            name="Address"
            ref="comAddress"
            :disabled="!editMode"
            @blur="clearValidity('comAddress')"
          />
        </div>
        <p class="invalid" v-if="!comAddress.isValid">
          Company address cannot be empty and it must be at least 5 letters
          long.
        </p>
        <div class="form-control" :class="{ invalid: !comCity.isValid }">
          <label for="City">City:</label>
          <input
            type="text"
            name="City"
            ref="comCity"
            :disabled="!editMode"
            @blur="clearValidity('comCity')"
          />
        </div>
        <p class="invalid" v-if="!comCity.isValid">
          Company city cannot be empty and it must contains only letters and
          possibly ' and . sign (like in some french cities, or like St. Pauli).
        </p>
        <div class="form-control" :class="{ invalid: !comCountry.isValid }">
          <label for="Country">Country:</label>
          <input
            type="text"
            name="Country"
            ref="comCountry"
            :disabled="!editMode"
            @blur="clearValidity('comCountry')"
          />
        </div>
        <p class="invalid" v-if="!comCountry.isValid">
          Company country cannot be empty and must contain only letters.
        </p>
        <div class="form-control" :class="{ invalid: !comEmail.isValid }">
          <label for="Email">Email:</label>
          <input
            type="text"
            name="Email"
            ref="comEmail"
            :disabled="!editMode"
            @blur="clearValidity('comEmail')"
          />
        </div>
        <p class="invalid" v-if="!comEmail.isValid">
          You must type in a regular email address.
        </p>
        <div class="form-control" :class="{ invalid: !comStartTime.isValid }">
          <label for="StartTime">Start time:</label>
          <input
            type="time"
            name="StartTime"
            ref="comStartTime"
            :disabled="!editMode"
            min="06:00"
            max="14:00"
            value="07:00"
            @blur="clearValidity('comStartTime')"
          />
        </div>
        <div class="form-control" :class="{ invalid: !comEndTime.isValid }">
          <label for="EndTime">End time:</label>
          <input
            type="time"
            name="EndTime"
            ref="comEndTime"
            :disabled="!editMode"
            @blur="clearValidity('comEndTime')"
            min="15:00"
            max="23:00"
            value="15:00"
          />
        </div>
        <p class="invalid" v-if="!comStartTime.isValid || !comEndTime.isValid">
          Starting time cannot be before the end of the working time of the
          company.
        </p>
        <p v-if="!formIsValid">
          Please, fix the above errors and submit again.
        </p>
        <div>
          <base-button style="display: inline">{{ textForMode }}</base-button>
          <base-button
            v-if="this.ID"
            link
            style="display: inline"
            :to="`/departments/${this.ID}`"
            >Departments</base-button
          >
          <base-button
            v-if="this.ID"
            @click="openEmployees()"
            style="display: inline"
            >Employees</base-button
          >
          <base-button
            v-if="this.ID"
            @click="openWorkingTimes()"
            style="display: inline"
            >Working times</base-button
          >
          <base-button
            v-if="this.ID"
            link
            :to="calculationLink"
            :type="'button'"
            style="display: inline"
          >
            See the calculations
          </base-button>
          <base-button
            v-if="this.ID"
            :type="'button'"
            @click="deleteCompany()"
            style="display: inline"
            >Delete this company</base-button
          >
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
import DataCheckers from "@/data-checkers";
export default {
  props: [
    "ID",
    "Name",
    "Address",
    "City",
    "Country",
    "Email",
    "Mode",
    "StartTime",
    "EndTime",
  ],
  emits: ["save-data", "delete-company"],
  /**
   * Returns an object containing the initial data for the component.
   *
   * @return {Object} An object with the following properties:
   *   - editModeType: {boolean} - Indicates if the component is in edit mode.
   *   - formIsValid: {boolean} - Indicates if the form is valid.
   *   - comName: {Object} - An object with the following properties:
   *       - isValid: {boolean} - Indicates if the comName is valid.
   *       - val: {string} - The value of comName.
   *   - comAddress: {Object} - An object with the following properties:
   *       - isValid: {boolean} - Indicates if the comAddress is valid.
   *       - val: {string} - The value of comAddress.
   *   - comCity: {Object} - An object with the following properties:
   *       - isValid: {boolean} - Indicates if the comCity is valid.
   *       - val: {string} - The value of comCity.
   *   - comCountry: {Object} - An object with the following properties:
   *       - isValid: {boolean} - Indicates if the comCountry is valid.
   *       - val: {string} - The value of comCountry.
   *   - comEmail: {Object} - An object with the following properties:
   *       - isValid: {boolean} - Indicates if the comEmail is valid.
   *       - val: {string} - The value of comEmail.
   *   - comStartTime: {Object} - An object with the following properties:
   *       - isValid: {boolean} - Indicates if the comStartTime is valid.
   *       - val: {string} - The value of comStartTime.
   *   - comEndTime: {Object} - An object with the following properties:
   *       - isValid: {boolean} - Indicates if the comEndTime is valid.
   *       - val: {string} - The value of comEndTime.
   */
  data() {
    return {
      editModeType: true,
      formIsValid: true,
      comName: {
        isValid: true,
        val: "",
      },
      comAddress: {
        isValid: true,
        val: "",
      },
      comCity: {
        isValid: true,
        val: "",
      },
      comCountry: {
        isValid: true,
        val: "",
      },
      comEmail: {
        isValid: true,
        val: "",
      },
      comStartTime: {
        isValid: true,
        val: "",
      },
      comEndTime: {
        isValid: true,
        val: "",
      },
    };
  },
  methods: {
    /**
     * Clears the validity of the specified input.
     *
     * @param {string} input - The name of the input to clear validity for.
     * @return {void}
     */
    clearValidity(input) {
      this[input].isValid = true;
    },
    /**
     * Validates the form data for the company form.
     *
     * @return {void} Sets the validity of form fields based on specific conditions.
     */
    validateForm() {
      this.formIsValid = true;
      if (this.comName.val === "") {
        this.comName.isValid = false;
        this.formIsValid = false;
      }
      if (this.comAddress.val.length < 5) {
        this.comAddress.isValid = false;
        this.formIsValid = false;
      }
      if (!DataCheckers.checkCity(this.comCity.val)) {
        this.comCity.isValid = false;
        this.formIsValid = false;
      }
      if (!DataCheckers.checkCountry(this.comCountry.val)) {
        this.comCountry.isValid = false;
        this.formIsValid = false;
      }
      if (!DataCheckers.checkEmail(this.comEmail.val)) {
        this.comEmail.isValid = false;
        this.formIsValid = false;
      }
      if (this.comStartTime.val > this.comEndTime.val) {
        this.comStartTime.isValid = false;
        this.formIsValid = false;
      }
      if (this.comStartTime.val > this.comEndTime.val) {
        this.comEndTime.isValid = false;
        this.formIsValid = false;
      }
    },

    /**
     * Handles the form submission process by updating form values, validating the form,
     * and emitting a save-data event with the form data.
     *
     * @return {void} No return value.
     */
    submitForm() {
      if (!this.editModeType) {
        this.editModeType = true;
        return;
      }

      this.comName.val = this.$refs.comName.value.trim();
      this.comAddress.val = this.$refs.comAddress.value.trim();
      this.comCity.val = this.$refs.comCity.value.trim();
      this.comCountry.val = this.$refs.comCountry.value.trim();
      this.comEmail.val = this.$refs.comEmail.value.trim();
      this.comStartTime.val = this.$refs.comStartTime.value;
      this.comEndTime.val = this.$refs.comEndTime.value;

      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        comName: this.comName.val,
        comAddress: this.comAddress.val,
        comCity: this.comCity.val,
        comCountry: this.comCountry.val,
        comEmail: this.comEmail.val,
        comStartTime: this.comStartTime.val,
        comEndTime: this.comEndTime.val,
      };

      if (this.Mode === "old") {
        formData.comId = this.ID;
      }

      this.$emit("save-data", formData);
    },
    /**
     * Emits a "delete-company" event with the current ID as the payload.
     *
     * @return {void} No return value.
     */
    deleteCompany() {
      this.$emit("delete-company", this.ID);
    },
    /**
     * Opens the employees page for the company.
     *
     * @return {void}
     */
    openEmployees() {
      localStorage.removeItem("depid");
      this.$router.push("/employees/" + this.ID);
    },
    /**
     * Opens the working times page for the company.
     *
     * @return {void} No return value.
     */
    openWorkingTimes() {
      localStorage.removeItem("depidwt");
      localStorage.removeItem("empidwt");
      this.$router.push("/workingtimes/" + this.ID);
    },
  },
  computed: {
    /**
     * Returns the value of the `editModeType` property.
     *
     * @return {boolean} The value of the `editModeType` property.
     */
    editMode() {
      return this.editModeType;
    },
    /**
     * Returns the text for the mode based on the value of `editModeType`.
     *
     * @return {string} The text for the mode, either "Save" or "Edit".
     */
    textForMode() {
      return this.editModeType === true ? "Save" : "Edit";
    },
    /**
     * Returns a string representing the URL for the calculations page specific to the current company.
     *
     * @return {string} The URL for the calculations page specific to the current company.
     */
    calculationLink() {
      return `/calculations/${this.ID}`;
    },
  },
  /**
   * Mounts the component and initializes edit mode based on the mode value.
   * If the mode is "old", sets the values for address, city, name, country, email, start time, and end time.
   *
   * @return {void} No return value.
   */
  mounted() {
    this.editModeType = this.Mode === "new" ? true : false;
    if (this.Mode === "old") {
      this.$refs.comAddress.value = this.Address;
      this.$refs.comCity.value = this.City;
      this.$refs.comName.value = this.Name;
      this.$refs.comCountry.value = this.Country;
      this.$refs.comEmail.value = this.Email;
      this.$refs.comStartTime.value = this.StartTime;
      this.$refs.comEndTime.value = this.EndTime;
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

input {
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

.invalid input {
  border: 1px solid red;
}
</style>
