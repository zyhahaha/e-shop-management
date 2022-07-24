const pre = '/shop/';

export default {
    path: '/shop',
    title: '平台管理',
    header: 'home',
    icon: 'md-desktop',
    children: [
        {
            path: `${pre}product-list`,
            title: '商品列表',
            icon: 'ios-cafe'
        }, {
            path: `${pre}order-list`,
            title: '订单列表',
            icon: 'md-bookmarks'
        }, {
            path: `${pre}ispa-list`,
            title: '数据抓取',
            icon: 'md-bookmarks'
        }, {
            path: `${pre}djh-list`,
            title: '数据抓取DJH',
            icon: 'md-bookmarks'
        }
    ]
}
