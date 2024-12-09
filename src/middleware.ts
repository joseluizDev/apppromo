import Cookie from 'js-cookie';

const middleware = (): boolean => {
    const token = Cookie.get('token');
    return Boolean(token);
};

export default middleware;
