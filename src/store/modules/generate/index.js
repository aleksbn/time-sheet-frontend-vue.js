import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  /**
   * Returns the initial state for the Vuex store module.
   *
   * @return {Object} The initial state object.
   */
  state() {
    return {};
  },
  mutations,
  getters,
  actions,
};
