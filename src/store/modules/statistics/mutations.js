export default {
  /**
   * Sets the statistics in the state to the provided payload.
   *
   * @param {Object} state - The Vuex state object.
   * @param {Array} payload - The new statistics value.
   */
  setStatistics(state, payload) {
    state.statistics = payload;
  },
};
