export default {
  /**
   * Checks if the user is authenticated by verifying the presence of both the user ID and token in the state.
   *
   * @param {Object} state - The state object containing the user ID and token.
   * @return {boolean} Returns true if both the user ID and token are present, otherwise false.
   */
  isAuthenticated(state) {
    return !!state.userId && !!state.token;
  },
  /**
   * Retrieves the token and refresh token from the state object.
   *
   * @param {Object} state - The state object containing the user's token and refresh token.
   * @return {Object} An object with the token and refresh token.
   */
  token(state) {
    return {
      token: state.token,
      refreshToken: state.refreshToken,
    };
  },
  /**
   * Retrieves the expiration timestamp from the state object.
   *
   * @param {Object} state - The state object containing the expiration timestamp.
   * @return {*} The expiration timestamp.
   */
  expiresAt(state) {
    return state.expiresAt;
  },
  /**
   * Retrieves the current user from the state object.
   *
   * @param {Object} state - The state object containing the current user.
   * @return {*} The current user.
   */
  currentUser(state) {
    return state.currentUser;
  },
  /**
   * Checks if the current user is present in the state object.
   *
   * @param {Object} state - The state object containing the current user.
   * @return {boolean} Returns true if the current user is present, otherwise false.
   */
  hasCurrentUser(state) {
    return !!state.currentUser;
  },
};
