import { AxiosRequestConfig } from 'axios';

const allQQ = {
    '774740085': {
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
    },
    '774740086': {
        "code": 1,
        "qq": "774740086",
        "name": "黎明",
        "qlogo": "https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=774740086",
        "lvzuan": {
            "code": 0,
            "subcode": 0,
            "level": 1,
            "vip": 0,
            "score": 0,
            "place": 0,
            "payway": 8,
            "isyear": 0,
            "vendor": 0
        }
    },
};

function request(config: AxiosRequestConfig) {
    return new Promise((resolve) => {
        const { qq }: { qq: '774740085' | '774740086' } = config.params
        process.nextTick(() =>
            allQQ[qq]
                ? resolve({ data: allQQ[qq] })
                : resolve({
                    data: {
                        "code": 201701,
                        "msg": "查询QQ不能为空"
                    }
                }),
        );
    });
}

export {
    request
}
