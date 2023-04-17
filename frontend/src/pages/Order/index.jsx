import React, { useEffect } from 'react'
import { Breadcrumb } from 'antd';
import axios from 'axios';

export const Order = () => {

    const getAllOrder = async () => {
        try {
            const res = await axios.get("http://localhost:7000/order/getAllOrder");

        } catch (e) {
            console.log("Err:", e)
        }
    }

    useEffect(() => {
        getAllOrder()
    }, [])



    return (
        <>
            <Breadcrumb
                routes={[
                    { path: '/', breadcrumbName: 'Home' },
                    { path: '/order', breadcrumbName: 'Quản lý đơn hàng' },
                ]}
                separator="/"
                style={{
                    margin: '16px 0',
                }}
            />
            <h1>Quản lý đơn hàng nhé</h1>
        </>
    )
}
