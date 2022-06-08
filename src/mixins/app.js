import { getHeaderName, getMenuSider, getSiderSubmenu } from '@/libs/system'
/**
 * 通用混合
 * */
export default {
    methods: {
        // 当 $route 更新时触发
        appRouteChange (to, from) {
            const path = to.path;
            if (to.path === '/login') return false;
            let menuList = JSON.parse(localStorage.getItem('menus'));
            const headerName = getHeaderName(path, menuList);
            // 在 404 时，是没有 headerName 的
            if (headerName !== null) {
                this.$store.commit('admin/menu/setHeaderName', headerName);
                const filterMenuSider = getMenuSider(menuList, headerName);
                this.$store.commit('admin/menu/setSider', filterMenuSider);
                this.$store.commit('admin/menu/setActivePath', path);
                const openNames = getSiderSubmenu(path, menuList);
                this.$store.commit('admin/menu/setOpenNames', openNames)
            }
        }
    }
}
