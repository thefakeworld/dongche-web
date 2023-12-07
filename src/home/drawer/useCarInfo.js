import { useEffect, useState  } from "react"
import { getCarImages, getCarInfoDetail } from "../../service/home"



export const useCarImages = (data) => {
    const [state, setState] = useState([])
    
    useEffect(()=> {
        (async () => {
            if(!data) return;
            const result = await getCarImages({car_id: data.car_id, series_id: data.series_id});
            setState(result)
            console.log('car data', result);
        })();
        
    }, [data])

    return state
}

export const useCarInfo = (data) => {
    const [state, setState] = useState({ })
    
    useEffect(()=> {
        (async () => {
            if(!data) return;
            const result = await getCarInfoDetail({car_id: data.car_id});
            setState(result)
            console.log('car data', result);
        })();
        
    }, [data])


    return state
}

export const priceCalc = () => {
    // data = request.json
    let { channel_fee=1500, license_fee=3600, domestic_shipping=1200, tax_advance_rate=0.1,  
        exchange_rate, estimated_profit, official_price, dealer_price
    } = data

    official_price = parseFloat(official_price * 10000);
    dealer_price = parseFloat(dealer_price * 10000);

    // # 优惠价
    const discount = official_price - dealer_price

    // # 车价优惠 
    const invoice_price = official_price - discount

    // # 增值税
    const vat = (invoice_price / 1.13) * 0.13

    // # 垫资成本
    const financing_cost = invoice_price * 0.7 * 30 * 0.0004

    purchase_tax = 0
    if(data.fuel_form) {

    }
        
        // #  动力类型
        // cursor.execute("SELECT value FROM car_info_detail WHERE car_id=%s AND `key`='fuel_form'", (car_info_record['car_id'],))
        // fuel_form_record = cursor.fetchone()
        // purchase_tax = 0
        // if fuel_form_record and fuel_form_record['value'] not in ('纯电动', '增程式', '插电式混合动力'):
        //     # Purchase tax formula, based on dealer_price
        //     purchase_tax = dealer_price / 11.3

        // #  增值税
        // purchase_tax_tax = purchase_tax * 0.13

        // # RMB 价格
        // rmb_cost = (invoice_price + purchase_tax + purchase_tax_tax +
        //             (tax_advance_rate * invoice_price) + financing_cost +
        //             channel_fee + license_fee + domestic_shipping - vat)
        
        // # EXW 价格
        // exw_cost = rmb_cost / exchange_rate
        
        // # 最终 price
        // final_price = exw_cost + estimated_profit
}

export function calculateCarPrice(data) {
    // 在JS中，可能是通过请求体，表单数据或对象获取数据，例如:

    let channel_fee = parseFloat(data.channel_fee || 1500.0);
    let license_fee = parseFloat(data.license_fee || 3600.0);
    let domestic_shipping = parseFloat(data.domestic_shipping || 1200.0); // 国内运费
    let tax_advance_rate = parseFloat(data.tax_advance_rate || 0.1);
    let exchange_rate = parseFloat(data.exchange_rate); // 这里应该确保前端传入了exchange_rate的值
    let estimated_profit = parseFloat(data.estimated_profit); // 这里应该确保前端传入了estimated_profit的值

    // 假设从前端或某种方式获得以下信息 (因为省去了数据库查询)
    let official_price = parseFloat(data.official_price); // 假定这里已经是数字，不需要去掉'万'
    let dealer_price = parseFloat(data.dealer_price); // 假定这里已经是数字，不需要去掉'万'

    // 优惠价
    let discount = official_price - dealer_price;

    // 车价优惠
    let invoice_price = official_price - discount;

    // 增值税
    let vat = (invoice_price / 1.13) * 0.13;

    // 垫资成本
    let financing_cost = invoice_price * 0.7 * 30 * 0.0004;

    // 假设前端传入动力类型
    let fuel_form = data.fuel_form; // '纯电动', '增程式', '插电式混合动力', 或其他
    let purchase_tax = 0;
    if (fuel_form !== '纯电动' && fuel_form !== '增程式' && fuel_form !== '插电式混合动力') {
        // Purchase tax formula, based on dealer_price
        purchase_tax = dealer_price / 11.3;
    }

    // 增值税
    let purchase_tax_tax = purchase_tax * 0.13;

    // RMB 价格
    let rmb_cost = invoice_price + purchase_tax + purchase_tax_tax +
                   (tax_advance_rate * invoice_price) + financing_cost +
                   channel_fee + license_fee + domestic_shipping - vat;

    // EXW 价格
    let exw_cost = rmb_cost / exchange_rate;

    // 最终 price
    let final_price = exw_cost + estimated_profit;

    console.log({
        tax_advance_rate,
        exchange_rate,
        estimated_profit,
        dealer_price,
        official_price,
        discount,
        invoice_price,
        vat,
        financing_cost,
        purchase_tax,
        purchase_tax_tax,
        rmb_cost,
        exw_cost,
        final_price
    });

    // 这里没有jsonify方法，通常可以返回一个对象，或者进行直接渲染
    return final_price.toFixed(2);
}

// 假设在某个地方执行这个函数并且传入数据对象
const dataFromClient = {
    // ... 从客户端接收的数据
};

const priceResult = calculateCarPrice(dataFromClient);
console.log(priceResult); // 输出最终的价格对象