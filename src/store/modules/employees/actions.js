import { AjaxCall } from "@/helpers";

export default {
  /**
   * Loads an employee's data from the server based on the provided payload.
   *
   * @param {Object} commit - A Vuex commit function for committing mutations
   * @param {Object} dispatch - A Vuex dispatch function for dispatching actions
   * @param {Object} rootGetters - Vuex rootGetters object for accessing getters
   * @param {Object} payload - The payload containing information to load the employee
   * @returns {Promise} Promise that resolves with the loaded employee data or rejects with an error
   */
  async loadEmployee({ commit, dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const data = await AjaxCall(`employee/${payload.empid}`, "GET", null, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
      const employee = {
        ID: data.id,
        FirstName: data.firstName,
        LastName: data.lastName,
        JobTitle: data.jobTitle,
        Degree: data.degree,
        Email: data.email,
        Address: data.address,
        Phone: data.phone,
        DateOfBirth: data.dateOfBirth,
        StartOfEmployment: data.startOfEmployment,
        HourlyRate: data.hourlyRate,
        DepartmentId: data.departmentId,
      };
      commit("setEmployee", employee);
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to load employee data!");
      throw errorFromAjax;
    }
  },

  /**
   * Loads employees' data from the server based on the provided payload.
   *
   * @param {Object} commit - A Vuex commit function for committing mutations
   * @param {Object} dispatch - A Vuex dispatch function for dispatching actions
   * @param {Object} rootGetters - Vuex rootGetters object for accessing getters
   * @param {Object} payload - The payload containing information to load the employees
   * @returns {Promise} Promise that resolves with the loaded employees' data or rejects with an error
   */
  async loadEmployees({ commit, dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const data = await AjaxCall(`employee/${payload.link}`, "GET", null, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
      const employees = [];
      for (const key in data.toReturn) {
        const employee = {
          ID: data.toReturn[key].id,
          FirstName: data.toReturn[key].firstName,
          LastName: data.toReturn[key].lastName,
          JobTitle: data.toReturn[key].jobTitle,
          Degree: data.toReturn[key].degree,
          Address: data.toReturn[key].address,
          Email: data.toReturn[key].email,
          Phone: data.toReturn[key].phone,
          DateOfBirth: data.toReturn[key].dateOfBirth,
          StartOfEmployment: data.toReturn[key].startOfEmployment,
          HourlyRate: data.toReturn[key].hourlyRate,
          DepartmentId: data.toReturn[key].departmentId,
          Department: data.toReturn[key].department,
        };
        employees.push(employee);
      }

      commit("setEmployees", {
        employees: employees,
        emCount: data.count,
      });
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to load employees!");
      throw errorFromAjax;
    }
  },

  /**
   * Adds a new employee to the system.
   *
   * @param {Object} dispatch - A Vuex dispatch function for dispatching actions
   * @param {Object} rootGetters - Vuex rootGetters object for accessing getters
   * @param {Object} payload - The payload containing information about the new employee
   * @param {string} payload.empFirstName - The first name of the new employee
   * @param {string} payload.empLastName - The last name of the new employee
   * @param {string} payload.empAddress - The address of the new employee
   * @param {string} payload.empEmail - The email of the new employee
   * @param {string} payload.empPhone - The phone number of the new employee
   * @param {string} payload.empJobTitle - The job title of the new employee
   * @param {string} payload.empDegree - The degree of the new employee
   * @param {string} payload.empDateOfBirth - The date of birth of the new employee in the format "DD.MM.YYYY"
   * @param {string} payload.empStartOfEmployment - The start of employment date of the new employee in the format "DD.MM.YYYY"
   * @param {number} payload.empHourlyRate - The hourly rate of the new employee
   * @param {number} payload.empDepartmentId - The ID of the department the new employee belongs to
   * @returns {Promise} A promise that resolves when the employee is successfully added or rejects with an error
   * @throws {Error} If there is an error adding the employee
   */
  async addEmployee({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const emp = {
        FirstName: payload.empFirstName,
        LastName: payload.empLastName,
        Address: payload.empAddress,
        Email: payload.empEmail,
        Phone: payload.empPhone,
        JobTitle: payload.empJobTitle,
        Degree: payload.empDegree,
        DateOfBirth: payload.empDateOfBirth.split(".").reverse().join("/"),
        StartOfEmployment: payload.empStartOfEmployment
          .split(".")
          .reverse()
          .join("/"),
        HourlyRate: payload.empHourlyRate,
        DepartmentId: payload.empDepartmentId,
      };
      await AjaxCall("employee", "POST", emp, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to add employee!");
      throw errorFromAjax;
    }
  },

  /**
   * Edits an employee's information.
   *
   * @param {Object} dispatch - A Vuex dispatch function for dispatching actions
   * @param {Object} rootGetters - Vuex rootGetters object for accessing getters
   * @param {Object} payload - The payload containing information about the employee to edit
   * @param {string} payload.empId - The ID of the employee to edit
   * @param {string} payload.empDepartmentId - The ID of the department the employee belongs to
   * @param {string} payload.empFirstName - The updated first name of the employee
   * @param {string} payload.empLastName - The updated last name of the employee
   * @param {string} payload.empJobTitle - The updated job title of the employee
   * @param {string} payload.empDegree - The updated degree of the employee
   * @param {string} payload.empAddress - The updated address of the employee
   * @param {string} payload.empEmail - The updated email of the employee
   * @param {string} payload.empPhone - The updated phone number of the employee
   * @param {string} payload.empDateOfBirth - The updated date of birth of the employee in the format "DD.MM.YYYY"
   * @param {string} payload.empStartOfEmployment - The updated start of employment date of the employee in the format "DD.MM.YYYY"
   * @param {number} payload.empHourlyRate - The updated hourly rate of the employee
   * @throws {Error} If there is an error editing the employee
   */
  async editEmployee({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const emp = {
        ID: payload.empId,
        DepartmentId: payload.empDepartmentId,
        FirstName: payload.empFirstName,
        LastName: payload.empLastName,
        JobTitle: payload.empJobTitle,
        Degree: payload.empDegree,
        Address: payload.empAddress,
        Email: payload.empEmail,
        Phone: payload.empPhone,
        DateOfBirth: payload.empDateOfBirth.split(".").reverse().join("/"),
        StartOfEmployment: payload.empStartOfEmployment
          .split(".")
          .reverse()
          .join("/"),
        HourlyRate: payload.empHourlyRate,
      };
      await AjaxCall("employee", "PUT", emp, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to edit employee data!");
      throw errorFromAjax;
    }
  },

  /**
   * Asynchronously deletes an employee with the given payload.
   *
   * @param {Object} dispatch - A Vuex dispatch function to dispatch actions
   * @param {Object} rootGetters - Vuex rootGetters object for accessing getters
   * @param {Object} payload - An object containing the payload data for deleting the employee
   * @param {string} payload.empId - The ID of the employee to delete
   * @throws {Error} If there is an error deleting the employee
   */
  async deleteEmployee({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      await AjaxCall(`employee/${payload.empId}`, "DELETE", null, {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
      });
    } catch (error) {
      const errorFromAjax = new Error(error || "Failed to delete employee!");
      throw errorFromAjax;
    }
  },
};
