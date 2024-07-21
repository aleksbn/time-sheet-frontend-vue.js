import { API_URL } from "./config";
import { TIMEOUT_SECONDS } from "./config";

/**
 * Resets the values of several keys in the localStorage object.
 *
 * @return {void} This function does not return anything.
 */
export const ResetLocalStorage = function () {
  localStorage.removeItem("comid");
  localStorage.removeItem("depid");
  localStorage.removeItem("empid");
  localStorage.removeItem("comidwt");
  localStorage.removeItem("depidwt");
  localStorage.removeItem("empidwt");
};

/**
 * A function that creates a timeout promise that rejects after a specified duration.
 *
 * @param {number} s - The duration in seconds before the promise rejects.
 * @return {Promise} A promise that rejects with an error message after the specified duration.
 */
export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Server request took too long! Timeout after ${s} second`)
      );
    }, s * 1000);
  });
};

/**
 * Makes an asynchronous HTTP request using the provided parameters.
 *
 * @param {string} link - The URL to which the request is made.
 * @param {string} method - The HTTP method for the request (e.g., GET, POST).
 * @param {Object} bodyData - The data to be sent in the request body.
 * @param {Object} authData - The authentication data to be included in the request headers.
 * @param {boolean} [longOperation=false] - Flag indicating if the operation is expected to be long.
 * @return {Promise} A promise that resolves with the response data upon successful completion.
 */
export const AjaxCall = async function (
  link,
  method,
  bodyData,
  authData,
  longOperation = false
) {
  const requestSettings = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...authData,
      body: JSON.stringify(bodyData),
    },
  };
  if (bodyData !== null) {
    requestSettings.body = JSON.stringify(bodyData);
  }

  const request = fetch(`${API_URL}${link}`, requestSettings);
  const res = await Promise.race([
    request,
    timeout(longOperation === false ? TIMEOUT_SECONDS : 120),
  ]);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data || "Failed to create new user!");
    throw error;
  }

  return data;
};
