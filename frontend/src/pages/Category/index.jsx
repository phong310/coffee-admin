import { DeleteTwoTone, EditTwoTone, EyeTwoTone, PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Collapse, Row, Space, Table, Tooltip, Select, Tag } from 'antd'
import React from 'react'
import "../../assets/CSS/Drinks.css"
import { Link } from 'react-router-dom'




export const Category = () => {
    const { Panel } = Collapse;

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            width: 100,
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Danh mục đang sử dụng',
            dataIndex: 'catename',
            key: 'catename',
            width: 500,
            render: (text) => <b>{text}</b>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 400,
            render: (text) => <b>{text}</b>,
        },
        {
            title: 'Điều hướng',
            dataIndex: 'direction',
            key: 'direction',
            render: (_, record) => {
                <Link to="/main/mangerment/drinks">Quản lý đồ uống</Link>
            },
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
                        <DeleteTwoTone twoToneColor="#f5222d" />
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
                    { path: '/managerment', breadcrumbName: 'Quản lý danh mục' },
                ]}
                separator="/"
                style={{
                    margin: '16px 3px',
                }}
            />

            <Col className='col_wrapp'>
                <Collapse>
                    <Panel header="Tìm kiếm" key="1">
                        <Row>
                            <Col span={5}>
                                <Select
                                    className='select'
                                >
                                    <Select.Option value="">Danh mục</Select.Option>
                                    <Select.Option value="ADMIN">ADMIN</Select.Option>
                                    <Select.Option value="USER">USER</Select.Option>
                                </Select>
                            </Col>
                        </Row>

                        {/* search */}
                        <Row justify="end" style={{ marginTop: "25px" }}>
                            <Button type="primary" ghost className='btn' >Tìm kiếm</Button>
                            <Button danger >Reset bộ lọc</Button>
                        </Row>

                    </Panel>
                </Collapse>
            </Col>
            <Col className='col_wrapp_title' style={{ padding: "30px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <h2>Danh sách danh mục <Tag color="#4096ff">0</Tag></h2>
                    <Button type="primary" icon={<PlusOutlined />} >
                        Thêm mới
                    </Button>
                </Row>
            </Col>

            {/* Table */}
            <Table className='table' columns={columns} />

        </>
    )
}
