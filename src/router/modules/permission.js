import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'permission-';

export default {
    path: '/permission',
    name: '权限设置',
    redirect: {
        name: `${pre}role-list`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'role-list',
            name: `${pre}role-list`,
            meta: {
                ...meta,
                title: '角色列表'
            },
            component: () => import('@/pages/permission/role/index')
        },
        {
            path: 'staff-list',
            name: `${pre}staff-list`,
            meta: {
                ...meta,
                title: '人员列表'
            },
            component: () => import('@/pages/permission/staff/index')
        },
        {
            path: 'menu-list',
            name: `${pre}menu-list`,
            meta: {
                ...meta,
                title: '菜单列表'
            },
            component: () => import('@/pages/permission/menu/index')
        }
    ]
};
