import axios, { CreateAxiosDefaults } from 'axios';
import jwtDecode from 'jwt-decode';
import httpRefresh from '~/apis/httpRefresh';
import CryptoJS from 'crypto-js';

const config: CreateAxiosDefaults = {
    baseURL: 'http://localhost:8008/api',
    withCredentials: true,
    // headers: {
    //     'Access-Control-Allow-Credentials': true,
    // },
};

const httpRequest = axios.create(config);
const httpJwt = axios.create(config);
httpJwt.interceptors.request.use(async (response) => {
    const crToken = localStorage.getItem('cr_token');
    if (crToken) {
        const decode = CryptoJS.AES.decrypt(crToken, '1234').toString(CryptoJS.enc.Utf8);
        const date = new Date();
        const a: { exp: number } = jwtDecode(decode);
        if (a.exp < date.getTime() / 1000) {
            try {
                const newToken = await httpRefresh();
                const encode = CryptoJS.AES.encrypt(newToken.accessToken, '1234').toString();
                localStorage.setItem('cr_token', encode);
                response.headers['token'] = `Bearer ${newToken.accessToken}`;
                return response;
            } catch (error) {
                localStorage.removeItem('cr_token');
                window.location.reload();
                console.log(error);
                return response;
            }
        } else {
            response.headers['token'] = `Bearer ${decode}`;
            return response;
        }
    } else {
        localStorage.removeItem('cr_token');
        window.location.reload();
        return response;
    }
});
const GET = async (path: string, config?: {}) => {
    const res = await httpRequest.get(path, config);
    return res.data;
};

const POST = async (path: string, data: {}, config?: {}) => {
    const res = await httpRequest.post(path, data, config);
    return res.data;
};

const PATCH = async (path: string, data: {}, config?: {}) => {
    const res = await httpRequest.patch(path, data, config);
    return res.data;
};

const httpToken = {
    POST: async (path: string, data: {}, config?: {}) => {
        const res = await httpJwt.post(path, data, config);
        return res.data;
    },
    FORM: async (path: string, data: {}, config?: {}) => {
        const res = await httpJwt.postForm(path, data, config);
        return res.data;
    },
    GET: async (path: string, config?: {}) => {
        const res = await httpJwt.get(path, config);
        return res.data;
    },
};

export { POST, PATCH, GET, httpToken };
export default httpRequest;
