<template>
  <section>
    <base-card style="text-align: center">
      <label style="font-weight: bold"
        >Page number <span style="margin: 0 20px">/</span> Page size</label
      >
      <select name="pageNumber" id="pageNumber" @change="setParams">
        <option v-for="number in pageSizeNumbers" :key="number" :value="number">
          {{ number + 1 }}
        </option>
      </select>
      /
      <select name="pageSize" id="pageSize" @change="setParams">
        <option v-for="number in pageSize" :key="number" :value="number">
          {{ number }}
        </option>
      </select>
    </base-card>
  </section>
</template>

<script>
export default {
  emits: ["params-changed"],
  /**
   * Returns an object containing the initial data for the component.
   *
   * @return {Object} - An object with the following properties:
   *   - pageNumbers: An empty array.
   *   - pageSize: An array of numbers representing the available page sizes.
   *   - numberOfRecords: A number representing the total number of records.
   *   - params: An object containing the initial parameters.
   *     - pageNumber: A number representing the initial page number.
   *     - pageSize: A number representing the initial page size.
   */
  data() {
    return {
      pageNumbers: [],
      pageSize: [10, 20, 50, 100],
      numberOfRecords: 0,
      params: {
        pageNumber: 0,
        pageSize: 10,
      },
    };
  },
  computed: {
    /**
     * A method that returns the array of page numbers.
     *
     * @return {Array} The array of page numbers.
     */
    pageSizeNumbers() {
      return this.pageNumbers;
    },
  },
  /**
   * Initializes the component data on creation.
   * Retrieves the total number of working times from the store and initializes the select options.
   *
   * @return {void}
   */
  created() {
    this.numberOfRecords =
      this.$store.getters["workingTimes/numberOfWorkingTimes"];
    this.loadSelect();
  },
  methods: {
    /**
     * Updates the parameters based on the input event and emits a "params-changed" event.
     *
     * @param {Event} event - The input event that triggered the function.
     * @return {void} This function does not return anything.
     */
    setParams(event) {
      const inputId = event.target.id;
      const value = parseInt(event.target.value);
      const updatedParams = {
        ...this.params,
        [inputId]: value,
      };
      this.params = updatedParams;
      if (inputId === "pageSize") {
        this.params.pageNumber = 0;
      }
      this.$emit("params-changed", this.params);
      this.loadSelect();
    },
    /**
     * Generates an array of page numbers based on the number of records and the page size.
     *
     * @return {void} This function does not return anything.
     */
    loadSelect() {
      this.pageNumbers = [];
      for (let i = 0; i < this.numberOfRecords; i += this.params.pageSize) {
        this.pageNumbers.push(i / this.params.pageSize);
      }
    },
  },
};
</script>

<style scoped>
select {
  width: 75px;
  height: 2em;
  border-radius: 15px;
  text-align: center;
  margin: 0 20px;
}
</style>
