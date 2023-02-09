<template>
  <div class="naslov">
    <h1> Rental Service</h1>
    <h3 v-if="subtitle"><b> {{ subtitle }} </b></h3>
  </div>
</template>

<script>

export default {
  name: 'Header',
  props: {
    subtitle: String
  }

}

</script>

<style scoped>
.naslov {
  padding-top: 5px;
  margin-bottom: 25px;
  font-family: 'old-english-text-mt-regular', sans-serif;
  font-style: normal;
}
</style>