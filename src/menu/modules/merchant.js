const pre = '/merchant/';

export default {
    path: '/merchant',
    title: '平台管理',
    header: 'home',
    icon: 'md-speedometer',
    // auth: ['merchant-list'],
    children: [
        {
            path: `${pre}list`,
            title: '商品列表'
        }, {
            path: `${pre}role`,
            title: '订单列表'
        }
    ]
}
