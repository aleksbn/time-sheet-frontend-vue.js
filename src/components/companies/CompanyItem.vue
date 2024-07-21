<template>
  <li>
    <h3>{{ ID }} - {{ Name }}</h3>
    <h4>{{ fullAddress }}</h4>
    <h4>
      <b>{{ Email }}</b>
    </h4>
    <h4>{{ StartTime }} - {{ EndTime }}</h4>
    <div class="actions">
      <base-button link :to="detailsLink">Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    "ID",
    "Name",
    "Address",
    "City",
    "Country",
    "Email",
    "StartTime",
    "EndTime",
  ],
  computed: {
    /**
     * Returns a string representing the full address of the company.
     *
     * @return {string} The full address of the company, formatted as "Address, City, Country".
     */
    fullAddress() {
      return `${this.Address}, ${this.City}, ${this.Country}`;
    },
    /**
     * Returns the details link for the company based on the current route path and the company ID.
     *
     * @return {string} The details link for the company.
     */
    detailsLink() {
      return `${this.$route.path}/${this.ID}`;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
