import React, { useEffect, useState } from 'react'
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';


export const UpdateOrder = ({ open, setOpen, item, getAll }) => {
    const [form] = Form.useForm()
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState();
    const [customerAddress, setCustomerAddress] = useState("");
    const [orderDes, setOrderDes] = useState("");
    const [orderPay, setOrderPay] = useState();
    const [orderStatus, setOrderStatus] = useState();

    useEffect(() => {
        form.setFieldsValue({
            customer_name: item?.customer_name,
            customer_phone: item?.customer_phone,
            customer_address: item?.customer_address,
            order_pay: item?.order_pay,
            order_description: item?.order_description,
            order_status: item?.order_status
        })
        setCustomerName(item?.customer_name);
        setCustomerPhone(item?.customer_phone);
        setCustomerAddress(item?.customer_address);
        setOrderDes(item?.order_description);
        setOrderPay(item?.order_pay);
        setOrderStatus(item?.order_status)
    }, [item, form])

    const OK = () => {
        form.validateFields().then(async () => {
            const newOrder = {
                order_products: item?.order_products,
                customer_name: customerName,
                customer_phone: customerPhone,
                customer_address: customerAddress,
                order_pay: orderPay,
                order_description: orderDes,
                order_status: orderStatus,
            }
            try {
                await axios.put(`http://localhost:7000/order/update/${item?._id}`, newOrder);
                toast.success("Cập nhật đơn hàng thành công")
                setOpen(false);
                getAll();

            } catch (e) {
                toast.warning("Cập nhật đơn hàng thất bại !")
                console.log("Err", e)
            }
        })
    }

    const handleOrderPay = (value) => {
        setOrderPay(value)
    }

    const handleOrderStatus = (value) => {
        setOrderStatus(value)
    }

    return (
        <>
            <Modal
                title="Cập nhật đơn hàng"
                centered
                width={1000}
                open={open}
                onOk={OK}
                onCancel={() => setOpen(false)}
            >
                <Form form={form} layout="vertical" style={{ margin: '20px 10px' }}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="customer_name"
                                label="Tên Khách hàng"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập tên',
                                    },
                                ]}
                            >
                                <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Tên tài khoản" prefix={<UserOutlined />} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="customer_phone"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập Số điện thoại',
                                    },
                                ]}
                            >
                                <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} type="Number" placeholder="Số điện thoại" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                name="customer_address"
                                label="Địa chỉ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập địa chỉ',
                                    },
                                ]}
                            >
                                <Input value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="Nhập địa chỉ" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                name="order_description"
                                label="Mô tả đơn hàng"
                            >
                                <TextArea value={orderDes} onChange={(e) => setOrderDes(e.target.value)} rows={4} placeholder="Nhập mô tả" maxLength={50} showCount />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="order_pay"
                                label="Loại thanh toán"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn loại thanh toán',
                                    },
                                ]}
                            >
                                <Select placeholder="Hình thức" onChange={handleOrderPay}>
                                    <Select.Option key="1" value="1">Tiền mặt</Select.Option>
                                    <Select.Option key="2" value="2">Thẻ</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="order_status"
                                label="Trạng thái"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn trạng thái',
                                    },
                                ]}
                            >
                                <Select placeholder="Trạng thái đơn" onChange={handleOrderStatus}>
                                    <Select.Option key="1" value="order">Đang xử lý</Select.Option>
                                    <Select.Option key="2" value="success">Thành công</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}
