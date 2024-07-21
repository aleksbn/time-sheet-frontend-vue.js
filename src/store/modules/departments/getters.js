export default {
  /**
   * Retrieves the departments from the state.
   *
   * @param {Object} state - The Vuex state object.
   * @return {Array} The array of departments.
   */
  departments(state) {
    return state.departments;
  },
  /**
   * Checks if the state has departments.
   *
   * @param {Object} state - The state object.
   * @return {boolean} Returns true if the state has departments, false otherwise.
   */
  hasDepartments(state) {
    return !!state.departments && state.departments.length > 0;
  },
  /**
   * Returns the department object from the state.
   *
   * @param {Object} state - The state object.
   * @return {Object|undefined} The department object from the state, or undefined if it doesn't exist.
   */
  department(state) {
    return state.department;
  },
  /**
   * Checks if the department exists in the state.
   *
   * @param {Object} state - The state object.
   * @return {boolean} Returns true if the department exists, otherwise false.
   */
  hasDepartment(state) {
    return !!state.department;
  },
};
