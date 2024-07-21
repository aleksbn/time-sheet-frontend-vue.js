export default {
  /**
   * A function that sets the departments in the state.
   *
   * @param {Object} state - The Vuex state object.
   * @param {any} payload - The payload representing the departments data.
   */
  setDepartments(state, payload) {
    state.departments = payload;
  },
  /**
   * Sets the department in the state to the provided payload.
   *
   * @param {Object} state - The Vuex state object
   * @param {any} payload - The new department value
   */
  setDepartment(state, payload) {
    state.department = payload;
  },
};
