<template>
  <div>
    <b-pagination
        v-model="currentPage"
        :total-rows="cars.length"
        :per-page="perPage"
        aria-controls="cars-table"
    ></b-pagination>
    <b-table
        id="cars-table"
        bordered
        head-variant="dark"
        hover
        fixed
        :items="cars.data"
        :fields="fields"
        small
        :per-page="perPage"
        :current-page="currentPage"
        @row-clicked="rowClicked"
    >
    </b-table>
    <b-pagination
        v-model="currentPage"
        :total-rows="cars.length"
        :per-page="perPage"
        aria-controls="cars-table"
    ></b-pagination>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';

export default {
  name: 'CarList',

  data() {
    return {
      fields: ['manufacturer', 'model', 'year', 'rating',],
      currentPage: 1,
      perPage: 20
    }
  },

  mounted() {
    this.fetchCars();
  },

  computed: {
    ...mapState([
      'cars'
    ])
  },

  methods: {
    ...mapActions([
      'fetchCars'
    ]),
    rowClicked(record, index) {
      this.$router.push({ name: 'Car', params: { id: record.id } });
    }
  }
}

</script>

<style scoped>
.pagination {
  justify-content: center;
}
</style>