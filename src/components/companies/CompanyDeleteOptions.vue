<template #default>
  <div>
    <p style="text-align: justify">
      Would you like to delete all of the employees from this company? If you
      choose YES, all of the employees and their working times will be deleted.
    </p>
    <div class="form-control">
      <label for="deleteAll">Delete all employees:</label>
      <select name="deleteAll" id="deleteAll" v-model="delSelected">
        <option value="0" selected>NO</option>
        <option value="1">YES</option>
      </select>
    </div>
  </div>
  <div v-if="!(delSel > 0)">
    <p style="text-align: justify">
      Select the company you would like to transfer employees of deleting
      company.
    </p>
    <div class="form-control">
      <label for="companyId">Select company:</label>
      <select name="companyId" v-model="comId" id="companyId">
        <option value="0">None. Just leave them unemployed.</option>
        <option
          v-for="company in companies"
          :key="company.ID"
          :value="company.ID"
        >
          {{ company.Name }}
        </option>
      </select>
    </div>
  </div>
  <div v-if="comSel > 0">
    <p style="text-align: justify">
      Select the department of the company you would like to transfer employees
      of deleting company.
    </p>
    <div class="form-control">
      <label for="companyId">Select department:</label>
      <select
        name="departmentId"
        v-model="depId"
        id="departmentId"
        v-if="loadedDepartments.length > 0"
      >
        <option
          v-for="department in departments"
          :key="department.ID"
          :value="department.ID"
        >
          {{ department.Name }}
        </option>
      </select>
      <p v-else>
        There are no departments to choose from. Either add some departments to
        the selected company, or delete all the employees.
      </p>
    </div>
  </div>
  <div class="form-control">
    <base-button style="display: inline" @click="deleteCompany"
      >Delete</base-button
    >
    <base-button style="display: inline" @click="cancel">Cancel</base-button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  emits: ["cancel"],
  /**
   * Initializes the data properties for the component.
   *
   * @return {Object} The initialized data properties.
   */
  data() {
    return {
      comId: ref("0"),
      delSelected: ref("1"),
      loadedCompanies: [],
      depId: ref(""),
      loadedDepartments: [],
    };
  },
  computed: {
    /**
     * Returns the value of the `delSelected` property.
     *
     * @return {any} The value of the `delSelected` property.
     */
    delSel() {
      return this.delSelected;
    },
    /**
     * Returns the value of the `comId` property.
     *
     * @return {Ref<string>} The value of the `comId` property.
     */
    comSel() {
      return this.comId;
    },
    /**
     * Returns the loaded companies.
     *
     * @return {Array} The loaded companies.
     */
    companies() {
      return this.loadedCompanies;
    },
    /**
     * Returns the loaded departments.
     *
     * @return {Array} The loaded departments.
     */
    departments() {
      return this.loadedDepartments;
    },
  },
  watch: {
    /**
     * Asynchronously handles the selection of a delete option.
     * If the selected option is "0", it loads the companies.
     *
     * @return {Promise<void>} A promise that resolves when the companies are loaded.
     */
    async delSelected() {
      if (this.delSelected == 0) {
        await this.loadCompanies();
      }
    },
    /**
     * Asynchronously handles the comId function.
     *
     * @return {Promise<void>} A promise that resolves when the departments are loaded if the comId is not 0.
     */
    async comId() {
      if (this.comId != 0) {
        await this.loadDepartments();
      }
    },
  },
  methods: {
    /**
     * Deletes a company.
     *
     * @return {Promise<void>} A promise that resolves when the company is deleted.
     */
    async deleteCompany() {
      const deleteData = {
        id: parseInt(localStorage.getItem("comid")),
        targetDepartmentId: this.depId != "" ? this.depId : 0,
        deleteEmployees: this.delSelected == 0 ? false : true,
      };
      try {
        await this.$store.dispatch("companies/deleteCompany", deleteData);
        this.$router.push("/companies");
      } catch (error) {
        this.error =
          `${error.message} in deleting company.` || "Something went wrong!";
      }
    },
    /**
     * Emits a "cancel" event to notify the parent component that the operation has been canceled.
     *
     * @return {void}
     */
    cancel() {
      this.$emit("cancel");
    },
    /**
     * Asynchronously loads companies by dispatching the action "companies/loadCompanies" to the Vuex store.
     * If the store does not have companies, it dispatches the action to load them.
     * The loaded companies are filtered to exclude the company with the ID stored in localStorage.
     *
     * @return {Promise<void>} A promise that resolves when the companies are loaded and filtered.
     */
    async loadCompanies() {
      try {
        if (!this.$store.getters["companies/hasCompanies"]) {
          await this.$store.dispatch("companies/loadCompanies");
        }
      } catch (error) {
        this.error =
          `${error.message} in getting companies.` || "Something went wrong!";
      }
      this.loadedCompanies = this.$store.getters["companies/companies"].filter(
        (c) => +c.ID !== parseInt(localStorage.getItem("comid"))
      );
    },
    /**
     * Asynchronously loads the departments for a given company.
     *
     * @return {Promise<void>} A promise that resolves when the departments are loaded.
     */
    async loadDepartments() {
      try {
        await this.$store.dispatch("departments/loadDepartments", {
          comid: this.comId,
        });
      } catch (error) {
        this.error =
          `${error.message} in getting epartments.` || "Something went wrong!";
      }
      this.loadedDepartments = this.$store.getters["departments/departments"];
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
</style>
