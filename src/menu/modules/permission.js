const pre = '/permission/';

export default {
    path: '/permission',
    title: '权限管理',
    header: 'home',
    icon: 'md-speedometer',
    // auth: ['permission-role-list', 'permission-staff-list', 'permission-menu-list'],
    children: [
        {
            path: `${pre}role-list`,
            title: '角色列表'
            // auth: ['permission-role-list']
        }, {
            path: `${pre}staff-list`,
            title: '人员列表'
            // auth: ['permission-staff-list']
        }, {
            path: `${pre}menu-list`,
            title: '菜单列表'
            // auth: ['permission-menu-list']
        }
    ]
}
