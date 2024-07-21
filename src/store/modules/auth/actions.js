import { AjaxCall } from "@/helpers";

export default {
  /**
   * Registers a new user by making a POST request to the authentication API.
   *
   * @param {any} _ - The first parameter (unused in this function).
   * @param {any} payload - The data payload for the user registration.
   * @return {Promise} A promise that resolves when the user is successfully registered.
   */
  async register(_, payload) {
    try {
      await AjaxCall("Authentication/register-user", "POST", payload, {});
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to create new user!");
      throw errorFromAjax;
    }
  },
  /**
   * Retrieves the current user's data from the authentication API and sets it in the store.
   *
   * @param {Object} context - The Vuex action context object.
   * @param {Function} context.commit - The Vuex commit function.
   * @param {Function} context.dispatch - The Vuex dispatch function.
   * @param {Function} context.rootGetters - The Vuex root getters object.
   * @return {Promise} A promise that resolves when the user data is successfully retrieved and set in the store.
   * @throws {Error} If there is an error retrieving the user data.
   */
  async getUser({ commit, dispatch, rootGetters }) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const data = await AjaxCall("Authentication/get-user", "GET", null, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });

      const user = {
        FirstName: data.firstName,
        LastName: data.lastName,
        Email: data.email,
      };
      commit("setCurrentUser", user);
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to load user data!");
      throw errorFromAjax;
    }
  },
  /**
   * Edits the user's data by making a PUT request to the authentication API.
   *
   * @param {Object} context - The Vuex action context object.
   * @param {Function} context.dispatch - The Vuex dispatch function.
   * @param {Function} context.rootGetters - The Vuex root getters object.
   * @param {Object} payload - The data payload for the user edit.
   * @return {Promise} A promise that resolves when the user data is successfully updated.
   * @throws {Error} If there is an error updating the user data.
   */
  async editUser({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      await AjaxCall("Authentication/edit-user", "PUT", payload, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to update user data!");
      throw errorFromAjax;
    }
  },

  /**
   * A function to handle user login.
   *
   * @param {Object} commit - The Vuex commit function.
   * @param {Object} payload - The user login payload.
   * @return {Promise} A promise that resolves after the login process is completed.
   */
  async login({ commit }, payload) {
    try {
      console.log(payload);
      const data = await AjaxCall(
        "Authentication/login-user",
        "POST",
        payload,
        {}
      );
      commit("setUserLoginData", data);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("token", data.tokenValue.token);
      localStorage.setItem("refreshToken", data.tokenValue.refreshToken);
      localStorage.setItem("expiresAt", data.tokenValue.expiresAt);
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to login!");
      throw errorFromAjax;
    }
  },

  /**
   * Logs out the user by committing the "logout" mutation.
   *
   * @param {Object} context - The Vuex action context object.
   * @return {Promise<void>} - A promise that resolves when the user is logged out.
   */
  async logout(context) {
    context.commit("logout");
  },

  /**
   * Sets the user data in the state by committing a mutation.
   *
   * @param {Object} context - The Vuex action context object.
   * @param {Object} payload - The data payload containing user information.
   */
  setUserData(context, payload) {
    context.commit("setUserData", payload);
  },

  /**
   * Checks the tokens and refreshes them if necessary.
   *
   * @param {Object} context - The Vuex action context object.
   * @param {Object} context.commit - The Vuex commit function.
   * @param {Object} context.getters - The Vuex getters object.
   * @return {Promise<void>} - A promise that resolves when the tokens are checked and refreshed, if necessary.
   */
  async checkTokens({ commit, getters }) {
    if (
      getters.userId !== null &&
      new Date(getters.expiresAt).getTime() + 120000 <= Date.now()
    ) {
      try {
        const data = await AjaxCall(
          "authentication/refresh-token",
          "POST",
          getters.token,
          {}
        );
        commit("setToken", data);
      } catch (error) {
        const errorFromAjax = new Error(error || "Failed to refresh token!");
        throw errorFromAjax;
      }
    }
  },
};
