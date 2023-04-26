import { DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Collapse, Row, Select, Space, Table, Tag, Tooltip } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import "../../assets/CSS/Drinks.css"
import { AddRole } from '../../components/Role/addModal'
import { UpdateRole } from '../../components/Role/updateModal'
import { DeleteRole } from '../../components/Role/deleteModal'




export const Role = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState([])
    const [openAdd, setOpenAdd] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false)
    const [itemRole, setItemRole] = useState()


    // Tìm kiếm
    const [roleSearch, setRoleSearch] = useState("")

    const getDataRoles = async () => {
        try {
            const res = await axios.get("http://localhost:7000/roles/getAllRole")
            setData(res.data)

        } catch (e) {
            console.log("Err:", e)
        }
    }

    useEffect(() => {
        getDataRoles()
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
        setItemRole(record)
    }

    const handleUpdate = (rc) => {
        setOpenUpdate(true);
        setItemRole(rc)
    }



    const handleRoleSearch = (value) => {
        setRoleSearch(value)
    }



    const resest_filter = () => {
        getDataRoles();
        setRoleSearch("");
    }


    const columns = [
        {
            title: 'STT',
            key: 'stt',
            width: 250,
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Nhóm quyền',
            dataIndex: 'role_name',
            key: 'role_name',
            render: (role) => {
                return <Tag color={role === 'DIRECTOR' ? '#f5222d' : '#87e8de'}>{role}</Tag>
            }
        },
        {
            title: 'Mô tả chi tiết',
            dataIndex: 'role_description',
            key: 'role_description',
            width: 400,

        },
        {
            title: 'Trạng thái',
            key: 'role_status',
            dataIndex: 'role_status',
            render: (status) => (
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
                    {/* <Tooltip placement="top" title="Chi tiết">
                        <EyeTwoTone twoToneColor="#531dab" />
                    </Tooltip> */}
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
                    { path: '/', breadcrumbName: "Home" },
                    { path: '/managerment', breadcrumbName: 'Quản lý tài khoản' },
                    { path: '/mangerment/account', breadcrumbName: 'Nhóm quyền' }]}
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
                                    value={roleSearch}
                                    onChange={handleRoleSearch}

                                >
                                    <Select.Option value="">Nhóm quyền</Select.Option>
                                    <Select.Option value="ADMIN">ADMIN</Select.Option>
                                    <Select.Option value="USER">USER</Select.Option>
                                </Select>
                            </Col>
                        </Row>

                        {/* search */}
                        <Row justify="end" style={{ marginTop: "25px" }}>
                            <Button type="primary" ghost className='btn' >Tìm kiếm</Button>
                            <Button danger onClick={resest_filter}>Reset bộ lọc</Button>
                        </Row>

                    </Panel>
                </Collapse>
            </Col>
            <Col className='col_wrapp_title' style={{ padding: "30px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <h2>Danh sách nhóm quyền <Tag color="#4096ff">{data.length}</Tag></h2>
                    <Row>
                        <Button type="primary" icon={<ExportOutlined />} style={{ marginRight: "10px" }} onClick={() => exportToExcel(data)}>
                            Xuất file Excel
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenAdd(true)}>
                            Thêm mới nhóm quyền
                        </Button>

                    </Row>

                </Row>
            </Col>
            {/* Table */}
            <Table className='table' columns={columns} dataSource={data} scroll={{ y: 502 }} />

            <AddRole open={openAdd} setOpen={setOpenAdd} getAll={getDataRoles} />

            <UpdateRole open={openUpdate} setOpen={setOpenUpdate} item={itemRole} getAll={getDataRoles} />

            <DeleteRole open={openDelete} setOpen={setOpenDelete} item={itemRole} getAll={getDataRoles} />


        </>
    )
}
