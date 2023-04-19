import { DollarOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Col, Progress, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import "../../assets/CSS/Home.css";
import { CircleChartComponent } from '../../components/Charts/circle';
import { LineChartComponent } from '../../components/Charts/line';
import { BarChartComponent } from '../../components/Charts/bar';


export const HomePage = () => {
    const { Title } = Typography;

    const [number, setNumber] = useState(0);
    const [percentMonth, setPercentMonth] = useState(0);
    const [percentYear, setPercentYear] = useState(0)

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
            <Row>
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
                            format={(percentYear) => <span style={{ color: '#262626' }}>{percentYear}%</span>}
                            strokeColor="#262626"
                            style={{
                                marginRight: 8,
                            }}
                        />
                        <Col>
                            <Title level={4} style={{ color: '#262626' }}>Số lượng khách hàng <UsergroupDeleteOutlined /></Title>
                        </Col>
                    </Row>
                </Card>
            </Row >

            <Row style={{ justifyContent: 'space-between' }}>
                <Card className='wrapp' style={{ width: 1150, marginTop: 20 }}>
                    <LineChartComponent />
                </Card>
                <Card className='wrapp' style={{ width: 500, marginTop: 20 }}>
                    <CircleChartComponent />
                </Card>
            </Row>
            <Col>
                <Card className='wrapp' style={{ marginTop: 20 }}>
                    <BarChartComponent />
                </Card>
            </Col>





        </>
    )
}
