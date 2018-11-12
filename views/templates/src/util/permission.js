import router from "../router"
import store from "../store"
router.beforeEach((to, from, next) => {
  // to and from are both route objects
  if (to.path !== "/login" && store.state.id === null) {
    next("/login")
  }
  next();
})
