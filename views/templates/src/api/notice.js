import http from '../util/http'

export function count(uid) {
  return http({
    method: "get",
    url: "/notice/count/" + uid
  })
}

export function getList(uid) {
  return http({
    method: "get",
    url: "/notice/" + uid
  })
}
