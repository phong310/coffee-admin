import { DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone, PlusOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Collapse, Input, Row, Select, Space, Tag, Tooltip, Table, Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import "../../assets/CSS/Drinks.css"
import AddModal from '../../components/Users/addModals'
import UpdateModal from '../../components/Users/updateModals'
import { DeleteUser } from '../../components/Users/deleteModal'
import { ResetUser } from '../../components/Users/resetModals'
import axios from 'axios'
import moment from "moment"
import * as XLSX from 'xlsx';




export const Account = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [openReset, setOpenReset] = useState(false);
    const [itemUser, setItemUser] = useState()

    // Tìm kiếm
    const [emailSearch, setEmailSearch] = useState("");
    const [statuSearch, setStatusSearch] = useState("");
    const [roleSearch, setRoleSearch] = useState("")

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


    // Xuất file Excel
    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'data.xlsx');
    }

    const handleDelete = (record) => {
        setOpenDelete(true)
        setItemUser(record)
    }

    const handleUpdate = (rc) => {
        setOpenUpdate(true);
        setItemUser(rc)
    }

    const handleResetPassword = (rc) => {
        setOpenReset(true);
        setItemUser(rc)
    }

    const handleRoleSearch = (value) => {
        setRoleSearch(value)
    }

    const handleStatusSearch = (value) => {
        setStatusSearch(value)
    }

    const handleSearch = async () => {
        try {
            const result = await axios.get(`http://localhost:7000/user/search?email=${emailSearch}&role=${roleSearch}&status=${statuSearch}`)
            setData(result.data)

        } catch (e) {
            console.log("Err search", e)
        }
    }

    const resest_filter = () => {
        getDataUser();
        setEmailSearch("");
        setRoleSearch("");
        setStatusSearch("");
    }


    const columns = [
        {
            title: 'STT',
            key: 'stt',
            width: 100,
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            key: 'username',
            width: 350,
            render: (_, value) => <>
                <Row style={{ alignItems: 'center', justifyContent: 'space-between', width: 220 }}>
                    <Col>
                        <span>Tên: <b> {value.username}</b></span>
                        <br />
                        <span>Giới tính: <b>{value.sex}</b></span>
                        <br />
                        {value.address ? <span>Địa chỉ: <b>{value.address}</b></span> : null}
                        <p>Ngày sinh: <b>{moment(value.birthday).format('DD/MM/YYYY')}</b></p>
                    </Col>
                    <Col style={{ marginBottom: 15 }}>
                        <Avatar src={value.avatar} size={50} />
                    </Col>
                </Row>

            </>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 300
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
                    <Tooltip placement="top" title="Sửa" onClick={() => handleUpdate(record)} >
                        <EditTwoTone />
                    </Tooltip>
                    <Tooltip placement="top" title="Xóa">
                        <DeleteTwoTone twoToneColor="#f5222d" onClick={() => handleDelete(record)} />
                    </Tooltip>
                    <Tooltip placement="top" title="reset mật khẩu" onClick={() => handleResetPassword(record)}>
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
                        <Row>
                            <Col span={6} className="input">
                                <Input value={emailSearch} onChange={(e) => setEmailSearch(e.target.value)} placeholder="Nhập Email" />
                            </Col>
                            <Col span={5}>
                                <Select
                                    className='select'
                                    value={roleSearch}
                                    onChange={handleRoleSearch}

                                >
                                    <Select.Option value="">Nhóm quyền</Select.Option>
                                    <Select.Option value="ADMIN">ADMIN</Select.Option>
                                    <Select.Option value="USER">USER</Select.Option>
                                </Select>
                            </Col>
                            <Col span={5} style={{ marginLeft: "180px" }}>
                                <Select
                                    className='select'
                                    value={statuSearch}
                                    onChange={handleStatusSearch}

                                >
                                    <Select.Option value="">Trạng thái</Select.Option>
                                    <Select.Option value="active">Kích hoạt</Select.Option>
                                    <Select.Option value="inactive">Chưa kích hoạt</Select.Option>
                                </Select>
                            </Col>
                        </Row>

                        {/* search */}
                        <Row justify="end" style={{ marginTop: "25px" }}>
                            <Button type="primary" ghost className='btn' onClick={handleSearch} >Tìm kiếm</Button>
                            <Button danger onClick={resest_filter}>Reset bộ lọc</Button>
                        </Row>

                    </Panel>
                </Collapse>
            </Col>
            <Col className='col_wrapp_title' style={{ padding: "30px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <h2>Danh sách Tài khoản <Tag color="#4096ff">{data.length}</Tag></h2>
                    <Row>
                        <Button type="primary" icon={<ExportOutlined />} style={{ marginRight: "10px" }} onClick={() => exportToExcel(data)}>
                            Xuất file Excel
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                            Thêm mới
                        </Button>

                    </Row>

                </Row>
            </Col>
            {/* Table */}
            <Table className='table' columns={columns} dataSource={data} scroll={{ y: 502 }} />

            <AddModal data={open} setData={setOpen} getAll={getDataUser} />

            <DeleteUser open={openDelete} setOpen={setOpenDelete} item={itemUser} getAll={getDataUser} />

            <UpdateModal data={openUpdate} setData={setOpenUpdate} item={itemUser} getAll={getDataUser} />

            <ResetUser open={openReset} setOpen={setOpenReset} item={itemUser} getAll={getDataUser} />
        </>
    )
}
