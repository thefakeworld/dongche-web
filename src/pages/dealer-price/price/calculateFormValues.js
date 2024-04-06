// calculateFormValues.js

export function calculatePriceUsingFormValues(formValues) {
    // 从表单获取的参数，如果没有提供则使用默认值
    const dealer_price = Number(formValues.dealer_price);
    const car_discount = Number(formValues.car_discount) || 0;
    const channel_fee = Number(formValues.channel_fee) || 1500;
    const license_fee = Number(formValues.license_fee) || 3600;
    const domestic_shipping = Number(formValues.domestic_shipping) || 1200;
    const tax_advance_rate = Number(formValues.tax_advance_rate) || 0.1;
    const exchange_rate = Number(formValues.exchange_rate);
    const estimated_profit = Number(formValues.estimated_profit) || 0;
    const costFOB = Number(formValues.costFOB) || 500;
    const costCIF = Number(formValues.costCIF) || 0;
    const official_price = Number(formValues.official_price);
    const fuel_form = formValues.fuel_form;
  
    // 开票价
    const invoice_price = official_price - car_discount;
  
    // 增值税
    const vat = (invoice_price / 1.13) * 0.13;
  
    // 垫资成本
    const financing_cost = invoice_price * 0.7 * 30 * 0.0004;
  
    // 购置税
    let purchase_tax = 0;
    if (fuel_form && !['纯电动', '增程式', '插电式混合动力'].includes(fuel_form)) {
      purchase_tax = invoice_price / 11.3;  // 根据开票价来计算购置税
    }
  
    // 购置税税金
    const purchase_tax_tax = purchase_tax * 0.13;
  
    // 退税（假设等于增值税）
    const tax_refund = vat + purchase_tax_tax;
  
    // 垫税成本
    const tax_advance_cost = vat * tax_advance_rate;
  
    // 人民币成本
    const rmb_cost = invoice_price + purchase_tax + purchase_tax_tax + tax_advance_cost +
                     financing_cost + channel_fee + license_fee + domestic_shipping - tax_refund;
  
    // EXW 成本
    const exw_cost = rmb_cost / exchange_rate;
  
    // 最终报价
    const final_price = exw_cost + estimated_profit;
    const priceFOB = final_price + costFOB;
    const priceCIF = final_price + costCIF + costFOB;
  
    // 返回计算结果
    return {
      invoice_price: invoice_price.toFixed(2),
      exw_cost: exw_cost.toFixed(2),
      price: final_price.toFixed(2),
      priceFOB: priceFOB.toFixed(2),
      priceCIF: priceCIF.toFixed(2),
      tax_refund: tax_refund.toFixed(2),
      // 提供完整的计算细节供调试和审查
      calculation_details: {
        invoice_price: invoice_price.toFixed(2),
        purchase_tax: purchase_tax.toFixed(2),
        purchase_tax_tax: purchase_tax_tax.toFixed(2),
        tax_advance_cost: tax_advance_cost.toFixed(2),
        financing_cost: financing_cost.toFixed(2),
        channel_fee: channel_fee.toFixed(2),
        license_fee: license_fee.toFixed(2),
        domestic_shipping: domestic_shipping.toFixed(2),
        tax_refund: tax_refund.toFixed(2),
        exw_cost: exw_cost.toFixed(2),
        final_price: final_price.toFixed(2),
        priceFOB: priceFOB.toFixed(2),
        priceCIF: priceCIF.toFixed(2),
        operation: `计算过程的描述和公式，供审查使用`,
      }
    };
  }