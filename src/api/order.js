import request from '@/plugins/request';

export function OrderListServer (data) {
    return request({
        url: '/order/list',
        method: 'post',
        data
    });
}
