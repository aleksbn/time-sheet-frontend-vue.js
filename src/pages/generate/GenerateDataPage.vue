<template>
  <base-card>
    <base-dialog
      :show="!!error"
      title="An error occured"
      @close="handleError"
      :showClose="true"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <form @submit.prevent="submit">
      <div class="form-control">
        <label for="numberOfEmployees"
          >Number of employees per department (up to 30)</label
        >
        <input
          type="number"
          name="numberOfEmployees"
          id="numberOfEmployees"
          v-model="numberOfEmployees"
          min="1"
          max="30"
        />
      </div>
      <div class="form-control">
        <label for="numberOfDays">Number of working days (up to 90)</label>
        <input
          type="number"
          name="numberOfDays"
          id="numberOfDays"
          v-model="numberOfDays"
          min="1"
          max="90"
        />
      </div>
      <base-button>Generate</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  props: ["comid"],
  /**
   * A function that returns the initial data object for the component.
   *
   * @return {Object} The initial data object with error, numberOfEmployees, and numberOfDays properties.
   */
  data() {
    return {
      error: null,
      numberOfEmployees: 1,
      numberOfDays: 1,
    };
  },
  methods: {
    /**
     * Submits the form data to generate random data for a given company, number of employees, and number of days.
     *
     * @return {Promise<void>} A promise that resolves when the random data is generated and the user is redirected to the employees page, or rejects with an error message.
     */
    async submit() {
      const submitData = {
        comid: this.comid,
        numberOfEmployees: this.numberOfEmployees,
        numberOfDays: this.numberOfDays,
      };
      try {
        await this.$store.dispatch("generate/generateData", submitData);
        this.$router.replace(`/employees/${this.$route.params.comid}`);
      } catch (error) {
        this.error =
          `${error.message} in generating data.` || "Something went wrong!";
      }
    },
    /**
     * Resets the error property to null.
     *
     * @return {void} This function does not return anything.
     */
    handleError() {
      this.error = null;
    },
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

.invalid input {
  border: 1px solid red;
}

p {
  font-weight: bold;
  font-size: large;
}
</style>
