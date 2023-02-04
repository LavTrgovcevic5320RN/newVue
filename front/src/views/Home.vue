<template>
  <div class="home">
    <Header subtitle="Overview"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>

<style scoped>
.home {
  font-family: 'old-english-text-mt-regular', sans-serif;
}
</style>
