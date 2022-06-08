const emptyPagePath = '/empty'
export default function getFirstMenuPath () {
    let menuList = JSON.parse(localStorage.getItem('menus') || '{}')
    let firstMenuPath = ''
    reQueryList(menuList)

    /**
     * 递归查询第一个菜单
     * @todo 如果第一个菜单有子菜单，递归查询子菜单，找到第一个菜单的第一个子菜单
     * @param {array} menuList 菜单列表
     * @param {boolean} isChildrenMenu 是否为子菜单，子菜单内的菜单不需要校验header
     * @returns 返回菜单Path
     */
    function reQueryList (menuList, isChildrenMenu) {
        menuList.forEach(item => {
            if (!firstMenuPath && item.path && (item.header === 'home' || isChildrenMenu)) {
                if (item.children && item.children.length) {
                    reQueryList(item.children, true)
                } else {
                    firstMenuPath = item.path
                }
            }
        })
    }

    return firstMenuPath || emptyPagePath;
}
