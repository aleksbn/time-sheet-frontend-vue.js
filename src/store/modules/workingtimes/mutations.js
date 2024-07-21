export default {
  /**
   * Set the working times in the state based on the payload.
   *
   * @param {object} state - The Vuex state object
   * @param {object} payload - The payload containing working times data
   */
  setWorkingTimes(state, payload) {
    state.workingTimes = payload.wts;
    state.wtCount = payload.wtcount;
  },
  /**
   * Sets the working time in the state to the provided payload.
   *
   * @param {Object} state - The Vuex state object.
   * @param {any} payload - The new working time value.
   */
  setWorkingTime(state, payload) {
    state.workingTime = payload;
  },
};
