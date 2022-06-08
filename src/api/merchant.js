import request from '@/plugins/request';

/**
 * 商户列表
 */
export function MerchantListServer (data) {
    return request({
        // url: '/api/merchant/list',
        url: '/admin/merchant/list',
        method: 'post',
        data
    });
}

/**
 * 商户列表导出
 */
export function MerchantListExportServer (data) {
    return request({
        // url: '/api/merchant/list',
        url: '/admin/merchant/export',
        method: 'post',
        data
    });
}

/**
 * 更新合同
 */
export function MerchantContractUpdateServer (data) {
    return request({
        // url: '/api/merchant/contract/update',
        url: '/admin/merchant/contract',
        method: 'post',
        data
    });
}

/**
 * 商户门店列表
 * @param {Object} merchant_id 商户ID
 */
export function MerchantStoreListServer (data) {
    return request({
        // url: '/api/merchant/store/list',
        url: '/admin/store/list',
        method: 'post',
        data
    });
}

/**
 * 门店上架/下架
 */
export function StoreUpdateStatusServer (data) {
    return request({
        // url: '/api/merchant/store/update/status',
        url: '/admin/store/update-status',
        method: 'post',
        data
    });
}

/**
 * 商家设置列表
 * @param {number} id 商户ID
 */
export function MerchantSetListServer (data) {
    return request({
        url: '/admin/merchant/set-list',
        method: 'post',
        data
    });
}

/**
 * 参数设置
 */
 export function MerchantSetConfigServer (data) {
    return request({
        url: '/admin/merchant/set-config',
        method: 'post',
        data
    });
}

/**
 * 请求授权地址（天猫、拼多多、京东商家，直接跳转至授权url链接页面）
 * @param store 店铺ID
 */
export function StoreAuthUrlServer (params) {
    return request({
        // url: '/api/merchant/store/update/status',
        url: '/admin/authorize/url',
        method: 'get',
        params
    });
}

/**
 * 美团授权操作（美团、饿了么商家，点击后，判断token是否已获得）
 * @param store 店铺ID
 */
// export function StoreCheckoutTokenServer (params) {
//     return request({
//         // url: '/api/merchant/store/update/status',
//         url: '/v1/merchant/authorize/quick_auth',
//         method: 'get',
//         params
//     });
// }
