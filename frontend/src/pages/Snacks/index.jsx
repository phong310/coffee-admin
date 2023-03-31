import React from 'react'
import { Breadcrumb } from 'antd'

export const Snacks = () => {
    return (
        <>
            <Breadcrumb
                routes={[
                    { path: '/', breadcrumbName: "Home" },
                    { path: '', breadcrumbName: 'Quản lý hệ thống' },
                    { path: '/managerment/snacks', breadcrumbName: 'Đồ ăn vặt' }]}
                separator="/"
                style={{
                    margin: '16px 0',
                }}
            />
            <h1>Welcome to Snacks</h1>
        </>
    )
}
