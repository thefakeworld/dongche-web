import request from "./request";

export function getAllCarBrand(params) {
  return request.post("/motor/pc", {
    url: 'https://www.dongchedi.com/motor/pc/car/brand/all_brand',
    params: {
      a: 1
    }
  });
}

export function getTransformSeriesList(res) {
  if(!res) return [];
  const { online_list } = res.data
  const [{ series_list }] = online_list
  const list = series_list?.filter(item => item.info.business_status == 0)
  return list.map(item => item.info)
}

export function getBrandSeriesList(params) {
  return request.post("/motor/pc", {
    url: 'https://m-sinfonlinea.dcdapp.com/motor/brand/m/v5/brand_series_list/?aid=1556&device_id=7321972234674210342&master_aid=&user_unique_id=7321972234674210342&os_version=Windows%2011%20x64&ma_version=5.10.335&app_name=wechat&data_from=tt_mp&device_platform=windows&device_type=microsoft&device_brand=microsoft&sdk_verison=3.2.5&api_version=2&version_code=0&city_name=%E6%9D%AD%E5%B7%9E&gps_city_name=&brand_id=' + params.brand_id,
  });
}


export function getSeriesCarList(params) {
  return request.post("/motor/pc", {
    url: 'https://m-sinfonlinea.dcdapp.com/motor/car_page/m/v1/series_config_json/?aid=1556&device_id=7321972234674210342&master_aid=&user_unique_id=7321972234674210342&os_version=Windows%2011%20x64&ma_version=5.10.335&app_name=wechat&data_from=tt_mp&device_platform=windows&device_type=microsoft&device_brand=microsoft&sdk_verison=3.2.5&api_version=2&version_code=0&city_name=%E6%9D%AD%E5%B7%9E&gps_city_name=&series_id=' + params.series_id,
  });
}
export function getTransformSeriesCarList(res) {
  if(!res) return [];
  const { car_info_list } = res.data
  return Object.keys(car_info_list).map(carId => {
    return {
      ...car_info_list[carId],
      id: carId,
    }
  })
}


export function getCarInfoList(params) {
  return request.post("/motor/pc", {
    url: 'https://m-sinfonlinea.dcdapp.com/motor/car_page/m/v6/get_entity_json?aid=1556&device_id=7321972234674210343&master_aid=&user_unique_id=7321972234674210343&os_version=Windows%2011%20x64&ma_version=5.10.335&app_name=wechat&data_from=tt_mp&device_platform=windows&device_type=microsoft&device_brand=microsoft&sdk_verison=3.2.5&api_version=2&version_code=0&city_name=%E6%9D%AD%E5%B7%9E&gps_city_name=&car_id_list=' + params.car_id,
  });
}
export function getTransformCarInfo(res, car_id) {
  if(!res) return [{}, {}];
  const { car_info } = res.data
  const carInfoItem = car_info.find(item => item.car_id === car_id)
  const { info, ...carData } = carInfoItem;
  const carExtraInfo = Object.keys(info).reduce((pre, cur) => {
    pre[cur] = info[cur].value
    return pre
  }, {})
  return [carData, carExtraInfo]
}

export function getWiseRate() {
  return request.get("/wise/rate");
}


