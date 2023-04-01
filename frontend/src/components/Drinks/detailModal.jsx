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
                        <Col>STT:</Col>
                        <Col>
                            <Title level={5}>{item?.id}</Title>
                        </Col>
                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: "space-between", marginBottom: 20 }}>
                        <Col>Tên sản phẩm:</Col>
                        <Col>
                            <Title level={5}>{item?.title}</Title>
                        </Col>
                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: "space-between", marginBottom: 20 }}>
                        <Col>
                            Giá sản phẩm:
                        </Col>
                        <Col>
                            <Title level={5}>
                                <Money value={item?.price} />
                            </Title>
                        </Col>
                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: "space-between", marginBottom: 20 }}>
                        <Col>
                            Mô tả:
                        </Col>
                        <Col>
                            <Title level={5}>{item?.description}</Title>
                        </Col>
                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: "space-between", marginBottom: 20 }}>
                        <Col>
                            Trạng thái:
                        </Col>
                        <Col>
                            <Tag color={item?.status === 'active' ? 'green' : 'red'}>
                                {item?.status === "active" ? "Còn hàng" : "Hết hàng"}
                            </Tag>
                        </Col>
                    </Row>
                    <Row style={{ alignItems: 'center', justifyContent: "space-between", marginBottom: 20 }}>
                        <Col>
                            Ảnh:
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
