import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  /**
   * Returns the initial state of the Vuex store module for authentication.
   *
   * @return {Object} The initial state object with the following properties:
   *   - userId: A null value representing the user ID.
   *   - expiresAt: An integer representing the expiration time of the token.
   *   - refreshToken: An empty string representing the refresh token.
   *   - token: An empty string representing the access token.
   *   - currentUser
   **/
  state() {
    return {
      userId: null,
      expiresAt: 0,
      refreshToken: "",
      token: "",
      currentUser: null,
    };
  },
  mutations,
  actions,
  getters,
};
