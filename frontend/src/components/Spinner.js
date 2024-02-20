import React from 'react'
import { Spin } from 'antd'

function Spinner() {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999'
        }}>
            <Spin size="large" />
        </div>
    )
}

export default Spinner;
