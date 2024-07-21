<template>
  <tr>
    <td>{{ ID }}</td>
    <td>{{ fullName }}</td>
    <td>{{ new Date(WtDate).toDateString() }}</td>
    <td>{{ StartTime }}</td>
    <td>{{ EndTime }}</td>
    <td id="actions">
      <base-button :type="'button'" style="display: inline" @click="editWT"
        >Edit</base-button
      >
      <base-button :type="'button'" style="display: inline" @click="deleteWT"
        >Delete</base-button
      >
    </td>
  </tr>
</template>

<script>
export default {
  props: ["ID", "Employee", "WtDate", "StartTime", "EndTime"],
  emits: ["delete", "edit"],
  computed: {
    /**
     * A method that combines the first name and last name of an Employee.
     *
     * @return {string} The full name of the Employee.
     */
    fullName() {
      return `${this.Employee.firstName} ${this.Employee.lastName}`;
    },
  },
  methods: {
    /**
     * Emits a "delete" event with the ID of the WorkingTimeItem.
     *
     * @return {void}
     */
    deleteWT() {
      this.$emit("delete", this.ID);
    },
    /**
     * Emits an "edit" event with the ID of the current working time item.
     *
     * @return {void}
     */
    editWT() {
      this.$emit("edit", this.ID);
    },
  },
};
</script>

<style scoped>
td {
  height: 2em;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

#actions {
  width: 15%;
}
</style>
