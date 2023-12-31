export function calculatePrice(data, car_info_record) {
  try {
    
    // 从前端获取的参数，如果没有提供则使用默认值
    const car_discount = Number(data.car_discount) || 0;
    const channel_fee = Number(data.channel_fee) || 1500.0;
    const license_fee = Number(data.license_fee) || 3600.0;
    const domestic_shipping = Number(data.domestic_shipping) || 1200.0;
    const tax_advance_rate = Number(data.tax_advance_rate) || 0.1;
    const exchange_rate = Number(data.exchange_rate);
    const estimated_profit = Number(data.estimated_profit);

    // 模拟数据库查询结果
    // const car_info_record = {
    //   official_price: '20万',
    //   dealer_price: '15万',
    //   car_id: 123,
    //   series_id: 456,
    // };

    const official_price = Number(car_info_record.official_price.replace('万', '')) * 10000;
    const dealer_price = Number(car_info_record.dealer_price.replace('万', '')) * 10000;

    // // 如果前端没有提供车价优惠，则计算得出
    // const carDiscount = car_discount || (official_price - dealer_price);

    // 开票价
    const invoice_price = (official_price - car_discount);

    // 增值税
    const vat = (invoice_price / 1.13) * 0.13;

    // 垫资成本
    const financing_cost = invoice_price * 0.7 * 30 * 0.0004;

    // 购置税
    let purchase_tax = 0;
    if (car_info_record.fuel_form && !['纯电动', '增程式', '插电式混合动力'].includes(car_info_record.fuel_form)) {
      purchase_tax = invoice_price / 11.3;  // 根据开票价来计算购置税
    }

    // 购置税税金
    const purchase_tax_tax = purchase_tax * 0.13;

    // 退税（假设等于增值税）
    const tax_refund = vat + purchase_tax;

    // 垫税成本
    const tax_advance_cost = vat * tax_advance_rate;

    // 人民币成本
    const rmb_cost = (invoice_price + purchase_tax + purchase_tax_tax + tax_advance_cost + financing_cost +
                      channel_fee + license_fee + domestic_shipping - tax_refund);

    // EXW 成本
    const exw_cost = rmb_cost / exchange_rate;

    // 最终报价
    const final_price = exw_cost + estimated_profit;

    // 计算过程
    const calculation_details = {
      invoice_price,
      purchase_tax,
      purchase_tax_tax,
      tax_advance_cost,
      financing_cost,
      channel_fee,
      license_fee,
      domestic_shipping,
      tax_refund,
      operation: `(${invoice_price} + ${purchase_tax} + ${purchase_tax_tax} + ${tax_advance_cost} + ${financing_cost} + ${channel_fee} + ${license_fee} + ${domestic_shipping} - ${tax_refund}) / ${exchange_rate} + ${estimated_profit}`,
    };

    return { car_id: car_info_record.car_id, series_id: car_info_record.series_id, 
      invoice_price: invoice_price.toFixed(2),
      exw_cost: exw_cost.toFixed(2),
      price:final_price.toFixed(2), 
      tax_refund:tax_refund.toFixed(2), 
      calculation_details };
  } catch (error) {
    console.error('Error calculating price:', error);
    throw error;
  }
}

// // 示例使用
// const dataFromFrontend = {
//   car_name: 'YourCar',
//   car_discount: 1000,
//   channel_fee: 2000,
//   license_fee: 3000,
//   domestic_shipping: 4000,
//   tax_advance_rate: 0.2,
//   exchange_rate: 6.5,
//   estimated_profit: 5000,
// };

// calculatePrice(dataFromFrontend)
