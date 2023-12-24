import request from "./request";

export function login(params) {
  return request.post("/users/login", params);
}

export function userRegist(params) {
  return request.post("/users/register", params);
}

export function userUpdate(params) {
  return request.post("/users/update", params);
}

export function createSecrets(params) {
  console.log('createSecrets');
  return request.post("/secrets", params);
}

export function getSecrets(params) {
  return request.get("/secrets", { params });
}

export function getSecret(params) {
  return request.get("/secret", {
    params, headers: {
      "x-secret-key": params.secret_key
    }
  });
}
