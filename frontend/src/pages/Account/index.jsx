import { DeleteTwoTone, EditTwoTone, EyeTwoTone, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Collapse, Input, Row, Select, Space, Tag, Tooltip, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import "../../assets/CSS/Drinks.css"
import AddModal from '../../components/Users/addModals'
import { DeleteUser } from '../../components/Users/deleteModal'
import axios from 'axios'




export const Account = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false)
    const [itemUser, setItemUser] = useState()

    // Tìm kiếm
    const [titleSearch, setTitleSearch] = useState("");
    const [statuSearch, setStatusSearch] = useState("");

    const getDataUser = async () => {
        try {
            const res = await axios.get("http://localhost:7000/user/getAllUser")
            setData(res.data)

        } catch (e) {
            console.log("Err:", e)
        }
    }

    useEffect(() => {
        getDataUser()
    }, [])


    const handleDelete = (record) => {
        setOpenDelete(true)
        setItemUser(record)
    }



    const columns = [
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <b>{text}</b>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Nhóm quyền',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                return <Tag color={role === 'ADMIN' ? '#d3adf7' : '#87e8de'}>{role}</Tag>
            }
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => (
                <>
                    <Tag color={status === 'active' ? 'green' : 'red'}>
                        {status === "active" ? "Kích hoạt" : "Chưa kích hoạt"}
                    </Tag>
                </>
            ),
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
                        <DeleteTwoTone twoToneColor="#f5222d" onClick={() => handleDelete(record)} />
                    </Tooltip>
                    <Tooltip placement="top" title="reset mật khẩu">
                        <ReloadOutlined />
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
                    { path: '/managerment', breadcrumbName: 'Quản lý tài khoản' },
                    { path: '/mangerment/account', breadcrumbName: 'Tài khoản' }]}
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
                                <Input value={titleSearch} onChange={(e) => setTitleSearch(e.target.value)} placeholder="Tên tài khoản" />
                            </Col>
                            <Col span={7}>
                                <Select
                                    className='select'
                                    value={statuSearch}

                                >
                                    <Select.Option value="">Tất cả</Select.Option>
                                    <Select.Option value="active">Kích hoạt</Select.Option>
                                    <Select.Option value="inactive">Chưa kích hoạt</Select.Option>
                                </Select>
                            </Col>
                        </Row>

                        {/* search */}
                        <Row justify="end">
                            <Button type="primary" ghost className='btn' >Tìm kiếm</Button>
                            <Button danger>Reset bộ lọc</Button>
                        </Row>

                    </Panel>
                </Collapse>
            </Col>
            <Col className='col_wrapp_title' style={{ padding: "30px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <h2>Danh sách Tài khoản <Tag color="#4096ff">{data.length}</Tag></h2>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                        Thêm mới
                    </Button>
                </Row>
            </Col>
            {/* Table */}
            <Table className='table' columns={columns} dataSource={data} />

            <AddModal data={open} setData={setOpen} getAll={getDataUser} />

            <DeleteUser open={openDelete} setOpen={setOpenDelete} item={itemUser} getAll={getDataUser} />
        </>
    )
}
