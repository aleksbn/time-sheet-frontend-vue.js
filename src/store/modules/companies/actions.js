import { AjaxCall } from "@/helpers";

export default {
  /**
   * Loads the list of companies from the server and updates the store.
   *
   * @param {Object} context - The Vuex context object.
   * @param {Function} context.commit - The Vuex commit function.
   * @param {Function} context.dispatch - The Vuex dispatch function.
   * @param {Object} context.rootGetters - The root Vuex getters object.
   * @return {Promise<void>} A promise that resolves when the companies are loaded and the store is updated.
   * @throws {Error} If there is an error loading the companies.
   */
  async loadCompanies({ commit, dispatch, rootGetters }) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const data = await AjaxCall("company", "GET", null, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
      const companies = [];
      for (const key in data) {
        const com = {
          ID: data[key].id,
          Name: data[key].name,
          Address: data[key].address,
          City: data[key].city,
          Country: data[key].country,
          Email: data[key].email,
          CompanyManagerId: data[key].companyManagerId,
          StartTime: data[key].startTime,
          EndTime: data[key].endTime,
        };
        companies.push(com);
        commit("setCompanies", companies);
      }
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to load companies!");
      throw errorFromAjax;
    }
  },

  /**
   * Loads a single company from the server and updates the store with its details.
   *
   * @param {Object} commit - The Vuex commit function.
   * @param {Object} dispatch - The Vuex dispatch function.
   * @param {Object} rootGetters - The root Vuex getters object.
   * @param {Object} payload - An object containing the company ID.
   * @return {Promise<void>} A promise that resolves when the company is loaded and the store is updated.
   */
  async loadCompany({ commit, dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const data = await AjaxCall(`company/${payload.id}`, "GET", null, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
      const company = {
        ID: data.id,
        Name: data.name,
        Address: data.address,
        City: data.city,
        Country: data.country,
        Email: data.email,
        CompanyManagerId: data.companyManagerId,
        StartTime: data.startTime,
        EndTime: data.endTime,
      };
      commit("setCompany", company);
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to load companies!");
      throw errorFromAjax;
    }
  },

  /**
   * Asynchronously adds a new company with the provided details.
   *
   * @param {Object} dispatch - A Vuex dispatch function for dispatching actions
   * @param {Object} rootGetters - Vuex rootGetters for accessing getters
   * @param {Object} payload - An object containing the data for the new company
   * @param {string} payload.comName - The name of the company
   * @param {string} payload.comAddress - The address of the company
   * @param {string} payload.comCity - The city where the company is located
   * @param {string} payload.comCountry - The country where the company is located
   * @param {string} payload.comEmail - The email of the company
   * @param {string} payload.comStartTime - The start time of the company
   * @param {string} payload.comEndTime - The end time of the company
   * @return {Promise<void>} A promise that resolves when the company is successfully added, or rejects with an error
   */
  async addCompany({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    const com = {
      Name: payload.comName,
      Address: payload.comAddress,
      City: payload.comCity,
      Country: payload.comCountry,
      Email: payload.comEmail,
      StartTime: payload.comStartTime,
      EndTime: payload.comEndTime,
    };
    try {
      await AjaxCall("company", "POST", com, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to add company!");
      throw errorFromAjax;
    }
  },

  /**
   * Asynchronously edits a company with the provided details.
   *
   * @param {Object} dispatch - A Vuex dispatch function for dispatching actions
   * @param {Object} rootGetters - Vuex rootGetters for accessing getters
   * @param {Object} payload - An object containing the data for editing the company
   * @param {string} payload.comId - The ID of the company to edit
   * @param {string} payload.comName - The new name of the company
   * @param {string} payload.comAddress - The new address of the company
   * @param {string} payload.comCity - The new city where the company is located
   * @param {string} payload.comCountry - The new country where the company is located
   * @param {string} payload.comEmail - The new email of the company
   * @param {string} payload.comStartTime - The new start time of the company
   * @param {string} payload.comEndTime - The new end time of the company
   * @return {Promise<void>} A promise that resolves when the company is successfully edited, or rejects with an error
   */
  async editCompany({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    const com = {
      ID: payload.comId,
      Name: payload.comName,
      Address: payload.comAddress,
      City: payload.comCity,
      Country: payload.comCountry,
      Email: payload.comEmail,
      CompanyManagerId: localStorage.getItem("userId"),
      StartTime: payload.comStartTime,
      EndTime: payload.comEndTime,
    };
    try {
      await AjaxCall("company", "PUT", com, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to edit company!");
      throw errorFromAjax;
    }
  },

  /**
   * Asynchronously deletes a company with the given payload.
   *
   * @param {Object} dispatch - A Vuex dispatch function to dispatch actions
   * @param {Object} rootGetters - Vuex rootGetters for accessing getters
   * @param {Object} payload - An object containing the payload data for deleting the company
   * @param {string} payload.id - The ID of the company to delete
   * @param {string} payload.targetDepartmentId - The ID of the target department to move employees to
   * @param {boolean} payload.deleteEmployees - Whether to delete employees along with the company
   * @return {Promise<void>} - A promise that resolves when the company is deleted, or rejects with an error
   */
  async deleteCompany({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      await AjaxCall(
        `company/${payload.id}?targetDepartmentId=${payload.targetDepartmentId}&&deleteEmployees=${payload.deleteEmployees}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${rootGetters["auth/token"].token}`,
        }
      );
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to delete company!");
      throw errorFromAjax;
    }
  },
};
