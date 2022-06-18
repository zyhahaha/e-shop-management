import request from '@/plugins/request';

/**
 * 商品列表
 */
export function ProductListServer (data) {
    return request({
        url: '/product/list',
        method: 'post',
        data
    });
}

/**
 * 商品新增
 */
 export function ProductAddServer (data) {
    return request({
        url: '/product',
        method: 'post',
        data
    });
}

/**
 * 商品修改
 */
 export function ProductEditServer (data, id) {
    return request({
        url: `/product/${id}`,
        method: 'patch',
        data
    });
}

/**
 * 商品删除
 */
 export function ProductDeleteServer (data) {
    return request({
        url: `/product/${data.id}`,
        method: 'delete',
        data
    });
}
