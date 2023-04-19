import { BarChartOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Typography } from 'antd';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    {
        name: 'Jan', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Feb', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Mar', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Apr', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'May', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Jun', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Jul', uv: 3490, pv: 4300, amt: 2100,
    },
    {
        name: 'Aug', uv: 3490, pv: 4300, amt: 2100,
    },
    {
        name: 'Sep', uv: 3490, pv: 4300, amt: 2100,
    },
    {
        name: 'Oct', uv: 3490, pv: 4300, amt: 2100,
    },
    {
        name: 'Nov', uv: 3490, pv: 4300, amt: 2100,
    },
    {
        name: 'Dec', uv: 3490, pv: 4300, amt: 2100,
    },
];

export const BarChartComponent = () => {
    const { Title } = Typography;
    return (
        <>
            <Title level={4} >Biểu đồ cột qua các năm <BarChartOutlined /></Title>
            <Row>
                <BarChart width={1090} height={500} data={data}>
                    <XAxis dataKey="name" stroke="#0C713D" />
                    <YAxis />
                    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="uv" fill="#0C713D" barSize={30} />
                </BarChart>

            </Row>
        </>


    );
};
