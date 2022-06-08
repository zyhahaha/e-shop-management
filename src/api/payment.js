import request from '@/plugins/request';

/**
 * 获取价格配置
 */
export function GetFeeConfigServer (data) {
    return request({
        url: '/admin/recharge-order/fee-config',
        method: 'get',
        params: data
    });
}

/**
 * 店铺开通（免费）
 * @param {string} id 店铺id
 * @param {string} duration 开通时长
 * @param {string} type 操作类型：1 开通，2 续费
 */
export function OpenStoreServer (data) {
    return request({
        url: 'admin/store/open',
        method: 'post',
        data
    });
}

/**
 * 生成充值订单
 * @param {string} store_id 店铺id
 * @param {string} duration 开通时长
 * @param {string} type 操作类型：1 开通，2 续费
 * @param {string} pay_type 支付类型：1支付宝，2微信
 * @returns
 */
export function CreateOrderServer (data) {
    return request({
        url: '/admin/recharge-order/create-order',
        method: 'post',
        data
    });
}

// 发起支付
export function PayPurchaseServer (data) {
    return request({
        url: '/admin/pay/purchase',
        method: 'get',
        params: data
    });
}
