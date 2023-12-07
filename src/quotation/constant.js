
export const carItems = [
  {
    key: 'brand_name',
    label: '品牌',
  },
  {
    key: 'series_name',
    label: '车型',
  },
  {
    key: 'official_price',
    label: '指导价',
  },
  {
    key: 'car_year',
    label: '年份',
  },
  {
    key: 'car_name',
    label: '款式',
  },
];


export const carBaseitems = [
  {
    key: 'fuel_form',
    label: '能源类型',
  },
  {
    key: 'engine_description',
    label: '发动机',
  },
  {
    key: 'energy_elect_max_power',
    label: '最大功率(kW)',
  },
  {
    key: 'fuel_comprehensive',
    label: '综合油耗',
  },
  {
    key: 'engine_model',
    label: '发动机型号',
  },
  {
    key: 'battery_type',
    label: '电池类型',
  },
  {
    key: 'battery_capacity',
    label: '电池容量(kWh)',
  },
  {
    key: 'constant_speed_mileage',
    label: '续航',
  },
  {
    key: 'length_width_height',
    label: '长x宽x高(mm)',
  },
  {
    key: 'curb_weight',
    label: '重量(KG)',
  },
  {
    key: 'front_tire_size',
    label: '前轮尺寸',
  },
  {
    key: 'rear_tire_size',
    label: '后轮尺寸',
  },
];

export const carAdvanceItems = [
  {
    key: 'lane_keeping_assist',
    label: '车道保持辅助系统',
  },
  {
    key: 'lane_center',
    label: '车道居中保持',
  },
  {
    key: 'parking_radar',
    label: '驻车雷达',
  },
  {
    key: 'driving_assistant_camera',
    label: '驾驶辅助影像',
  },
  {
    key: 'automatic_drive_level',
    label: '辅助驾驶级别',
  },
  {
    key: 'skylight_type',
    label: '天窗类型',
  },
  {
    key: 'steer_wheel_material', // TODO sub_key有多种
    label: '方向盘材质',
    subKeys: [
      {
        "text": "塑料",
        "key": "steer_wheel_material_1"
      },
      {
          "text": "皮质",
          "key": "steer_wheel_material_2"
      },
      {
          "text": "真皮",
          "key": "steer_wheel_material_3"
      }
    ]
  },
  {
    key: 'electric_back_door',
    label: '电动后尾门',
  },
  {
    key: 'header_display_system',
    label: '抬头显示系统(HUD)',
  },
  {
    key: 'seat_material',
    label: '座椅材质',
  },
  {
    key: 'mobile_wireless_charging',
    label: '手机无线充电',
  },
  {
    key: 'exter_mirror_functional',
    label: '外后视镜功能',
    subKeys: [
      {
        "text": "电动调节",
        "key": "exter_mirror_elec_adjustment"
      },
      {
          "text": "加热",
          "key": "external_mirror_heat"
      },
      {
          "text": "电动折叠",
          "key": "outside_mirror_electric_folding"
      },
      {
          "text": "记忆",
          "key": "outside_mirror_memory"
      },
      {
          "text": "倒车自动下翻",
          "key": "external_mirror_auto_flip"
      },
      {
          "text": "锁车自动折叠",
          "key": "external_mirror_auto_fold"
      }
    ],
  },
  {
    key: 'backside_privacy_glass',
    label: '后排隐私玻璃',
  },
  {
    key: '',
    label: '选装包',
  },
];