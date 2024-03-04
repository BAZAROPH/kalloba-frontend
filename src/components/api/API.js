// const DOMAIN = 'http://127.0.0.1:8003';
const DOMAIN = 'https://api.kalloba.com';
const URLS = {
    'login': `${DOMAIN}/api/token/`,
    'register': `${DOMAIN}/api/register/`,
    'userInfo': `${DOMAIN}/api/user/info/`,
    'updateUser': `${DOMAIN}/api/user/update/`,
    'checkObjectExist': `${DOMAIN}/api/check-object-exist/`,
    'registerSeller': `${DOMAIN}/api/seller/register-seller/`,
    'categoriesWithSubCategories': `${DOMAIN}/api/categories-with-sub/`,
    'createProduct': `${DOMAIN}/api/products/`,

}

export default URLS;