import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  /**
   * Returns the initial state object for the workingTimes module.
   *
   * @return {Object} The initial state object.
   */
  state() {
    return {
      workingTimes: [],
      wtCount: 0,
      workingTime: null,
    };
  },
  mutations,
  getters,
  actions,
};
