import React, { useState } from 'react'
import "../../assets/CSS/Drinks.css"
import AddModal from '../../components/Drinks/addModal'
import { DeleteDrink } from '../../components/Drinks/deleteModal'
import { useEffect } from 'react'
import { Breadcrumb } from 'antd'
import axios from "axios";
import { Col, Collapse, Input, Row, Select, Button, Space, Table, Tag, Tooltip, Image } from 'antd';
import { PlusOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import Money from '../../components/Money'




export const Drinks = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false)

    const [Item, setItem] = useState()


    const getData = async () => {
        try {
            const res = await axios.get("http://localhost:7000/drinks/getAll");
            setData(res.data)

        } catch (e) {
            console.log("Err:", e)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleDelete = (record) => {
        setOpenDelete(true)
        setItem(record)
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <b>{text}</b>,
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'img',
            key: 'img',
            render: (item) => <Image
                width={70}
                src={item}
            />
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price',
            key: 'price',
            render: (value) => <Money value={value} />
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 300
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => (
                <>
                    <Tag color={status === 'active' ? 'green' : 'red'}>
                        {status === "active" ? "Còn hàng" : "Hết hàng"}
                    </Tag>
                </>
            ),
        },
        {
            title: "Số lượng",
            key: "quantity",
            dataIndex: "quantity"
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip placement="top" title="Chi tiết">
                        <EyeTwoTone twoToneColor="#531dab" />
                    </Tooltip>
                    <Tooltip placement="top" title="Sửa" >
                        <EditTwoTone />
                    </Tooltip>
                    <Tooltip placement="top" title="Xóa">
                        <DeleteTwoTone twoToneColor="#f5222d" onClick={() => { handleDelete(record) }} />
                    </Tooltip>
                </Space>
            ),
        },
    ];


    return (
        <>
            <Breadcrumb
                routes={[
                    { path: '/', breadcrumbName: "Home" },
                    { path: '/managerment', breadcrumbName: 'Quản lý hệ thống' },
                    { path: '/mangerment/drinks', breadcrumbName: 'Đồ uống' }]}
                separator="/"
                style={{
                    margin: '16px 3px',
                }}
            />
            <Col className='col_wrapp'>
                <Collapse>
                    <Panel header="Tìm kiếm" key="1">
                        <Row >
                            <Col span={7} className="input">
                                <Input placeholder="Tên sản phẩm" />
                            </Col>
                            <Col span={7}>
                                <Select
                                    className='select'
                                    value=""

                                >
                                    <Select.Option value="">Tất cả</Select.Option>
                                    <Select.Option value="active">Còn hàng</Select.Option>
                                    <Select.Option value="inactive">Hết hàng</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row justify="end">
                            <Button type="primary" ghost className='btn' >Tìm kiếm</Button>
                            <Button danger>Reset bộ lọc</Button>
                        </Row>

                    </Panel>
                </Collapse>
            </Col>
            <Col className='col_wrapp_title' style={{ padding: "30px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <h2>Danh sách đồ uống <Tag color="#4096ff">{data.length}</Tag></h2>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                        Thêm mới
                    </Button>
                </Row>
            </Col>

            {/* Table */}
            <Table className='table' columns={columns} dataSource={data} scroll={{ y: 502 }} />

            <AddModal data={open} setData={setOpen} getAll={getData} />

            <DeleteDrink open={openDelete} setOpen={setOpenDelete} item={Item} getAll={getData} />
        </>
    )
}
