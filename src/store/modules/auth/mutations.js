export default {
  /**
   * Sets the user ID in the state to the provided payload ID.
   *
   * @param {Object} state - The state object.
   * @param {Object} payload - The payload object containing the user ID.
   * @param {string} payload.Id - The ID of the user.
   */
  setUser(state, payload) {
    state.userId = payload.Id;
  },

  /**
   * Sets the user login data in the state.
   *
   * @param {Object} state - The Vuex state object.
   * @param {Object} payload - The payload containing user login data.
   */
  setUserLoginData(state, payload) {
    state.userId = payload.id;
    state.token = payload.tokenValue.token;
    state.refreshToken = payload.tokenValue.refreshToken;
    state.expiresAt = payload.tokenValue.expiresAt;
  },

  /**
   * Sets the user data in the state.
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - The payload containing the user data.
   * @param {string} payload.id - The user ID.
   * @param {string} payload.token - The user token.
   * @param {string} payload.refreshToken - The user refresh token.
   * @param {string} payload.expiresAt - The expiration date and time of the token.
   */
  setUserData(state, payload) {
    state.userId = payload.id;
    state.token = payload.token;
    state.refreshToken = payload.refreshToken;
    state.expiresAt = payload.expiresAt;
  },

  /**
   * Sets the token, refresh token, and expiration date in the state based on the provided payload.
   *
   * @param {Object} state - The current state object.
   * @param {Object} payload - The payload containing the token, refresh token, and expiration date.
   * @param {string} payload.token - The user token.
   * @param {string} payload.refreshToken - The user refresh token.
   * @param {string} payload.expiresAt - The expiration date and time of the token.
   */
  setToken(state, payload) {
    state.token = payload.token;
    state.refreshToken = payload.refreshToken;
    state.expiresAt = payload.expiresAt;
  },

  /**
   * Sets the current user in the state.
   *
   * @param {Object} state - The current state object.
   * @param {any} payload - The payload containing the current user data.
   */
  setCurrentUser(state, payload) {
    state.currentUser = payload;
  },

  /**
   * Logs out the user by resetting state and removing user data from local storage.
   *
   * @param {Object} state - The current state object.
   */
  logout(state) {
    state.userId = null;
    state.token = "";
    state.refreshToken = "";
    state.expiresAt = 0;
    localStorage.removeItem("userId");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
  },
};
