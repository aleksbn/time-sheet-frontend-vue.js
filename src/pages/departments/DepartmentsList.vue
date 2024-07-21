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
      <base-card>
        <div class="controls">
          <base-button @click="refresh">Refresh</base-button>
          <base-button link to="/adddepartment"
            >Add another department</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="hasDepartments">
          <department-item
            v-for="department in filteredDepartments"
            :key="department.ID"
            :comid="this.comid"
            :ID="department.ID"
            :Name="department.Name"
          >
          </department-item>
        </ul>
        <h3 v-else-if="!isLoading">
          There are no departments for this company.
          <router-link to="/adddepartment">Add one!</router-link>
        </h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import DepartmentItem from "../../components/departments/DepartmentItem.vue";
export default {
  /**
   * Initializes the data properties for the component.
   *
   * @return {Object} An object with the initial data properties.
   */
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  props: ["comid"],
  components: {
    DepartmentItem,
  },
  computed: {
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
     * Retrieves the filtered list of departments from the store.
     *
     * @return {Array} The filtered list of departments.
     */
    filteredDepartments() {
      return this.$store.getters["departments/departments"];
    },
  },
  methods: {
    /**
     * Asynchronously loads the departments for a specific company.
     *
     * @return {Promise<void>} A promise that resolves when the departments are loaded, or rejects with an error
     */
    async loadDepartments() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("departments/loadDepartments", {
          comid: this.comid,
        });
      } catch (error) {
        this.error =
          `${error.message} in getting departments.` || "Something went wrong!";
      }
      this.isLoading = false;
    },
    /**
     * Resets the error state by setting the `error` property to `null`.
     *
     * @return {void}
     */
    handleError() {
      this.error = null;
    },
    /**
     * Asynchronously refreshes the departments by calling the `loadDepartments` method.
     *
     * @return {Promise<void>} A promise that resolves when the departments are loaded, or rejects with an error.
     */
    async refresh() {
      await this.loadDepartments();
    },
  },
  /**
   * Asynchronously loads the departments and removes the "depid" item from local storage.
   *
   * @return {Promise<void>} A promise that resolves when the departments are loaded and the "depid" item is removed.
   */
  async created() {
    await this.loadDepartments();
    localStorage.removeItem("depid");
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
</style>
