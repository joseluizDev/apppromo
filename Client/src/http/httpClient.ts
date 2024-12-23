import Cookie from 'js-cookie';

// const baseUrl = "https://server-domingos-reserva-api.uwqcav.easypanel.host/api/"; 
const baseUrl = "https://localhost:7208/api/"; 


const HttpClient = {
    get: function (path: string, token: boolean = false) {
        const auth = Cookie.get('token'); // Obtém o token dinamicamente
        return fetch(baseUrl + path, {
            
            method: 'GET',
            headers: {
                Authorization: token && auth ? `Bearer ${auth}` : '',
                'Content-Type': 'application/json',
            }
        });
    },

    post: function (path: string, data: object, token: boolean = false) {
        const auth = Cookie.get('token'); // Obtém o token dinamicamente
        return fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                Authorization: token && auth ? `Bearer ${auth}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    postFormData: function (path: string, data: FormData, token: boolean = false) {
        const auth = Cookie.get('token'); // Obtém o token dinamicamente
        return fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                Authorization: token && auth ? `Bearer ${auth}` : '',
            },
            body: data,
        });
    },

    putFromData: function (path: string, data: FormData, token: boolean = false) {
        const auth = Cookie.get('token'); // Obtém o token dinamicamente
        return fetch(baseUrl + path, {
            method: 'PUT',
            headers: {
                Authorization: token && auth ? `Bearer ${auth}` : '',
            },
            body: data,
        });
    },

    put: function (path: string, data: object, token: boolean = false) {
        const auth = Cookie.get('token'); // Obtém o token dinamicamente
        return fetch(baseUrl + path, {
            method: 'PUT',
            headers: {
                Authorization: token && auth ? `Bearer ${auth}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    delete: function (path: string, token: boolean = false) {
        const auth = Cookie.get('token'); // Obtém o token dinamicamente
        return fetch(baseUrl + path, {
            method: 'DELETE',
            headers: {
                Authorization: token && auth ? `Bearer ${auth}` : '',
                'Content-Type': 'application/json',
            },
        });
    },
};

export default HttpClient;
