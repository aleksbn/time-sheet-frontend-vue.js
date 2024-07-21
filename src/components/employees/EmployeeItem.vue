<template>
  <tr>
    <td>{{ ID }}</td>
    <td>{{ fullName }}</td>
    <td>{{ JobTitle }}</td>
    <td>{{ Degree }}</td>
    <td>{{ Phone }}</td>
    <td>{{ Department.name }}</td>
    <td>{{ HourlyRate }} $</td>
    <td><base-button link :to="detailsLink">Details</base-button></td>
  </tr>
</template>

<script>
export default {
  props: [
    "ID",
    "FirstName",
    "LastName",
    "JobTitle",
    "Degree",
    "Phone",
    "Address",
    "DateOfBirth",
    "StartOdEmployment",
    "HourlyRate",
    "DepartmentId",
    "Department",
  ],
  computed: {
    /**
     * Returns the full name of the employee by concatenating the first name and last name.
     *
     * @return {string} The full name of the employee.
     */
    fullName() {
      return `${this.FirstName} ${this.LastName}`;
    },
    /**
     * Generates the link to the employee details page based on the current route and the presence of "depid" in local storage.
     *
     * @return {string} The link to the employee details page.
     */
    detailsLink() {
      if (localStorage.getItem("depid") !== null) {
        return `${this.$route.path
          .split("/")
          .slice(0, -3)
          .join("/")}/employeedetails/${this.ID}`;
      } else {
        return `${this.$route.path
          .split("/")
          .slice(0, -2)
          .join("/")}/employeedetails/${this.ID}`;
      }
    },
  },
};
</script>
