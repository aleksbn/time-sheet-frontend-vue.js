import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  /**
   * Returns the initial state of the Vuex store module for companies.
   *
   * @return {Object} The initial state object with properties:
   *   - companies: An empty array representing a list of companies.
   *   - company: A null value representing a single company.
   */
  state() {
    return {
      companies: [],
      company: null,
    };
  },
  mutations,
  getters,
  actions,
};
