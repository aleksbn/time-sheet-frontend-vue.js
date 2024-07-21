export default {
  /**
   * Check if there are statistics available.
   *
   * @param {Object} state - The state object containing statistics.
   * @return {boolean} Returns true if statistics exist, false otherwise.
   */
  hasStatistics(state) {
    return !!state.statistics && state.statistics.length > 0;
  },
  /**
   * Returns the statistics from the state.
   *
   * @param {Object} state - The state object.
   * @return {Array} The statistics array.
   */
  statistics(state) {
    return state.statistics;
  },
};
