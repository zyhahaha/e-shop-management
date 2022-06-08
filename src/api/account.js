import request from '@/plugins/request';

export function AccountLogin (data) {
    return request({
        // url: '/api/login',
        url: '/user/login',
        method: 'post',
        data
    });
}

/**
 * 修改自己的密码
 * @param {string} new_password 密码
 * @param {string} re_password 确认密码
 */
export function AccountPasswordSelfEdit (data) {
    return request({
        url: '/admin/change-password',
        method: 'post',
        data
    });
}

/**
 * 修改别人的密码
 * @param {string} id id
 * @param {string} password 密码
 * @param {string} re_password 确认密码
 */
export function AccountPasswordEdit (data) {
    return request({
        url: '/admin/auth/change-password',
        method: 'post',
        data
    });
}

/**
 * 企业微信扫码注册
 * @param {string} code code
 * @param {string} state 自定义参数
 * @param {string} password 密码
 */
export function AccountRegister (data) {
    return request({
        url: '/weixin-register',
        method: 'post',
        data
    });
}

/**
 * 企业微信扫码登录
 * @param {string} code
 */
export function WxQrLogin (data) {
    return request({
        url: '/weixin-login',
        method: 'post',
        data
    })
}

/**
 * 邀请链接
 * @param {string} id 角色ID
 */
export function InviteLink (data) {
    return request({
        url: '/admin/role/invite-link',
        method: 'post',
        data
    })
}

/**
 * 根据登录账号获取菜单权限
 */
export function AccountPermissionList (data) {
    return request({
        url: '/admin/permission',
        method: 'post',
        data
    })
}
