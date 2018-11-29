import http from "../util/http"

export function getList(uid) {
  return http({
    method: "get",
    url: "/project/mumbers/" + uid
  })
}

export function add(project) {
  return http({
    method: "post",
    url: "/project",
    data: project
  })
}

export function deleteItem(projectid) {
  return http({
    method: "delete",
    url: '/project?id=' + projectid,
  })
}

export function changeMember(data) {
  return http({
    method: "post",
    url: '/project/numbers',
    data
  })
}

export function getFriends(uid, projectid) {
  return http({
    method: "get",
    url: "/project/" + projectid + "?userid=" + uid
  })
}
