import { AxiosResponse } from "axios";
import { QQInfo } from '../components/QQCard/interface';
import { getQQInfoUrl, request } from '../util';

/**
 * 获取qq信息接口 GET
 * @param qq qq号
 */
const getQQInfo: (qq: string) => Promise<AxiosResponse<QQInfo>> = async (qq: string) => {
    return request({
        url: getQQInfoUrl,
        params: { qq },
    })
}

export {
    getQQInfo
}

