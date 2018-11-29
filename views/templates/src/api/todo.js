import http from "../util/http"

export function getList(uid, projectid) {
  return http({
    url: '/todo/' + uid + '?project=' + projectid,
    method: 'get'
  })
}

export function add(todo) {
  return http({
    url: "/todo",
    data: todo,
    method: "post"
  })
}

export function priority(id) {
  return http({
    url: "/todo/priority",
    method: "post",
    data: {
      id: id
    }
  })
}

export function finish(id) {
  return http({
    url: "/todo/done",
    method: "post",
    data: {
      todo: id
    }
  })
}

export function deleteItem(id) {
  return http({
    url: "/todo?id=" + id,
    method: "delete"
  })
}

export function deleteCompelete(uid, projectid) {
  return http({
    url: "/todo/finish?id=" + uid + "&project=" + projectid,
    method: "delete"
  })
}
