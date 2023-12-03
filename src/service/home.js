import request from "./request";

export function getCarInfo(params) {
  return request.get("/cars/list", { params });
}

export function getCarSeriesPage(params) {
  return request.get("/cars_series", { params });
}

export function getCarInfoDetail(params) {
  return request.get("/cars_info_detail", { params });
}
