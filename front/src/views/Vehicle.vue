<template>
  <div class="main">
    <div class="pek">
      <h1 class="title">{{vehicle.id}}</h1>
      <h3 class="title">by</h3>
      <h2 class="title">{{vehicle.model}}</h2>
      <hr class="line">
    </div>

    <div class="likes">
      <div class="reviewForm">
        <div class="row">
          <div class="col-25">
            <label for="subject">Review: </label>
          </div>
          <div class="col-75">
            <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>
          </div>
          <div class="row">
            <input type="submit" value="Submit" v-on:click="onSubmit()">
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'Vehicle',
  computed: {
    ...mapState(['vehicle', 'reservations', 'token'])
  },
  methods: {
    onSubmit() {
      this.$route.emmit('reservation', { carId: this.vehicle.id, motorcycleId: null, scooterId: null, bicycleId: null, token: this.token });
    }
  }

}

</script>

<style>

.buttonContainer {
  padding: 15px 15px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
}

.reviews {
  padding: 15px 30px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.likes {
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.title {
  color: rgb(255,7,110);
  font-weight: 300;
  font-style: oblique;
  font: bold;
}

.line {
  width:100%;
  text-align:left;
  padding: 0px 10px;
  margin-left:0;
  color: rgb(200,7,110)
}

.main {
  overflow: hidden;
}

.description {
  font-weight: 300;
  padding: 15px;
  margin: 15px;
  font-size: 22px;
  text-align: left;
}

.pek {
  display: grid;
  overflow-x: hidden;
  overflow-y: hidden;
}

.image {
  padding: 10px 10px;
  width: 100%;
  height: 600px;
}

.information {
  display: grid;
  border-style: dotted;
  justify-content: space-evenly;
  text-align: center;
  font-weight: 200;
}

button {
  background-color: rgb(200,7,110); /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 140px;
}

input[type=text], select, textarea, input[type = "t"]{
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

/* Style the label to display next to the inputs */
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
  color: rgb(200,7,110);
  font-size: 30px;
}

/* Style the submit button */
input[type=submit] {
  background-color: rgb(255,7,110);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  float: right;
}

/* Style the container */
.reviewForm {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

/* Floating column for labels: 25% width */
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

/* Floating column for inputs: 75% width */
.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
