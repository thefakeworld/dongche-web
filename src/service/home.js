import request from "./request";

export function getCarsData(params) {
  return request.get("/cars/data", { params });
}
export function getCarInfo(params) {
  return request.get("/cars/list", { params });
}

export function getCarSeriesPage(params) {
  return request.get("/cars_series", { params });
}

export function getCarInfoDetail(params) {
  return request.get("/cars/info/detail", { params });
}

export function getCarImages(params) {
  return request.get("/cars/img/dongche", { params });
}

export function getCarBrands(params) {
  return request.get("/cars/brands", { params });
}
