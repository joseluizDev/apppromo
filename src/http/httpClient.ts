import Cookie from 'js-cookie';

const baseUrl = "http://localhost:5210/api/";
const auth = Cookie.get('token');

const HttpClient = {
    get : function (path: string, token: boolean = false){
        return fetch(baseUrl + path, {
            method: 'GET',
            headers: {
                Authorization: token ? `Bearer ${auth}` : '',
                'Content-Type': 'application/json',
            }
        })
    },

    post: function (path: string, data: object, token: boolean = false){
        return fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                Authorization: token ? `Bearer ${auth}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    },

    postFormData: function (path: string, data: FormData, token: boolean = false){
        return fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                Authorization: token ? `Bearer ${auth}` : '',
            },
            body: data
        })
    },

    put: function (path: string, data: object, token: boolean = false){
        return fetch(baseUrl + path, {
            method: 'PUT',
            headers: {
                Authorization: token ? `Bearer ${auth}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    },

    delete: function (path: string, token: boolean = false){
        return fetch(baseUrl + path, {
            method: 'DELETE',
            headers: {
                Authorization: token ? `Bearer ${auth}` : '',
                'Content-Type': 'application/json',
            }
        })
    }
}

export default HttpClient;