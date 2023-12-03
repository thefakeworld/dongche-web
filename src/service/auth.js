import request from "./request";

export function login(params) {
  return request.post("/users/login", params);
}

export function userRegist(params) {
  return request.post("users/register", params);
}

export function userUpdate(params) {
  return request.post("/users/update", params);
}
