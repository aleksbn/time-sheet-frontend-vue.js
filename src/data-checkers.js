import moment from "moment";
export default {
  /**
   * Checks if the given value is a valid person name.
   *
   * @param {string} value - The value to be checked.
   * @return {boolean} Returns true if the value is a valid person name, false otherwise.
   */
  checkPersonName(value) {
    const NAME_REGEX = /^[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+){0,2}[.]{0,1}$/;
    return NAME_REGEX.test(value);
  },
  /**
   * Checks if the given value is a valid email address.
   *
   * @param {string} value - The email address to be checked.
   * @return {boolean} Returns true if the value is a valid email address, false otherwise.
   */
  checkEmail(value) {
    const EMAIL_REGEX =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return EMAIL_REGEX.test(value);
  },
  /**
   * Checks if the given value is a valid password.
   *
   * @param {string} value - The password to be checked.
   * @return {boolean} Returns true if the password is valid, false otherwise.
   */
  checkPassword(value) {
    const PASSWORD_REGEX =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$/;
    return PASSWORD_REGEX.test(value);
  },
  /**
   * Checks if the given value is a valid city name.
   *
   * @param {string} value - The city name to be checked.
   * @return {boolean} Returns true if the value is a valid city name, false otherwise.
   */
  checkCity(value) {
    const CITY_REGEX =
      /^(?:[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/;
    return CITY_REGEX.test(value);
  },
  /**
   * Checks if the given value is a valid country name.
   *
   * @param {string} value - The value to be checked.
   * @return {boolean} Returns true if the value is a valid country name, false otherwise.
   */
  checkCountry(value) {
    const COUNTRY_REGEX =
      /^(?:[A-Za-z]{2,}(?:(\.\s|'s\s|\s?-\s?|\s)?(?=[A-Za-z]+))){1,2}(?:[A-Za-z]+)?$/;
    return COUNTRY_REGEX.test(value);
  },
  /**
   * Checks if the given value is a valid date in the format "DD.MM.YYYY".
   *
   * @param {string} value - The date to be checked.
   * @return {boolean} Returns true if the value is a valid date, false otherwise.
   */
  checkDate(value) {
    return moment(value, "DD.MM.YYYY", true).isValid();
  },
  /**
   * Checks if the given value is a valid phone number.
   *
   * @param {string} value - The phone number to be checked.
   * @return {boolean} Returns true if the value is a valid phone number, false otherwise.
   */
  checkPhone(value) {
    const PHONE_REGEX = /^[+]?[0-9]{3,25}$/;
    return PHONE_REGEX.test(value);
  },
  /**
   * Checks if the given value is a valid degree.
   *
   * @param {string} value - The value to be checked.
   * @return {boolean} Returns true if the value is a valid degree, false otherwise.
   */
  checkDegree(value) {
    const DEGREE_REGEX = /^[A-Za-z\s]*$/;
    return DEGREE_REGEX.test(value);
  },
};
