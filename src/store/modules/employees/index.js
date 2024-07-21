import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  /**
   * Returns the initial state object for the employees module.
   *
   * @return {Object} The initial state object.
   */
  state() {
    return {
      employees: [],
      emCount: 0,
      employee: null,
    };
  },
  mutations,
  getters,
  actions,
};
