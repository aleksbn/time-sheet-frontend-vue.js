export default {
  /**
   * Retrieves the employees from the state.
   *
   * @param {Object} state - The Vuex state object
   * @return {Array} The array of employees from the state
   */
  employees(state) {
    return state.employees;
  },
  /**
   * A function that checks if there are employees in the state.
   *
   * @param {Object} state - The state object containing information about employees.
   * @return {boolean} True if there are employees, false otherwise.
   */
  hasEmployees(state) {
    return !!state.employees && state.employees.length > 0;
  },
  /**
   * Returns the employee object from the state.
   *
   * @param {Object} state - The state object.
   * @return {Object} The employee object.
   */
  employee(state) {
    return state.employee;
  },
  /**
   * Determines if there is an employee in the state.
   *
   * @param {Object} state - The Vuex state object.
   * @return {boolean} True if there is an employee, false otherwise.
   */
  hasEmployee(state) {
    return !!state.employee;
  },
  /**
   * Retrieves the number of employees from the state.
   *
   * @param {Object} state - The Vuex state object.
   * @return {number} The number of employees.
   */
  numberOfEmployees(state) {
    return state.emCount;
  },
};
