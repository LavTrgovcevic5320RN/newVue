import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    reservations: [],
    vehicles: [],
    vehicle: null,
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },
    setVehicles(state, vehicles) {
      state.vehicles = vehicles;
    },
    setVehicle(state, vehicle) {
      state.vehicle = vehicle;
      localStorage.vehicle = vehicle;
    },
    setReservations(state, reservations) {
      state.reservations = reservations;
    },
    addReservation(state, reservation) {
      state.reservations.push(reservation);
    },

  },
  actions: {
    register({ commit }, obj) {
      fetch('http://localhost:9000/api_register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => {
            if (tkn.msg) {
              alert(tkn.msg);
            } else {
              commit('setToken', tkn.token)
            }
          });
    },

    login({ commit }, obj) {
      fetch('http://localhost:9000/api_login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => {
            if (tkn.msg) {
              alert(tkn.msg);
            } else {
              commit('setToken', tkn.token)
            }
          });
    },

    getVehicles({commit}){
      fetch('http://localhost:8080/api/cars', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(response => {
        if (!response.ok) {
          throw response
        }
        return response.json()
      }).then(vehicles=>{
        commit('setVehicles', vehicles);
      }).catch(err => {
        if (typeof err.text === 'function')
          err.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(err);
      })
    },

    // getReservations({commit}){
    //   fetch('http://localhost:8080/api/reservations', {
    //     method: 'GET',
    //     headers: { 'Authorization': `Bearer ${localStorage.token}`,
    //       'Content-Type': 'application/json'
    //     }
    //   }).then( obj => obj.json() )
    //       .then( res => commit('setReservations', res));
    // },

    getReservations({commit}){
      fetch('http://localhost:8080/api/reservations', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
              }
      }).then(response => {
        if (!response.ok) {
          throw response
        }
        return response.json()
      }).then(reservations=>{
          commit('setReservations', reservations);
      }).catch(err => {
        if (typeof err.text === 'function')
          err.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(err);
      })
    },

    setVehicle({commit},vehicle){
      commit('setVehicle', vehicle);
    },

    socket_reservation({ commit }, msg) {
      const comment = JSON.parse(msg);
      console.log(comment);
      commit('addReservation', comment);
    }

  },
  modules: {
  }
})
