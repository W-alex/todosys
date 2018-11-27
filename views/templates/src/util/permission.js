import router from "../router"
import store from "../store"
router.beforeEach((to, from, next) => {
  // to and from are both route objects
  if (store.state.id === null) {
    if (to.path === "/login" || to.path === "/test") {
      next()
    }
    next("/login")
  }
  next()
  // if (to.path !== "/login" && store.state.id === null) {
  //   next("/login")
  // }
  // next();
})
