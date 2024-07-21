<template>
  <base-card>
    <form>
      <div class="form-control" style="display: block; text-align: center">
        <label for="choice">Select the ammount of data to be displayed</label>
        <select
          name="choice"
          id="choice"
          v-model="choice"
          @change="changeFilter"
        >
          <option value="0">All of it</option>
          <option value="1">Specific</option>
        </select>
      </div>
      <br />
      <div v-if="choiceChanged === '1'" style="text-align: center">
        <div class="form-control">
          <label for="year">Year</label>
          <select
            name="year"
            id="year"
            v-model="filterData.year"
            @change="changeFilter"
          >
            <option :value="year" v-for="year in yearsForSelect" :key="year">
              {{ year }}
            </option>
          </select>
        </div>
        <div class="form-control">
          <label for="month">Month</label>
          <select
            name="month"
            id="month"
            v-model="filterData.month"
            @change="changeFilter"
          >
            <option :value="0" selected>Entire year</option>
            <option :value="1">January</option>
            <option :value="2">February</option>
            <option :value="3">March</option>
            <option :value="4">April</option>
            <option :value="5">May</option>
            <option :value="6">June</option>
            <option :value="7">July</option>
            <option :value="8">August</option>
            <option :value="9">September</option>
            <option :value="10">October</option>
            <option :value="11">November</option>
            <option :value="12">December</option>
          </select>
        </div>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  /**
   * Returns an object containing the initial data for the component.
   *
   * @return {Object} - An object with the following properties:
   *   - years: an empty array representing the available years
   *   - choice: a string representing the selected choice, defaulting to "0"
   *   - filterData: an object with the following properties:
   *     - month: an integer representing the selected month, defaulting to 0
   *     - year: an integer representing the selected year, defaulting to 0
   */
  data() {
    return {
      years: [],
      choice: "0",
      filterData: {
        month: 0,
        year: 0,
      },
    };
  },
  emits: ["filter-changed"],
  computed: {
    /**
     * Returns the array of years stored in the component's data property.
     *
     * @return {Array} An array of numbers representing the years.
     */
    yearsForSelect() {
      return this.years;
    },
    /**
     * Returns the value of the 'choice' property of the component.
     *
     * @return {string} The value of the 'choice' property.
     */
    choiceChanged() {
      return this.choice;
    },
  },
  methods: {
    /**
     * Emits a "filter-changed" event with the current filter data.
     *
     * @return {void} No return value.
     */
    changeFilter() {
      this.$emit("filter-changed", this.filterData);
    },
  },
  /**
   * Initializes the component by populating the 'years' array with years starting from the current year down to 2000.
   *
   * @return {void} No return value.
   */
  created() {
    for (let i = new Date().getFullYear(); i >= 2000; i--) {
      this.years.push(i);
    }
  },
};
</script>

<style scoped>
.form-control {
  display: inline;
}

select {
  height: 3em;
  border-radius: 5px;
  width: 25%;
}

label {
  padding: 10px;
}
</style>
