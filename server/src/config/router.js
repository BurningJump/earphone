export default [
    // 注册登录
    [/\/api\/index?/, 'api/index', 'rest'],
    ['api/user/logout', 'post'],
    ['api/user/register', 'rest'],
    [/\/api\/user\/(\w+)(?:\/(\d+))?/, 'api/user/:1', 'rest'],
    [/\/api\/common\/(\w+)(?:\/(\d+))?/, 'api/common/:1?id=:2', 'rest']
];
