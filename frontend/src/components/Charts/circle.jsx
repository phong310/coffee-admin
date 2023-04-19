import { UserOutlined } from '@ant-design/icons';
import { Row, Typography } from 'antd';
import React from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

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
