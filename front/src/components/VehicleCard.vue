<template>
  <div v-on:click="singlePage()" >
    <b-card
        title="vehicle.manufacturer"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
    >
      <b-card-text>
        Model: {{ vehicle.model }},
        Year: {{ vehicle.year }},
        Price: {{ vehicle.pricePerDay }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>

import {mapActions} from 'vuex'
export default {
  name: 'Vehicle',
  props: ['vehicle'],
  methods: {
    ...mapActions(['setVehicle']),
    singlePage(){
      this.setVehicle(this.vehicle);
      if(localStorage.vehicle!=null){
        console.log(localStorage.vehicle);
        this.$router.push('/vehicle');
      }
    }
  }
}

</script>
<style scoped>
.home {
  font-family: 'old-english-text-mt-regular', sans-serif;
}
</style>



