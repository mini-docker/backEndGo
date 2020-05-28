export default {
    newApi: {
        AUTH_REGISTER: "/auth/register",
        AUTH_LOGIN: "/auth/login",
    },
    SYSTEM_LOGIN: "/system/login", //登陆
    SYSTEM_LOGOUT: "/system/logout",
    SYSTEM_OWNER: "/system/owner", //查询菜单列表(本身)
    SYSTEM_MENULIST: "/system/queryMenuList", //查询菜单列表
    SYSTEM_ADD_MENU: "/system/addMenu", //添加菜单列表
    SYSTEM_QUERCHDL: "/system/queryChildrenById", //菜单枚举
    SYSTEM_QUERY_MENU_ONE: "/system/queryMenuOne", //根据id查询菜单
    SYSTEM_EDIT_MENU: "/system/editMenu", //修改菜单
    MODIFY_PWD: "/system/editPassword",
    SYSTEM_QUERY_ADMIN_LIST: "/system/queryAdminList",//查询系统管理员列表
    SYSTEM_LIST: '/system/agencyCode',
    SYSTEM_ROOM_CODE: "/system/roomCode", //群枚举
    
    // 角色管理
    SYSTEM_QUERY_ROLE_LIST: "/system/queryRoleList", //查询角色列表
    SYSTEM_ADD_ROLE: "/system/addRole", // 添加角色
    SYSTEM_QUERY_ROLE_ONE: "/system/queryRoleOne", // 查询单个角色
    SYSTEM_EDIT_ROLE: "/system/editRole", // 修改角色
    SYSTEM_EDIT_ROLE_STATUS: "/system/editRoleStatus", // 修改角色状态
    SYSTEM_SET_ROLE_PERMISSION: "/system/setRolePermission", // 角色赋权
    SYSTEM_DEL_ROLE: "/system/delRole", // 删除角色
    SYSTEM_ADMINLIST: "/system/queryAdminList", // 系统账号管理列表
    SYSTEM_ROLECODE: "/system/queryRoleCode", // 角色下啦
    SYSTEM_EDITADMIN: "/system/editAdmin", // 修改系统管理员
    SYSTEM_RESETPASSWORD: "/system/resetPassword", // 重置系统管理员密码
    SYSTEM_ADDADMIN: "/system/addAdmin", // 添加系统管理员
    SYSTEM_DELADMIN: "/system/delAdmin", // 删除系统管理员
    SYSTEM_QUERY_ROLE_PERMISSION: "/system/queryRolePermission",//获取角色权限
    // 线路套餐管理
    SYSTEM_QUERY_LINE_MEAL_LIST: "/system/queryLineMealList", // 查询线路套餐列表
    SYSTEM_ADD_LINE_MEAL: "/system/addLineMeal", // 添加套餐
    SYSTEM_QUERY_LINE_MEAL_ONE: "/system/queryLineMealOne", // 查询单个套餐信息
    SYSTEM_EDIT_LINE_MEAL: "/system/editLineMeal", // 修改套餐
    SYSTEM_QUERY_LINE_MEAL_CODE: "/system/queryLineMealCode", //套餐枚举信息
    // 线路管理
    SYSTEM_QUERY_LINE_LIST: "/system/queryLineList", // 查询线路列表
    SYSTEM_QUERY_LINE_CODE: "/system/queryLineCode", // 查询线路Id枚举
    SYSTEM_ADD_LINE: "/system/addLine", // 添加线路
    SYSTEM_QUERY_LINE_ONE: "/system/queryLineOne", // 查询单个线路
    SYSTEM_EDIT_LINE: "/system/editLine", // 修改线路
    SYSTEM_EDIT_LINE_STATUS: "/system/editLineStatus", // 修改线路状态 
    SYSTEM_QUERY_LINE_ROYALTY: "/system/queryLineRoyalty",      //线路提成列表
    SYSTEM_QUERY_LINE_AGENCY_ROYALTY: "/system/queryLineAgencyRoyalty",     // 线路代理提成   
    SYSTEM_AGENCYADMINLIST: "/system/queryAgencyAdminList",//查询超管列表
    SYSTEM_ADDAGENCYADMINLIST: "/system/addAgencyAdmin",//添加超管列表
    SYSTEM_EDITAGENCYADMINLIST: "/system/editAgencyAdmin",//修改超管列表
    SYSTEM_AGENCYLIST: "/system/QueryAgencyList",//查询代理列表
    SYSTEM_EDITAGENCYSTATUS: "/system/editAgencyStatus",//修改代理状态
    SYSTEM_QUERYGAMELIST: "/system/queryGameList",//查询游戏列表
    SYSTEM_ADDGAME: "/system/addGame",//添加游戏
    SYSTEM_EDITGAME: "/system/editGame",//添加游戏
    SYSTEM_EDITGAMESTATUS: "/system/editGameStatus",//添加游戏
    SYSTEM_QUERY_USER_LIST: "/system/queryUserList",     // 查询会员列表
    SYSTEM_KICK_USERS: "/system/kickUsers",    // 批量踢线
    SYSTEM_EDIT_USERS_STATUS: "/system/editUsersStatus",    // 批量启用/停用会员
    SYSTEM_MEM_MANUAL: "/system/memberManualHandOut", // 会员手动派彩接口
    SYSTEM_QUERY_ROOM_LIST: "/system/queryRoomList",    // 查询群列表
    SYSTEM_EDIT_ROOM_STATUS: "/system/editRoomStatus",     // 修改群状态
    SYSTEM_QUERY_RED_ORDER_RECORD_LIST: "/system/queryRedOrderRecordList",    // 注单列表
    SYSTEM_RED_INFO: "/system/redInfo",    // 红包详情
    SYSTEM_MANUAL_HAND_OUT: "/system/manualHandOut", //	手动派彩
    // 公告
    SYSTEM_QUERY_POST_LIST: "/system/queryPostList",   // 公告列表
    SYSTEM_QUERY_POST_BY_ID: "/system/queryPostById",     // 根据id查询公告
    SYSTEM_EDIT_POST_STATUS: "/system/editPostStatus",     // 修改公告状态
    SYSTEM_QUERY_ACTIVE_LIST: "/system/queryActiveList",     // 活动图片列表
    SYSTEM_QUERY_ACTIVE_BY_ID: "/system/queryActiveById",       // 根据id查询活动图片
    SYSTEM_EDIT_ACTIVE_STATUS: "/system/editActiveStatus",       // 修改活动图片状态

    // 统计分析
    SYSTEM_ORDER_STATISTICAL: "/system/orderStatistical", // 总后台盈利分析 

    // 系统配置
    SYSTEM_QUERY_SYSTEM_CONF: "/system/querySystemConf", // 查询站点系统配置 

    // 红包管理
    SYSTEM_ORDINARY_RED_LIST: "/system/ordinaryRed/list",
    SYSTEM_ORDINARY_RED_EDIT: "/system/ordinaryRed/edit",
    SYSTEM_ORDINARY_RED_INFO: "/system/ordinaryRed/info",
    SYSTEM_ORDINARY_RED_DEL: "/system/ordinaryRed/del",

    // 机器人红包
    SYSTEM_ROBOT_LIST: "/system/robot/list",              // 查询机器人列表
    SYSTEM_ROBOT_GET_ROBOT_ACCOUNTS: "/system/robot/getRobotAccounts",          // 批量生成机器人账号
    SYSTEM_ROBOT_INSERT_ROBOTS: "/system/robot/insertRobots",          // 批量生成机器人
    SYSTEM_ROBOT_DEL_ROBOTS: "/system/robot/delRobots",  

    // 日志
    SYSTEM_LOG_LIST: "/system/log/list", 


}