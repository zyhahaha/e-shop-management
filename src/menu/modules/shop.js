const pre = '/shop/';

export default {
    path: '/shop',
    title: '平台管理',
    header: 'home',
    icon: 'md-speedometer',
    children: [
        {
            path: `${pre}product-list`,
            title: '商品列表'
        }, {
            path: `${pre}order-list`,
            title: '订单列表'
        }
    ]
}
