// 菜单，侧边栏
// import dashboard from './modules/dashboard';
import merchant from './modules/merchant';
import permission from './modules/permission';

// 系统
import log from './modules/log';

// 二级页面数组
import secondaryPages from './secondary/index.js'

export default [
    // dashboard,
    merchant,
    permission,

    log,
    // 二级页面
    ...secondaryPages
];
