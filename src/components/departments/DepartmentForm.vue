<template>
  <div>
    <base-card>
      <form @submit.prevent="submitForm()">
        <div class="form-control" v-if="this.Mode === 'old'">
          <label for="ID">ID:</label>
          <input type="text" name="ID" disabled :value="this.ID" />
        </div>
        <div class="form-control" :class="{ invalid: !depName.isValid }">
          <label for="Name">Name:</label>
          <input
            type="text"
            name="Name"
            :disabled="!editMode"
            ref="depName"
            @blur="clearValidity('depName')"
          />
        </div>
        <p v-if="!formIsValid">
          Please, fix the above errors and submit again.
        </p>
        <div>
          <base-button style="display: inline">{{ textForMode }}</base-button>
          <base-button
            v-if="this.ID"
            link
            style="display: inline"
            :to="`/employees/${this.comid}/${this.ID}`"
            >Employees</base-button
          >
          <base-button
            v-if="this.ID"
            @click="openWorkingTimes()"
            style="display: inline"
            :to="`/workingtimes/${this.comid}/${this.ID}`"
            >Working times</base-button
          >
          <base-button
            v-if="this.ID"
            :type="'button'"
            @click="deleteDepartment()"
            style="display: inline"
            >Delete this department</base-button
          >
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  props: ["ID", "Name", "Mode"],
  emits: ["save-data", "delete-department"],
  /**
   * Returns an object containing the initial data for the component.
   *
   * @return {Object} An object with the following properties:
   *   - editModeType: {boolean} - Indicates if the component is in edit mode.
   *   - formIsValid: {boolean} - Indicates if the form is valid.
   *   - comid: {null} - The initial value for comid.
   *   - depName: {Object} - An object with the following properties:
   *       - isValid: {boolean} - Indicates if depName is valid.
   *       - val: {string} - The initial value for depName.
   */
  data() {
    return {
      editModeType: true,
      formIsValid: true,
      comid: null,
      depName: {
        isValid: true,
        val: "",
      },
    };
  },
  methods: {
    /**
     * Clears the validity of the specified input field.
     *
     * @param {string} input - The name of the input field to clear validity for.
     * @return {void}
     */
    clearValidity(input) {
      this[input].isValid = true;
    },
    /**
     * A function that validates the form by checking if the department name is empty.
     *
     * @param {void}
     * @return {void}
     */
    validateForm() {
      this.formIsValid = true;
      if (this.depName.val === "") {
        this.depName.isValid = false;
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

      this.depName.val = this.$refs.depName.value.trim();
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        depName: this.depName.val,
        comId: this.comid,
      };

      if (this.Mode === "old") {
        formData.depId = this.ID;
      }

      this.$emit("save-data", formData);
    },
    /**
     * A function that opens the working times page by removing certain items from localStorage and pushing a new route to the router.
     *
     * @param {void} No parameters.
     * @return {void} No return value.
     */
    openWorkingTimes() {
      localStorage.removeItem("comidwt");
      localStorage.removeItem("empidwt");
      this.$router.push(`/workingtimes/${this.comid}/${this.ID}`);
    },
    /**
     * Emits a "delete-department" event with the ID of the department to be deleted.
     *
     * @return {void} No return value.
     */
    deleteDepartment() {
      this.$emit("delete-department", this.ID);
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
  },
  /**
   * Initializes the component by setting the 'comid' property to the value retrieved from localStorage.
   *
   * @param {void} No parameters.
   * @return {void} No return value.
   */
  created() {
    this.comid = localStorage.getItem("comid");
  },
  /**
   * Initializes the component and sets the value of `editModeType` based on the value of `Mode`.
   * If `Mode` is "old", sets the value of the `depName` input field to the value of `Name`.
   *
   * @return {void}
   */
  mounted() {
    this.editModeType = this.Mode === "new" ? true : false;
    if (this.Mode === "old") {
      this.$refs.depName.value = this.Name;
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
