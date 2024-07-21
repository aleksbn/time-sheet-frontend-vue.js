import { AjaxCall } from "@/helpers";

export default {
  /**
   * Asynchronously loads the list of departments for a given company ID.
   *
   * @param {Object} commit - A Vuex commit function to commit mutations
   * @param {Object} dispatch - A Vuex dispatch function to dispatch actions
   * @param {Object} rootGetters - Vuex rootGetters for accessing getters
   * @param {Object} payload - An object containing the company ID
   * @param {string} payload.comid - The ID of the company to load departments for
   * @return {Promise<void>} - A promise that resolves when the departments are loaded, or rejects with an error
   * @throws {Error} - If there is an error loading the departments
   */
  async loadDepartments({ commit, dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const data = await AjaxCall(`department/${payload.comid}`, "GET", null, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
      const departments = [];
      for (const key in data) {
        const dep = {
          ID: data[key].id,
          Name: data[key].name,
        };
        departments.push(dep);
        commit("setDepartments", departments);
      }
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to load departments!");
      throw errorFromAjax;
    }
  },
  /**
   * Asynchronously loads a department with the given company and department ID.
   *
   * @param {Object} commit - A Vuex commit function to commit mutations
   * @param {Object} dispatch - A Vuex dispatch function to dispatch actions
   * @param {Object} rootGetters - Vuex rootGetters for accessing getters
   * @param {Object} payload - An object containing the company and department ID
   * @param {string} payload.comid - The ID of the company
   * @param {string} payload.depid - The ID of the department
   * @return {Promise<void>} - A promise that resolves when the department is loaded, or rejects with an error
   */
  async loadDepartment({ commit, dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const data = await AjaxCall(
        `department/${payload.comid}/${payload.depid}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${rootGetters["auth/token"].token}`,
        }
      );
      const department = {
        ID: data.id,
        Name: data.name,
      };
      commit("setDepartment", department);
    } catch (error) {
      const errorFromAjax = new Error(
        error || "Failed to load department data!"
      );
      throw errorFromAjax;
    }
  },

  /**
   * Asynchronously adds a new department.
   *
   * @param {Object} dispatch - A Vuex dispatch function to dispatch actions
   * @param {Object} rootGetters - Vuex rootGetters for accessing getters
   * @param {Object} payload - An object containing the payload data for adding the department
   * @param {string} payload.depName - The name of the department
   * @param {string} payload.comId - The ID of the company the department belongs to
   * @return {Promise<void>} - A promise that resolves when the department is added, or rejects with an error
   */
  async addDepartment({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const dep = {
        Name: payload.depName,
        CompanyID: payload.comId,
      };
      await AjaxCall("department", "POST", dep, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to add department!");
      throw errorFromAjax;
    }
  },

  /**
   * Edits a department with the provided payload data.
   *
   * @param {Object} dispatch - A Vuex dispatch function to dispatch actions
   * @param {Object} rootGetters - Vuex rootGetters for accessing getters
   * @param {Object} payload - An object containing the payload data for editing the department
   * @param {string} payload.depId - The ID of the department to edit
   * @param {string} payload.depName - The new name for the department
   * @param {string} payload.comId - The ID of the company the department belongs to
   * @return {Promise<void>} - A promise that resolves when the department is edited, or rejects with an error
   */
  async editDepartment({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const dep = {
        ID: payload.depId,
        Name: payload.depName,
        CompanyID: payload.comId,
      };
      await AjaxCall("department", "PUT", dep, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
    } catch (error) {
      const errorFromAjax = new Error(
        error || "Failed to edit department data!"
      );
      throw errorFromAjax;
    }
  },

  /**
   * Asynchronously deletes a department with the given payload.
   *
   * @param {Object} dispatch - A Vuex dispatch function to dispatch actions
   * @param {Object} rootGetters - Vuex rootGetters for accessing getters
   * @param {Object} payload - An object containing the payload data for deleting the department
   * @param {string} payload.depId - The ID of the department to delete
   * @param {boolean} payload.deleteEmployees - Whether to delete the employees associated with the department
   * @param {string} payload.targetDepId - The ID of the target department to assign employees to
   * @return {Promise<void>} - A promise that resolves when the department is deleted, or rejects with an error
   */
  async deleteDepartment({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      await AjaxCall(
        `department/${payload.depId}?deleteEmployees=${payload.deleteEmployees}&&targetDepId=${payload.targetDepId}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${rootGetters["auth/token"].token}`,
        }
      );
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to delete department!");
      throw errorFromAjax;
    }
  },
};
