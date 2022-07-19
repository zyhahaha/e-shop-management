import request from '@/plugins/request';

/**
 * 数据列表
 */
export function IspaListServer (data) {
    return request({
        url: '/spider/ispa/list',
        method: 'post',
        data
    });
}
