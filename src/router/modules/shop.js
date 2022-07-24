import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'shop-';

export default {
    path: '/shop',
    name: '平台管理',
    redirect: {
        name: `${pre}product-list`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'product-list',
            name: `${pre}product-list`,
            meta: {
                ...meta,
                title: '商品管理'
            },
            component: () => import('@/pages/shop/product/index')
        },
        {
            path: 'order-list',
            name: `${pre}order-list`,
            meta: {
                ...meta,
                title: '订单管理'
            },
            component: () => import('@/pages/shop/order/index')
        }, {
            path: 'ispa-list',
            name: `${pre}ispa-list`,
            meta: {
                ...meta,
                title: '数据抓取'
            },
            component: () => import('@/pages/shop/ispa/index')
        }, {
            path: 'djh-list',
            name: `${pre}djh-list`,
            meta: {
                ...meta,
                title: '数据抓取DJH'
            },
            component: () => import('@/pages/shop/djh/index')
        }
    ]
};
