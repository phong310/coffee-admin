import React from 'react'
import { Modal } from 'antd';
import { Row, Col, Typography, Tag, Image } from 'antd';
import Money from '../Money';



export const DetailDrinks = ({ open, setOpen, item }) => {
    const { Title } = Typography;

    return (
        <>
            <Modal
                title="Chi tiết sản phẩm"
                width={1000}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            >
                <Col style={{ textAlign: "center", margin: "50px 50px" }}>
                    <Row style={{ alignItems: 'center', justifyContent: "space-between", marginBottom: 20 }}>
                        <Col>
                            <Title level={5}>STT:</Title>
                        </Col>
                        <Col>{item?.id}</Col>
                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: "space-between", marginBottom: 20 }}>
                        <Col>
                            <Title level={5}>Tên sản phẩm:</Title>
                        </Col>
                        <Col>{item?.title}</Col>
                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: "space-between", marginBottom: 20 }}>
                        <Col>
                            <Title level={5}>Giá sản phẩm:</Title>
                        </Col>
                        <Col>
                            <Money value={item?.price} />
                        </Col>
                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: "space-between", marginBottom: 20 }}>
                        <Col>
                            <Title level={5}>Mô tả:</Title>
                        </Col>
                        <Col>{item?.description}</Col>
                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: "space-between", marginBottom: 20 }}>
                        <Col>
                            <Title level={5}>Trạng thái:</Title>
                        </Col>
                        <Col>
                            <Tag color={item?.status === 'active' ? 'green' : 'red'}>
                                {item?.status === "active" ? "Còn hàng" : "Hết hàng"}
                            </Tag>
                        </Col>
                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: "space-between", marginBottom: 20 }}>
                        <Col>
                            <Title level={5}>Ảnh:</Title>
                        </Col>
                        <Col>
                            <Image
                                width={70}
                                src={item?.img}
                            />
                        </Col>
                    </Row>
                </Col>
            </Modal>
        </>
    );
}
