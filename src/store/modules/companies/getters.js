export default {
  /**
   * Retrieves the list of companies from the state.
   *
   * @param {Object} state - The Vuex state object.
   * @return {Array} The list of companies.
   */
  companies(state) {
    return state.companies;
  },
  /**
   * Checks if the state has companies and returns a boolean.
   *
   * @param {Object} state - The state object.
   * @return {boolean} Returns true if the state has companies, false otherwise.
   */
  hasCompanies(state) {
    return !!state.companies && state.companies.length > 0;
  },
  /**
   * Retrieves the company from the state.
   *
   * @param {Object} state - The state object.
   * @return {Object|null} The company object or null if it does not exist.
   */
  company(state) {
    return state.company;
  },
  /**
   * Check if a company exists in the state.
   *
   * @param {Object} state - The Vuex state object.
   * @return {boolean} True if a company exists, false otherwise.
   */
  hasCompany(state) {
    return !!state.company;
  },
};
