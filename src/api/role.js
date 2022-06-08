import request from '@/plugins/request';

/**
 * 角色列表
 */
export function RoleListServer (data) {
    return request({
        url: '/admin/role/list',
        method: 'post',
        data
    });
}

/**
 * 角色添加
 */
export function RoleAddServer (data) {
    return request({
        url: '/admin/role/create',
        method: 'post',
        data
    });
}

/**
 * 角色编辑
 */
export function RoleEditServer (data) {
    return request({
        url: '/admin/role/update',
        method: 'post',
        data
    });
}

/**
 * 角色启用/禁用
 */
export function RoleUpdateStatusServer (data) {
    return request({
        url: '/admin/role/update-status',
        method: 'post',
        data
    });
}

/**
 * 角色删除
 */
export function RoleDeleteServer (data) {
    return request({
        url: '/admin/role/delete-role',
        method: 'post',
        data
    });
}

/**
 * 角色详情
 */
export function RoleInfoServer (data) {
    return request({
        url: '/admin/role/info',
        method: 'post',
        data
    });
}

/**
 * 更新角色菜单权限
 */
export function RoleUpdatePermission (data) {
    return request({
        url: '/admin/role/update-permission',
        method: 'post',
        data
    });
}

/** **************************************************** 商家角色 **********************************************************/

/**
 * 商家角色列表
 */
 export function MerchantRoleListServer (data) {
    return request({
        url: '/admin/merchant_role/list',
        method: 'post',
        data
    });
}

/**
 * 商家角色添加
 */
export function MerchantRoleAddServer (data) {
    return request({
        url: '/admin/merchant_role/create',
        method: 'post',
        data
    });
}

/**
 * 商家角色编辑
 */
export function MerchantRoleEditServer (data) {
    return request({
        url: '/admin/merchant_role/update',
        method: 'post',
        data
    });
}

/**
 * 商家角色启用/禁用
 */
export function MerchantRoleUpdateStatusServer (data) {
    return request({
        url: '/admin/merchant_role/status',
        method: 'post',
        data
    });
}

/**
 * 商家角色删除
 */
export function MerchantRoleDeleteServer (data) {
    return request({
        url: '/admin/merchant_role/delete',
        method: 'post',
        data
    });
}

/**
 * 商家角色详情
 */
export function MerchantRoleInfoServer (data) {
    return request({
        url: '/admin/merchant_role/info',
        method: 'post',
        data
    });
}

/**
 * 更新商家角色菜单权限
 */
export function MerchantRoleUpdatePermission (data) {
    return request({
        url: '/admin/merchant_role/permission',
        method: 'post',
        data
    });
}
