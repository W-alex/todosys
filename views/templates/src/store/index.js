import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: null,
    id: null,
    userid: null
  },
  getters: {
    getId: states => states.id
  },
  mutations: {
    setUser: function (state, username, userid) {
      state.username = username
      state.userid = userid
    },
    setId: function (state, id) {
      state.id = id
    }
  },
  actions: {
    saveUser: function (context, user) {
      context.commit("setId", user.id);
      context.commit("setUser", user.username, user.userid)
    }
  }
})

export default store
