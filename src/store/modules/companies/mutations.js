export default {
  /**
   * A function that sets the companies in the state.
   *
   * @param {Object} state - The Vuex state object.
   * @param {Array} payload - The array of companies to set in the state.
   */
  setCompanies(state, payload) {
    state.companies = payload;
  },
  /**
   * Sets the company in the state.
   *
   * @param {Object} state - The current state object.
   * @param {any} payload - The payload representing the company data.
   */
  setCompany(state, payload) {
    state.company = payload;
  },
  /**
   * Sets the token and refresh token in the state object.
   *
   * @param {Object} state - The state object to update.
   * @param {Object} payload - The payload containing the token and refresh token.
   * @param {string} payload.token - The user token.
   * @param {string} payload.refreshToken - The user refresh token.
   */
  setToken(state, payload) {
    state.token = payload.token;
    state.refreshToken = payload.refreshToken;
  },
};
