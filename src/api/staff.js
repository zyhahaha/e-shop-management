import request from '@/plugins/request';

/**
 * 人员列表
 */
export function StaffListServer (data) {
    return request({
        url: '/user/list',
        method: 'post',
        data
    });
}

/**
 * 人员详情
 */
export function StaffInfoServer (data) {
    return request({
        url: '/admin/info',
        method: 'post',
        data
    });
}

/**
 * 人员添加
 */
export function StaffAddServer (data) {
    return request({
        // url: '/api/staff/add',
        url: '/user/register',
        method: 'post',
        data
    });
}

/**
 * 人员编辑
 */
export function StaffEditServer (data) {
    return request({
        // url: '/api/staff/edit',
        url: '/admin/update',
        method: 'post',
        data
    });
}

/**
 * 人员启用/禁用
 */
export function StaffUpdateStatusServer (data) {
    return request({
        // url: '/api/staff/update/status',
        url: '/admin/update-status',
        method: 'post',
        data
    });
}

/**
 * 人员删除
 */
export function StaffDeleteServer (data) {
    return request({
        url: `/user/${data.id}`,
        method: 'delete'
        // data
    });
}

/**
 * 人员角色关联
 * @param {String} id 管理员id
 * @param {Array} role_ids 角色id集合
 */
export function StaffRoleRelationServer (data) {
    return request({
        // url: '/api/staff/relation',
        url: '/admin/distribute-role',
        method: 'post',
        data
    });
}
