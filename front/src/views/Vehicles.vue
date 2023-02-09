<template>
  <main id="Vehicle">
    <section v-if="this.vehicles.length" >
      <VehicleCard style="padding: 15px 15px"
                   v-for="vehicle in vehicles"
                   :key="vehicle.id"
                   :vehicle="vehicle"/>
    </section>
    <section v-if="this.reservations.length" >
      <ReservationCard style="padding: 15px 15px"
                       v-for="reservation in reservations"
                       :key="reservation.id"
                       :reservation="reservation"/>
    </section>
  </main>
</template>


<script>
import VehicleCard from '../components/VehicleCard.vue';
import ReservationCard from '../components/ReservationCard.vue';
import {mapState, mapActions} from 'vuex'
export default{
  name: 'Vehicles',
  computed: {
    ...mapState(['vehicles', 'reservations'])
  },
  components: {
    VehicleCard,
    ReservationCard
  },
  methods: {
    ...mapActions(['getVehicles', 'getReservations'])
  },
  mounted() {
    this.getVehicles();
    this.getReservations();
  }
}
</script>

