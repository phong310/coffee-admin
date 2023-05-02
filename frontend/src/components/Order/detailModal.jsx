import { Col, Divider, Modal, Row, Tag } from 'antd';
import React from 'react';
import Money from "../Money"
import moment from 'moment';


export const DetailOrder = ({ open, setOpen, item }) => {

    return (
        <>
            <Modal
                title="Chi tiết đơn hàng"
                centered
                width={1300}
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            >
                <Col style={{ maxHeight: '700px', width: '1600px', overflowY: 'auto' }}>
                    <Col style={{ margin: '50px 50px', }}>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <Col style={{ width: '500px' }}>
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Col>Mã đơn hàng: </Col>
                                    <Col>
                                        <b style={{ color: 'red' }}>{item?._id}</b>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Col>Tên khách hàng: </Col>
                                    <Col>
                                        <b>{item?.customer_name}</b>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Col>Số điện thoại: </Col>
                                    <Col>
                                        <b>{item?.customer_phone}</b>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Col>Địa chỉ: </Col>
                                    <Col>
                                        <b>{item?.customer_address}</b>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Col>Mô tả đơn hàng: </Col>
                                    <Col>
                                        <b>{item?.order_description}</b>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Col>Các sản phẩm đã đặt: </Col>
                                    {item?.order_products.map((value, i) => (
                                        <Col key={i} >
                                            {value.item.map((vl, id) => (
                                                <Col key={id}>
                                                    <br />
                                                    <span>Tên sản phẩm: <b style={{ color: '#0C713D' }}>{vl.name}</b> </span>
                                                    <br />
                                                    <span>Kích cỡ: <b>{vl.size?.join(', ')}</b></span>
                                                    <br />
                                                    <span>Số lượng: <b>{vl.quantity}</b></span>
                                                    <br />
                                                    <span>Ghi chú sản phẩm: <b>{vl.note}</b></span>
                                                </Col>

                                            ))}
                                        </Col>
                                    ))}

                                </Row>
                            </Col>

                            <Divider type="vertical" style={{ height: 500 }} />

                            <Col style={{ width: '600px' }}>
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Col>Tổng số lượng: </Col>
                                    {item?.order_products.map((value) => (
                                        <Col><b style={{ color: 'red' }}>{value.quantity}</b></Col>
                                    ))}
                                </Row>
                                <Divider />
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Col>Tổng tiền: </Col>
                                    {item?.order_products.map((value) => (
                                        <Col>
                                            <Tag color='green'><Money value={value.price} /></Tag>
                                        </Col>
                                    ))}
                                </Row>
                                <Divider />
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Col>
                                        <span>Ngày: <b>{moment(item?.createdAt).format('YYYY-MM-DD')}</b></span>
                                    </Col>
                                    <Col>
                                        <span>Giờ: <b>{moment(item?.createdAt).format('HH:mm:ss')}</b></span>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Col>Loại thanh toán: </Col>
                                    <Col>
                                        <Tag color={item?.order_pay === "1" ? 'green' : 'blue'}>
                                            {item?.order_pay === "1" ? "Tiền mặt" : "Banking"}
                                        </Tag>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                                    <Col>Trạng thái đơn: </Col>
                                    <Col>
                                        <Tag color={item?.order_status === "order" ? "red" : "purple"}>
                                            {item?.order_status === "order" ? "Đang xử lý..." : "Thành công"}
                                        </Tag>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Modal>
        </>
    );
}
