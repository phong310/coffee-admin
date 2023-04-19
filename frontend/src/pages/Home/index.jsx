import { DollarOutlined, ScheduleOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Col, Progress, Row, Steps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import "../../assets/CSS/Home.css";
import { BarChartComponent } from '../../components/Charts/bar';
import { CircleChartComponent } from '../../components/Charts/circle';
import { LineChartComponent } from '../../components/Charts/line';


export const HomePage = () => {
    const { Title } = Typography;

    const [number, setNumber] = useState(0);
    const [percentMonth, setPercentMonth] = useState(0);
    const [percentYear, setPercentYear] = useState(0);

    const [current, setCurrent] = useState(0);
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setNumber(prevNumber => {
                const newNumber = prevNumber + 1;
                if (newNumber === 65) {
                    clearInterval(interval);
                }
                return newNumber;
            });
        }, 1);
        return () => clearInterval(interval); // xoá interval khi component bị xoá
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPercentMonth(prevNumber => {
                const newNumber = prevNumber + 1;
                if (newNumber === 85) {
                    clearInterval(interval);
                }
                return newNumber;
            });
        }, 1);
        return () => clearInterval(interval); // xoá interval khi component bị xoá
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPercentYear(prevNumber => {
                const newNumber = prevNumber + 1;
                if (newNumber === 75) {
                    clearInterval(interval);
                }
                return newNumber;
            });
        }, 1);
        return () => clearInterval(interval); // xoá interval khi component bị xoá
    }, []);


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
            <Row style={{ justifyContent: 'space-evenly' }}>
                <Card className='wrapp' style={{ width: 400, marginRight: 20 }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Progress
                            size={80}
                            type="circle"
                            percent={number}
                            format={(number) => `${number} %`}
                            style={{
                                marginRight: 8,
                            }}
                        />
                        <Col>
                            <Title level={4} style={{ color: '#1677ff' }}>Lượng đơn mỗi ngày <DollarOutlined /></Title>
                            <span>345.9</span>
                        </Col>
                    </Row>
                </Card>
                <Card className='wrapp' style={{ width: 400, marginRight: 20 }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Progress
                            size={80}
                            type="circle"
                            percent={percentMonth}
                            format={(percentMonth) => <span style={{ color: '#9254de' }}>{percentMonth}%</span>}
                            strokeColor="#9254de"
                            style={{
                                marginRight: 8,
                            }}
                        />
                        <Col>
                            <Title level={4} style={{ color: '#9254de' }}> Doanh thu theo tháng <DollarOutlined /></Title>
                        </Col>
                    </Row>
                </Card>
                <Card className='wrapp' style={{ width: 400, marginRight: 20 }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Progress
                            size={80}
                            type="circle"
                            percent={percentYear}
                            format={(percentYear) => <span style={{ color: '#f759ab' }}>{percentYear}%</span>}
                            strokeColor="#f759ab"
                            style={{
                                marginRight: 8,
                            }}
                        />
                        <Col>
                            <Title level={4} style={{ color: '#f759ab' }}>Doanh thu theo năm <DollarOutlined /></Title>
                        </Col>
                    </Row>
                </Card>
                <Card className='wrapp' style={{ width: 400 }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Progress
                            size={80}
                            type="circle"
                            percent={percentYear}
                            format={(percentYear) => <span style={{ color: '#0C713D' }}>{percentYear}%</span>}
                            strokeColor="#0C713D"
                            style={{
                                marginRight: 8,
                            }}
                        />
                        <Col>
                            <Title level={4} style={{ color: '#0C713D' }}>Số lượng khách hàng <UsergroupDeleteOutlined /></Title>
                        </Col>
                    </Row>
                </Card>
            </Row >

            <Col>
                <Row style={{ justifyContent: 'space-evenly' }}>
                    <Card className='wrapp' style={{ width: 1150, marginTop: 20, marginRight: 20 }}>
                        <LineChartComponent />
                    </Card>
                    <Card className='wrapp' style={{ width: 500, marginTop: 20 }}>
                        <CircleChartComponent />
                    </Card>
                </Row>
            </Col>

            <Col>
                <Row style={{ justifyContent: 'space-evenly' }}>
                    <Card className='wrapp' style={{ width: 500, marginTop: 20, marginRight: 20 }}>
                        <Title level={4} >Lịch làm việc & Cách sử dụng <ScheduleOutlined /></Title>
                        <Steps
                            current={current}
                            onChange={onChange}
                            direction="vertical"
                            items={[
                                {
                                    title: 'Bước 1',
                                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
                                },
                                {
                                    title: 'Bước 2',
                                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
                                },
                                {
                                    title: 'Bước 3',
                                    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"

                                },
                            ]}
                        />
                    </Card>
                    <Card className='wrapp' style={{ width: 1150, marginTop: 20 }}>
                        <BarChartComponent />
                    </Card>
                </Row>
            </Col>
        </>
    )
}
