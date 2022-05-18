import React, { useState } from 'react'
import { debounce, isEmpty } from 'lodash'
import { isQQ, ErrorCode } from './util'
import { QQInfo } from './components/QQCard/interface'
import QQCard from './components/QQCard'
import { getQQInfo } from "./services/qq"
import './App.css'

function App() {
    const [info, setInfo] = useState<QQInfo | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [err, setError] = useState<string>('')

    const onChange = debounce(async (evt: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        setError('')

        const { value } = evt.target
        // 1、为空校验
        if (isEmpty(value)) {
            setInfo(undefined)
            setLoading(false)
            return
        }
        // 2、qq合法校验
        if (!isQQ(value)) {
            setError('请输入合法qq号')
            setInfo(undefined)
            setLoading(false)
            return
        }

        // 3、查询qq信息
        const { data, data: { code, msg = '' } } = await getQQInfo(value)
        if (code === ErrorCode.SUCCESS) {
            setInfo(data)
        } else {
            setInfo(undefined)
            setError(msg)
        }
        setLoading(false)

    }, 1000)
    return (
        <div className="card">
            <h1>QQ号查询</h1>
            <div>
                <div>
                    <label htmlFor="qq">QQ</label>
                    <input className="search" type="text" name='qq' onChange={ onChange } placeholder="请输入QQ号"/>
                </div>
                <div className="form-item-error">{ err }</div>
            </div>

            { loading && <div className="loading-container">
                <div className="loading"></div>
            </div> }
            { !loading && <QQCard info={ info }/> }
        </div>
    );
}

export default App;
