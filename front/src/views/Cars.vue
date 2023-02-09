<template>
  <div id="app" v-if="token">
    <Header subtitle="Cars"/>
        <CarList />
  </div>
  <p v-else>You must be signed in </p>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import CarList from '@/components/CarList.vue'
import { mapActions, mapState } from 'vuex';


export default {
  name: 'Cars.vue',
  components: {
    Header,
    CarList
  },

  data() {
    return {
      subtitle: '',
    }
  },

  computed: {
    ...mapState([
      'token'
    ])
  },

}
</script>

<style scoped>
.row {
  width: 2543px;
}

.column {
  float: left;
  width: 50%;
  padding: 5px;
}

/* Clear floats after image containers */
.row::after {
  content: "";
  clear: both;
  display: table;
}
</style>