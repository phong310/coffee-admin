import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Col, Collapse, Input, Row, Space, Table, Tag, Tooltip, Avatar } from 'antd';
import axios from 'axios';
import { DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import Money from '../../components/Money'
import moment from 'moment';

export const Order = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState([])

    // Phân trang
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 4, // số mục hiển thị trên mỗi trang
    });

    const handleChangePagination = (page, pageSize) => {
        setPagination({
            ...pagination,
            current: page,
            pageSize: pageSize,
        });
    };


    const getAllOrder = async () => {
        try {
            const res = await axios.get("http://localhost:7000/order/getAllOrder");
            setData(res.data)

        } catch (e) {
            console.log("Err:", e)
        }
    }

    useEffect(() => {
        getAllOrder()
    }, [])



    const columns = [
        {
            title: 'STT',
            key: 'stt',
            width: 70,
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Thông tin người đặt',
            dataIndex: 'customer_name',
            key: 'customer_name',
            width: 200,
            render: (_, value) => <>
                <Row style={{ alignItems: 'center', justifyContent: 'space-between', width: 220 }}>
                    <Col>
                        <span>Tên: <b>{value.customer_name}</b></span>
                        <br />
                        <span>SĐT: <b>{value.customer_phone}</b></span>
                        <br />
                        <span>Địa chỉ: <b>{value.customer_address}</b></span>
                    </Col>
                </Row>

            </>
        },
        {
            title: 'Các sản phẩm đã đặt',
            dataIndex: 'order_products',
            key: 'order_products',
            width: 270,
            render: (value) => (
                <>
                    {value.map((orderProduct) => (
                        <>
                            {orderProduct.item.map((item) => (
                                <Col>
                                    <span>Tên sản phẩm: <b key={item} style={{ color: '#0C713D' }}>{item.name}</b> </span>
                                    <br />
                                    <span>Số lượng: <b key={item}>{item.quantity}</b></span>
                                </Col>
                            ))}
                            <br />
                            <b>Tổng số lượng: <b style={{ color: '#cf1322' }}>{orderProduct.quantity}</b></b>
                            <br />
                            <b>Thành tiền:  <Tag color='green'><Money value={orderProduct.price} /></Tag></b>
                        </>

                    ))
                    }
                </>
            ),
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'order_products',
            key: 'order_products',
            width: 250,
            render: (value) => (
                <Avatar.Group>
                    {value.map((orderProduct) => (
                        <>
                            {orderProduct.item.map((item) => (
                                <Avatar key={item} src={item.avatar} />
                            ))}
                        </>
                    ))}
                </Avatar.Group>
            )
        },
        {
            title: 'Mô tả',
            dataIndex: 'order_description',
            key: 'order_description',
            width: 250
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 200,
            render: (value) => (
                <Row style={{ alignItems: 'center', justifyContent: 'space-between', width: 220 }}>
                    <Col>
                        <span>Ngày: <b>{moment(value).format('YYYY-MM-DD')}</b></span>
                        <br />
                        <span>Giờ: <b>{moment(value).format('HH:mm:ss')}</b></span>
                    </Col>
                </Row>
            )
        },
        {
            title: 'Loại thanh toán',
            dataIndex: 'order_pay',
            key: 'order_pay',
            render: (value) => (
                <>
                    <Tag color={value === "1" ? 'green' : 'blue'}>
                        {value === "1" ? "Tiền mặt" : "Banking"}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Trạng thái đơn',
            key: 'order_status',
            dataIndex: 'order_status',
            render: (value) => (
                value.map((item) =>
                    <Tag key={item} color={item === "order" ? "red" : "blue"}>
                        {item === "order" ? "Đang xử lý..." : ""}
                    </Tag>
                )
            )
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip placement="top" title="Chi tiết">
                        <EyeTwoTone twoToneColor="#531dab" />
                    </Tooltip>
                    <Tooltip placement="top" title="Sửa" onClick={() => handleUpdate(record)} >
                        <EditTwoTone />
                    </Tooltip>
                    <Tooltip placement="top" title="Xóa">
                        <DeleteTwoTone twoToneColor="#f5222d" onClick={() => handleDelete(record)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];



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
            <Col className='col_wrapp'>
                <Collapse>
                    <Panel header="Tìm kiếm" key="1">
                        <Row>
                            <Col span={5} className="input">
                                <Input placeholder="Nhập cái gì đó đang tính..." />
                            </Col>
                        </Row>

                        {/* search */}
                        <Row justify="end" style={{ marginTop: "25px" }}>
                            <Button type="primary" ghost className='btn'>Tìm kiếm</Button>
                            <Button danger >Reset bộ lọc</Button>
                        </Row>

                    </Panel>
                </Collapse>
            </Col>

            <Col className='col_wrapp_title' style={{ padding: "30px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <h2>Danh sách đơn đặt hàng <Tag color="#4096ff">{data.length}</Tag></h2>
                    <Row>
                        <Button type="primary" icon={<ExportOutlined />} style={{ marginRight: "10px" }} >
                            Xuất file Excel
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} >
                            Thêm mới
                        </Button>

                    </Row>

                </Row>
            </Col>

            <Table className='table' columns={columns} dataSource={data} scroll={{ y: 480 }} pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: data.length,
                onChange: handleChangePagination
            }} />

        </>
    )
}
