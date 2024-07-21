export default {
  /**
   * Sets the employee count and list of employees in the state based on the provided payload.
   *
   * @param {Object} state - The Vuex state object
   * @param {Object} payload - An object containing the employee count and list of employees
   */
  setEmployees(state, payload) {
    state.emCount = payload.emCount;
    state.employees = payload.employees;
  },
  /**
   * Sets the employee in the state.
   *
   * @param {Object} state - The Vuex state object.
   * @param {Object} payload - The new employee value.
   */
  setEmployee(state, payload) {
    state.employee = payload;
  },
};
