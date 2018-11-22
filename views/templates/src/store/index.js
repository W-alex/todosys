import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: null,
    id: null,
    userid: null,
    projectId: null,
    projectName: null
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
    },
    setCurrentProject: function (state, project) {
      state.projectId = project.id
      state.projectName = project.name
    }
  },
  actions: {
    saveUser: function (context, user) {
      context.commit("setId", user.id);
      context.commit("setUser", user.username, user.userid)
    },
    changeProject: function (context, project) {
      if (project != undefined) {
        context.commit('setCurrentProject', project)
      }
    }
  }
})

export default store
