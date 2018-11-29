import http from "../util/http"

export function login(user) {
  return http({
    method: "post",
    url: "/login",
    data: user
  })
}

export function add(user) {
  return http({
    method: "post",
    url: "/register",
    data: user
  })
}

export function getOthers(uid) {
  return http({
    url: "/user/other?id=" + uid,
    method: "get"
  })
}
