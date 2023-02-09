<template>
  <div >
    <b-card
        title = "Reservation"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
    >
      <b-card-text>
        Car: {{ reservation.carId }},
        User: {{ reservation.userId }},
        Start date: {{ reservation.startDate }},
        End date: {{ reservation.endDate }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'Reservation',
  props: ['reservation']
}

</script>
<style scoped>
.home {
  font-family: 'old-english-text-mt-regular', sans-serif;
}
</style>



