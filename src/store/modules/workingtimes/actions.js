import { AjaxCall } from "@/helpers";

export default {
  /**
   * Load working times from the server based on the payload parameters.
   *
   * @param {Object} commit - A function to commit Vuex store mutations
   * @param {Object} dispatch - A function to dispatch Vuex actions
   * @param {Object} rootGetters - Vuex store root getters
   * @param {Object} payload - An object containing payload data for the request
   * @return {Promise} A Promise that resolves once the working times are loaded
   */
  async loadWorkingTimes({ commit, dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const link = payload.link;
      const data = await AjaxCall(
        `${link}${payload.id}?PageNumber=${payload.pageNumber}&PageSize=${payload.pageSize}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${rootGetters["auth/token"].token}`,
        }
      );
      const workingTimes = [];
      for (const key in data.toReturn) {
        const wt = {
          ID: data.toReturn[key].id,
          Date: data.toReturn[key].date,
          StartTime: data.toReturn[key].startTime,
          EndTime: data.toReturn[key].endTime,
          EmployeeID: data.toReturn[key].employeeID,
          Employee: data.toReturn[key].employee,
        };
        workingTimes.push(wt);
      }
      commit("setWorkingTimes", {
        wts: workingTimes,
        wtcount: data.count,
      });
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to load working times!");
      throw errorFromAjax;
    }
  },

  /**
   * Asynchronously loads a working time from the server based on the payload parameter.
   *
   * @param {Object} commit - A function to commit Vuex store mutations.
   * @param {Object} dispatch - A function to dispatch Vuex actions.
   * @param {Object} rootGetters - Vuex store root getters.
   * @param {string} payload - The ID of the working time to load.
   * @return {Promise<void>} A Promise that resolves once the working time is loaded.
   * @throws {Error} If the working time data fails to load.
   */
  async loadWorkingTime({ commit, dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const data = await AjaxCall(
        `workingtime/GetWorkingTime/${payload}`,
        "GET",
        null,
        {
          Authorization: `Bearer ${rootGetters["auth/token"].token}`,
        }
      );
      const wt = {
        ID: data.id,
        Employee: data.employee,
        WtDate: data.date,
        StartTime: data.startTime,
        EndTime: data.endTime,
      };
      commit("setWorkingTime", wt);
    } catch (error) {
      const errorFromAjax = new Error(
        error || "Failed to load working time data!"
      );
      throw errorFromAjax;
    }
  },

  /**
   * Asynchronously adds multiple working times to the server.
   *
   * @param {Object} dispatch - A function to dispatch Vuex actions.
   * @param {Object} rootGetters - Vuex store root getters.
   * @param {Object} payload - The payload containing the working times data to add.
   * @return {Promise<void>} A Promise that resolves once the working times are added.
   * @throws {Error} If failed to add multiple working times.
   */
  async addWorkingTimes({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const wtData = payload.employees
        .filter((e) => e.didWork)
        .map((e) => {
          return {
            EmployeeId: e.id,
            Date: e.date.split(".").reverse().join("/"),
            StartTime: e.startTime,
            EndTime: e.endTime,
          };
        });
      await AjaxCall(
        `workingtime/createmultiple/`,
        "POST",
        wtData,
        {
          Authorization: `Bearer ${rootGetters["auth/token"].token}`,
        },
        true
      );
    } catch (error) {
      let errorFromAjax = error
        .replace("That", "Some of those")
        .replace("employee", "employees")
        .replace("has", "have");
      errorFromAjax = new Error(
        error || "Failed to add multiple working times!"
      );
      throw errorFromAjax;
    }
  },

  /**
   * Asynchronously adds a working time to the server.
   *
   * @param {Object} dispatch - A function to dispatch Vuex actions.
   * @param {Object} rootGetters - Vuex store root getters.
   * @param {Object} payload - The payload containing the working time data to add.
   * @param {string} payload.wtEmployeeId - The ID of the employee.
   * @param {string} payload.wtDate - The date of the working time in the format "dd.mm.yyyy".
   * @param {string} payload.wtStartTime - The start time of the working time.
   * @param {string} payload.wtEndTime - The end time of the working time.
   * @return {Promise<void>} A Promise that resolves once the working time is added.
   * @throws {Error} If failed to add working time.
   */
  async addWorkingTime({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const wtData = {
        EmployeeId: payload.wtEmployeeId,
        Date: payload.wtDate.split(".").reverse().join("/"),
        StartTime: payload.wtStartTime,
        EndTime: payload.wtEndTime,
      };
      await AjaxCall(`workingtime/create`, "POST", wtData, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to add workingtime!");
      throw errorFromAjax;
    }
  },

  /**
   * Asynchronously deletes a working time based on the provided payload.
   *
   * @param {Object} dispatch - A function to dispatch Vuex actions.
   * @param {Object} rootGetters - Vuex store root getters.
   * @param {Object} payload - The payload containing the ID of the working time to delete.
   * @throws {Error} If the deletion of the working time fails.
   */
  async deleteWorkingTime({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      await AjaxCall(
        `workingtime/deleteWorkingTime/${payload.id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${rootGetters["auth/token"].token}`,
        }
      );
    } catch (error) {
      const errorFromAjax = new Error(
        error || "Failed to delete working time!"
      );
      throw errorFromAjax;
    }
  },

  /**
   * Asynchronously edits a working time based on the provided payload.
   *
   * @param {Object} dispatch - A function to dispatch Vuex actions.
   * @param {Object} rootGetters - Vuex store root getters.
   * @param {Object} payload - The payload containing the working time data to edit.
   * @return {Promise<void>} A Promise that resolves once the working time is edited.
   */
  async editWorkingTime({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const wt = {
        ID: payload.wtId,
        Date: payload.wtDate.split(".").reverse().join("/"),
        StartTime: payload.wtStartTime,
        EndTime: payload.wtEndTime,
        EmployeeId: payload.wtEmployeeId,
      };
      await AjaxCall(`workingtime/editWorkingTime`, "PUT", wt, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
    } catch (error) {
      const errorFromAjax = new Error(
        error || "Failed to edit working time data!"
      );
      throw errorFromAjax;
    }
  },
};
