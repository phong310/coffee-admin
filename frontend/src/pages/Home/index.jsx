import React from 'react'
import { Breadcrumb } from 'antd';

export const HomePage = () => {
    return (
        <>
            <Breadcrumb
                routes={[
                    { path: '/', breadcrumbName: 'Home' }]}
                separator="/"
                style={{
                    margin: '16px 0',
                }}
            />
            <h1>Welcom To HomePage</h1>
        </>
    )
}
