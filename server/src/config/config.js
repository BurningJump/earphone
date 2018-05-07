// default config
export const workers = 1;
export const cookie = {
  domain: '',
  path: '/',
  maxAge: 10 * 3600 * 1000,
  signed: true,
  keys: [] // 当 signed 为 true 时，使用 keygrip 库加密时的密钥
};
