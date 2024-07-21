import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  /**
   * Returns the initial state of the statistics module.
   *
   * @return {Object} The initial state object with the following properties:
   *   - statistics: An empty array representing the statistics.
   */
  state() {
    return {
      statistics: [],
    };
  },
  mutations,
  getters,
  actions,
};
