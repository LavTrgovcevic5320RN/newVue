<template>
  <div class="info-sold" >
    <h5 v-if="manufacturer"><b>Manufacturer:</b> {{manufacturer}}</h5>
    <h5 v-if="model"><b>Model:</b> {{model}}</h5>
    <h5 v-if="year"><b>Year:</b> {{year}}</h5>
    <h5 v-if="pricePerDay"><b>Price per day:</b> {{pricePerDay}}</h5>
    <h5 v-if="rating"><b>Rating:</b> {{rating}}</h5>
    <h5 v-if="detailsId"><b>Details ID:</b> {{detailsId}}</h5>
    <div @click="rowClicked" class="squad">
      <span class="border border-right-0 border-left-0 border-dark"><h5 class="dark" v-if="detailsId"><b>Car's details id:</b> {{detailsId}}</h5></span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CarInfo',

  props: {
    manufacturer: String,
    model: String,
    year: String,
    pricePerDay: String,
    rating: String,
    detailsId: String
  },

  data() {
    return {
      hover: false,
    };
  },

  methods: {
    rowClicked() {
      this.$router.push({ name: 'Car', params: { id: this.detailsId } });
    }
  }

}

</script>

<style scoped>
.info-sold {
  padding-top: 5px;
  margin-bottom: 25px;
  font-family: 'old-english-text-mt-regular', sans-serif;
  font-style: normal;
}

.squad {
  cursor: pointer;
}
</style>