export default {
  /**
   * Returns the array of working times stored in the state.
   *
   * @param {Object} state - The current state of the application.
   * @return {Array} The array of working times.
   */
  workingTimes(state) {
    return state.workingTimes;
  },
  /**
   * A function that checks if there are working times in the state.
   *
   * @param {Object} state - The state object containing working times.
   * @return {boolean} Returns true if there are working times, false otherwise.
   */
  hasWorkingTimes(state) {
    return !!state.workingTimes && state.workingTimes.length > 0;
  },
  /**
   * Retrieves the working time from the state.
   *
   * @param {Object} state - The Vuex state object
   * @return {Object} The working time object from the state
   */
  workingTime(state) {
    return state.workingTime;
  },
  /**
   * Checks if the working time exists in the state.
   *
   * @param {Object} state - The state object.
   * @return {boolean} Returns true if the working time exists, false otherwise.
   */
  hasWorkingTime(state) {
    return !!state.workingTime;
  },
  /**
   * Returns the number of working times stored in the state.
   *
   * @param {Object} state - The current state of the application.
   * @return {number} The number of working times.
   */
  numberOfWorkingTimes(state) {
    return state.wtCount;
  },
};
