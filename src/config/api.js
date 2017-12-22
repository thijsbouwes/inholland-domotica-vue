export const ENDPOINTS = {
    BASE: 'https://api.inholland.it/v1/',
    CHECK_AUTH: '',
    REGISTER: 'user/register',
    PROFILE: 'user/profile',
    PROFILE_SETTINGS: 'user/profile/all',
    BACKGROUND_ALL: 'background',
    LOGIN: 'auth/authorize',
    LOGIN_REFRESH: 'auth/token/refresh',
    LAMPS: 'house/lamp',
    LAMP_SWITCH: 'house/lamp/switch/',
    WINDOWS: 'house/window',
    WINDOW_SWITCH: 'house/window/switch/',
    HEATER: 'house/heater',
    HEATER_TEMPERATURE: 'house/heater/temperature',
    HOUSE_REMOTE: 'house/remote',
    WEATHER: 'weather',
    NEWS: 'news',
    BOOKMARKS: 'bookmark',
    WIDGETS: 'user/widgets',
    USERS: 'admin/userlist'
};

export const HTTP_CODES = {
    UNAUTHORIZED: 401
};