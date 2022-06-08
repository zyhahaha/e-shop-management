// 菜单，侧边栏
// import dashboard from './modules/dashboard';
import shop from './modules/shop';
import permission from './modules/permission';

// 系统
import log from './modules/log';

// 二级页面数组
import secondaryPages from './secondary/index.js'

export default [
    // dashboard,
    shop,
    permission,

    log,
    // 二级页面
    ...secondaryPages
];
