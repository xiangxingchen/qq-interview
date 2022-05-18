jest.mock('../../util/request');

import { getQQInfo } from '../qq';

it('获取qq信息', async () => {
    const { data } = await getQQInfo('774740085')
    return expect(data).toEqual({
        "code": 1,
        "qq": "774740085",
        "name": "ゆ、 音色 Cutey。",
        "qlogo": "https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=774740085",
        "lvzuan": {
            "code": 0,
            "subcode": 0,
            "level": 8,
            "vip": 1,
            "score": 77647,
            "place": 0,
            "payway": 0,
            "isyear": 1,
            "vendor": 18
        }
    });
});

it('异常信息', async () => {
    const { data } = await getQQInfo('')
    return expect(data).toEqual({
        "code": 201701,
        "msg": "查询QQ不能为空"
    });
});
