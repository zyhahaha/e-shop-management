import request from '@/plugins/request';

/**
 * ISPA数据列表
 */
export function IspaListServer (data) {
    return request({
        url: '/spider/ispa/list',
        method: 'post',
        data
    });
}

/**
 * DJH数据列表
 */
 export function DjhListServer (data) {
    return request({
        url: '/spider/djh/list',
        method: 'post',
        data
    });
}

/**
 * DJH 添加cookie
 */
 export function DjhAddCookieServer (data) {
    return request({
        url: '/spider/djh/cookie',
        method: 'post',
        data
    });
}

/**
 * DJH 校验cookie
 */
 export function DjhVerifyCookieServer (data) {
    return request({
        url: '/spider/djh/cookie/verify',
        method: 'post',
        data
    });
}
