import { DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone } from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Col, Collapse, Input, Row, Select, Space, Table, Tag, Tooltip } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Money from '../../components/Money';
import { DeleteOrder } from '../../components/Order/deleteModal';
import { DetailOrder } from '../../components/Order/detailModal';
import { UpdateOrder } from '../../components/Order/updateModal';

export const Order = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState([])
    const [openDelete, setOpenDelete] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [itemOrder, setItemOrder] = useState()

    const handleDeleteOrder = (value) => {
        setItemOrder(value)
        setOpenDelete(true)
    }

    const handleDetailOrder = (value) => {
        setItemOrder(value)
        setOpenDetail(true)
    }

    const handleUpdateOrder = (value) => {
        setItemOrder(value)
        setOpenUpdate(true)
    }

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
            render: (text, record, index) => <span>{(pagination.current - 1) * pagination.pageSize + index + 1}</span>,
        },
        {
            title: 'Thông tin người đặt',
            dataIndex: 'customer_name',
            key: 'customer_name',
            width: 250,
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
            width: 300,
            render: (value) => (
                <>
                    {value.map((orderProduct, index) => (
                        <Col key={index}>
                            {orderProduct.item.map((item, idx) => (
                                <>
                                    <Col key={idx}>
                                        <span>Tên sản phẩm: <b style={{ color: '#0C713D' }}>{item.name}</b> </span>
                                        <br />
                                        <span>Kích cỡ: <b>{item.size?.join(', ')}</b></span>
                                        <br />
                                        <span>Số lượng: <b>{item.quantity}</b></span>
                                        <br />
                                        <span>Ghi chú sản phẩm: <b>{item.note}</b></span>
                                    </Col>
                                    <br />
                                </>

                            ))}
                            <br />
                            <b>Tổng số lượng: <b style={{ color: '#cf1322' }}>{orderProduct.quantity}</b></b>
                            <br />
                            <b>Thành tiền:  <Tag color='green'><Money value={orderProduct.price} /></Tag></b>
                        </Col>

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
                            {orderProduct.item.map((item, idx) => (
                                <Avatar key={idx} src={item.avatar} />
                            ))}
                        </>
                    ))}
                </Avatar.Group>
            )
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 180,
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
                value.map((item, idx) =>
                    <Tag key={idx} color={item === "order" ? "red" : "purple"}>
                        {item === "order" ? "Đang xử lý..." : "Thành công"}
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
                        <EyeTwoTone twoToneColor="#531dab" onClick={() => handleDetailOrder(record)} />
                    </Tooltip>
                    <Tooltip placement="top" title="Sửa" onClick={() => handleUpdateOrder(record)} >
                        <EditTwoTone />
                    </Tooltip>
                    <Tooltip placement="top" title="Xóa">
                        <DeleteTwoTone twoToneColor="#f5222d" onClick={() => handleDeleteOrder(record)} />
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
                        <Row >
                            <Col span={5} className="input">
                                <Input placeholder="Nhập tên khách hàng" />
                            </Col>
                            <Col span={5} className="input">
                                <Input placeholder="Nhập tên sản phẩm" />
                            </Col>
                            <Col span={5} className="input">
                                <Select
                                    className='select'
                                    style={{ width: 400 }}
                                    placeholder="Hình thức thanh toán"
                                >
                                    <Select.Option value="active">Tiền mặt</Select.Option>
                                    <Select.Option value="inactive">Banking</Select.Option>
                                </Select>
                            </Col>
                            <Col span={5} className="input">
                                <Select
                                    className='select'
                                    style={{ width: 400, marginLeft: 60 }}
                                    placeholder="Trạng thái đơn"
                                >
                                    <Select.Option value="order">Đang xử lý</Select.Option>
                                    <Select.Option value="transport">Đang vận chuyển</Select.Option>
                                    <Select.Option value="success">Đã giao hàng</Select.Option>
                                </Select>
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
                        {/* <Button type="primary" icon={<PlusOutlined />} >
                            Thêm mới
                        </Button> */}

                    </Row>

                </Row>
            </Col>

            <Table className='table' columns={columns} dataSource={data} scroll={{ y: 480 }} pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: data.length,
                onChange: handleChangePagination
            }} />

            <DeleteOrder open={openDelete} setOpen={setOpenDelete} item={itemOrder} getAll={getAllOrder} />

            <DetailOrder open={openDetail} setOpen={setOpenDetail} item={itemOrder} />

            <UpdateOrder open={openUpdate} setOpen={setOpenUpdate} getAll={getAllOrder} item={itemOrder} />

        </>
    )
}
