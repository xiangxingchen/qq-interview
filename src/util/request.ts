import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import qs from 'qs'

const pendingRequest = new Map();
const request = axios.create()

// 根据参数生成对应的key
const generateReqKey = (config: AxiosRequestConfig) => {
    const { method, url, params, data } = config;
    return [method, url, qs.stringify(params), qs.stringify(data)].join("&");
}

// 生成并保存cancelToken
function addPendingRequest(config: AxiosRequestConfig) {
    const requestKey = generateReqKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingRequest.has(requestKey)) {
            pendingRequest.set(requestKey, cancel);
        }
    });
}
// 检查是否存在重复请求，若存在则取消已发的请求
function removePendingRequest(config: AxiosRequestConfig) {
    const requestKey = generateReqKey(config);
    if (pendingRequest.has(requestKey)) {
        const cancelToken = pendingRequest.get(requestKey);
        cancelToken(requestKey);
        pendingRequest.delete(requestKey);
    }
}

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        removePendingRequest(config)
        addPendingRequest(config)
        return config
    },
    (err) => Promise.reject(err)
)
// 响应拦截器
request.interceptors.response.use(
    (response )=>{
        removePendingRequest(response.config)
        return response
    }, (error: AxiosError) => {
        removePendingRequest(error.config || {})
        if (axios.isCancel(error)) {
            console.log("已取消的重复请求：" + error.message);
        }
        return Promise.reject(error);
    }
)

export {
    request
}
