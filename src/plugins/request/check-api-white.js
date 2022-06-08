const apiWhiteList = [
    '/v1/store_service/config/fee',
    '/v1/store_service/order/build',
    '/v1/merchant/authorize/url',
    '/v1/merchant/authorize/quick_auth'
]

/**
 * 检查Api白名单，白名单内的接口不做授权校验也不用传Token
 * @param {string} configUrl 需要校验的url
 * @returns {boole} 是否为白名单接口
 */
export function checkoutWhiteList (configUrl) {
    let isAuth = true // 是否需要授权
    apiWhiteList.forEach(apiPath => {
        if (configUrl.indexOf(apiPath) !== -1) {
            isAuth = false
        }
    })
    return isAuth
}
