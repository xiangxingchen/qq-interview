import React from 'react'
import './index.css'
import { QQInfo } from './interface'

const Index: React.FC<{ info: QQInfo | undefined }> = (props) => {
    if (!props.info){
        return <></>
    }
    const { qlogo, name, qq } = props.info || {}
    return (
        <div className="info">
            <img className="info-avatar" src={qlogo} alt=""/>
            <div className="info-content">
                <div>{name}</div>
                <div>{qq}</div>
            </div>
        </div>

    );
}

export default Index;
