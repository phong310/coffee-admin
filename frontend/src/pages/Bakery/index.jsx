import React from 'react'
import { Breadcrumb } from 'antd';

export const Bakery = () => {
    return (
        <>
            <Breadcrumb
                routes={[
                    { path: '/', breadcrumbName: "Home" },
                    { path: '', breadcrumbName: 'Quản lý hệ thống' },
                    { path: '/managerment/bakery', breadcrumbName: 'Bánh' }]}
                separator="/"
                style={{
                    margin: '16px 0',
                }}
            />
            <h1>Welcome to Bakery</h1>
        </>
    )
}
