import request from '@/plugins/request'

// 菜单列表
export function MenuIndex (params) {
    return request({
        url: '/admin/menu/list',
        method: 'post',
        params
    })
}

// 菜单更新
export function MenuUpdate (data) {
    return request({
        url: '/admin/menu/update',
        method: 'post',
        data
    })
}

// 创建菜单
export function MenuCreate (data) {
    return request({
        url: '/admin/menu/create',
        method: 'post',
        data
    })
}

// 菜单删除
export function MenuDelete (data) {
    return request({
        url: '/admin/menu/delete-menu',
        method: 'post',
        data
    })
}

// 菜单状态变更
export function MenuUpdateStatus (data) {
    return request({
        url: '/admin/menu/update-status',
        method: 'post',
        data
    })
}

/** **************************************************** 商家菜单 **********************************************************/
// 商家菜单列表
export function MerchantMenuIndex (params) {
    return request({
        url: '/admin/merchant_menu/list',
        method: 'post',
        params
    })
}

// 商家菜单更新
export function MerchantMenuUpdate (data) {
    return request({
        url: '/admin/merchant_menu/update',
        method: 'post',
        data
    })
}

// 商家菜单添加
export function MerchantMenuCreate (data) {
    return request({
        url: '/admin/merchant_menu/create',
        method: 'post',
        data
    })
}

// 商家菜单删除
export function MerchantMenuDelete (data) {
    return request({
        url: '/admin/merchant_menu/delete',
        method: 'post',
        data
    })
}

// 商家菜单状态变更
export function MerchantMenuUpdateStatus (data) {
    return request({
        url: '/admin/merchant_menu/status',
        method: 'post',
        data
    })
}
