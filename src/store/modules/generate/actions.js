import { AjaxCall } from "@/helpers";

export default {
  /**
   * Asynchronously generates random data for a given company, number of employees, and number of days.
   *
   * @param {Object} dispatch - A Vuex dispatch function to dispatch actions
   * @param {Object} rootGetters - Vuex rootGetters object for accessing getters
   * @param {Object} payload - An object containing the payload data for generating random data
   * @param {string} payload.comid - The ID of the company
   * @param {number} payload.numberOfEmployees - The number of employees per department
   * @param {number} payload.numberOfDays - The number of working days
   * @return {Promise<void>} - A promise that resolves when the random data is generated, or rejects with an error
   * @throws {Error} If there is an error generating the random data
   */
  async generateData({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      await AjaxCall(
        `randomgenerate/${payload.comid}/${payload.numberOfEmployees}/${payload.numberOfDays}`,
        "POST",
        null,
        {
          Authorization: `Bearer ${rootGetters["auth/token"].token}`,
        }
      );
    } catch (error) {
      const errorFromAjax = new Error(
        error || "Failed to generate random data!"
      );
      throw errorFromAjax;
    }
  },
};
