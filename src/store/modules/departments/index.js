import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  /**
   * Returns the initial state object for the Vuex store module for departments.
   *
   * @return {Object} The initial state object with 'departments' array and 'department' null.
   */
  state() {
    return {
      departments: [],
      department: null,
    };
  },
  mutations,
  getters,
  actions,
};
