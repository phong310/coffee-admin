import { UserOutlined } from '@ant-design/icons';
import { Row, Typography } from 'antd';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// const data = [
//     {
//         name: 'Jan', uv: 4000, pv: 2400, amt: 2400,
//     },
//     {
//         name: 'Feb', uv: 3000, pv: 1398, amt: 2210,
//     },
//     {
//         name: 'Mar', uv: 2000, pv: 9800, amt: 2290,
//     },
//     {
//         name: 'Apr', uv: 2780, pv: 3908, amt: 2000,
//     },
//     {
//         name: 'May', uv: 1890, pv: 4800, amt: 2181,
//     },
//     {
//         name: 'Jun', uv: 2390, pv: 3800, amt: 2500,
//     },
//     {
//         name: 'Jul', uv: 3490, pv: 4300, amt: 2100,
//     },
// ];

// const data2 = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];

const dataCircle = [
    { name: 'Tiềm năng', value: 400 },
    { name: 'Thành viên', value: 300 },
    { name: 'Vip', value: 300 },
    { name: 'Ủng hộ', value: 200 },
];


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const CircleChartComponent = () => {
    const { Title } = Typography;
    return (
        <>
            <Row>
                <Title level={4} >Khách hàng tiêu dùng <UserOutlined /></Title>
                {/* <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>

            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart> */}

                <PieChart width={400} height={350}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={dataCircle}
                        cx={240}
                        cy={150}
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {dataCircle.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </Row>
        </>


    );
};
