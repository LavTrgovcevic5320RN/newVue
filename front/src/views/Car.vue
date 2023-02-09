<template>
  <div>
    <Header :subtitle="car.manufacturer" />

    <div class="row">
      <div class="column">
        <CarInfo :manufacturer="car.manufacturer" :model="car.model" :year="car.year"  :rating="car.rating" :detailsId="car.detailsId" />
      </div>
    </div>

  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import CarInfo from '@/components/CarInfo.vue'
import {mapActions, mapState} from "vuex";

export default {
  name: 'Car',

  components: {
    Header,
    CarInfo,
  },

  computed: {
    ...mapState([
      'car'
    ])
  },

  data() {
    return {
      subtitle: '',
      fields: ['detailsId', 'manufacturer', 'model', 'year', 'rating'],
      squadID: 0,
      tag: '',
      role: '',
      status: '',
      rangedWeapon: '',
      meleeWeapon: '',
      armourType: '',
      squadName: ''
    }
  },



  methods: {
    ...mapActions([
      'fetchCarByID'
    ])
  },

  mounted() {
    this.fetchCarByID(this.$route.params.id);
  }

}

</script>

<style scoped>
.row {
  width: 2543px;
}

.column {
  text-align: left;
  float: left;
  width: 50%;
  padding: 100px;
}

/* Clear floats after image containers */
.row::after {
  content: "";
  clear: both;
  display: table;
}
</style>