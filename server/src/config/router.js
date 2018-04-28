export default [
    // 注册登录
    // [/\/api\/index?/, 'api/index', 'rest'],
    ['api/user/logout', 'post'],
    ['api/user/login', 'post'],
    ['api/user/register', 'post'],
    // [/\/api\/user\/(\w+)(?:\/(\d+))?/, 'api/user/:1', 'rest'],
    // [/\/api\/common\/(\w+)(?:\/(\d+))?/, 'api/common/:1?id=:2', 'rest']
];
