import { isQQ } from '../util'

describe('QQ号验证', () => {
    it('长度校验', () => {
        expect(isQQ('1111')).toBeFalsy()
        expect(isQQ('111111111111')).toBeFalsy()

    });

    it('类型', () => {
        expect(isQQ('1111asdas')).toBeFalsy()
        expect(isQQ('1111中文')).toBeFalsy()
        expect(isQQ('1111，，，')).toBeFalsy()
    })

    it('正常校验', () => {
        expect(isQQ('234423')).toBeTruthy()
    })
})
