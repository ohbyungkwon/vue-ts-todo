import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export default class Axios {
    private static axiosInstance:AxiosInstance = this.getInstance();

    public static getInstance () {
        if(this.axiosInstance) {
            return this.axiosInstance;
        }

        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:18080',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

        this.reqInterceptor();
        this.resInterceptor();
        return this.axiosInstance;
    }

    private static reqInterceptor() {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const url = config.url;
                if(url !== '/login') {
                    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    private static resInterceptor() {
        this.axiosInstance.interceptors.response.use(
            (response) => {
                const url = response.config.url;
                if(url === '/login'){
                    const headers = response.headers;
                    if(headers && headers['Authorization']) {
                        const token = headers['Authorization']
                        localStorage.setItem('token', token);
                    }
                }
                return response;
            }, 
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public static async get(url: string, requestParam: any, callback?: (result: any) => void | null) {
        return await this.request('GET', url, {params: requestParam}, callback);
    }

    public static async post(url: string, requestBody: any, callback?: (result: any) => void | null) {
        return await this.request('POST', url, requestBody, callback);
    }

    public static async put(url: string, requestBody: any, callback?: (result: any) => void | null) {
        return await this.request('PUT', url, requestBody, callback);
    }

    public static async delete(url: string, requestBody: any, callback?: (result: any) => void | null) {
        return await this.request('DELETE', url, requestBody, callback);
    }

    private static async request(method: Method, url: string, contents: any, callback?: (result: any) => void | null) {
        let response:AxiosResponse | undefined;
        try{
            const config: AxiosRequestConfig = {
                method,
                url,
                [ method === 'GET' ? 'params' : 'data' ]: contents  
            };

            response = await this.axiosInstance.request(config);

            if(callback) callback(response);
        } catch(error) {
            if (axios.isAxiosError(error)) {
                throw error;
            }
            throw new Error('An unexpected error occurred');
        }

        return response;
    }
} 