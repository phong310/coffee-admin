import { DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Collapse, Row, Select, Space, Table, Tag, Tooltip } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AddPermission } from '../../components/Permission/addModal';
import { DeletePermission } from '../../components/Permission/deleteModal';
import { UpdatePermission } from '../../components/Permission/updateModal';
import * as XLSX from 'xlsx'

export default function Permission() {
    const { Panel } = Collapse;
    const [data, setData] = useState([]);
    const [dataFilter, setDataFilter] = useState([])
    const [itemPer, setItemPer] = useState()
    const [openAdd, setOpenAdd] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false);

    // Tìm kiếm
    const [nameDisplaySearch, setNameDisplaySearch] = useState();
    const [statuSearch, setStatuSearch] = useState()

    const handleNameDisplaySearch = (value) => {
        setNameDisplaySearch(value)
    }

    const handleStatusSearch = (value) => {
        setStatuSearch(value)
    }

    const handleSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:7000/permission/search?per_name_display=${nameDisplaySearch || ""}&per_status=${statuSearch || ""}`)
            setDataFilter(res.data)
        } catch (e) {
            console.log("Err: ", e)
        }
    }

    const getDataPermission = async () => {
        try {
            const res = await axios.get("http://localhost:7000/permission/getAllPermission");
            setData(res.data);
            setDataFilter(res.data)

        } catch (e) {
            console.log("Err:", e)
        }
    };

    useEffect(() => {
        getDataPermission()
    }, [])

    // Xuất file Excel
    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'data.xlsx');
    }

    const resest_filter = () => {
        getDataPermission();
        setNameDisplaySearch();
        setStatuSearch();
    }

    const handleDelete = (record) => {
        setOpenDelete(true)
        setItemPer(record)
    }

    const handleUpdate = (record) => {
        setOpenUpdate(true);
        setItemPer(record)
    }

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            width: 130,
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Tên quyền',
            dataIndex: 'per_name',
            key: 'per_name',
            render: (name) => <b><i>{name}</i></b>

        },
        {
            title: 'Tên quyền hiển thị',
            dataIndex: 'per_name_display',
            key: 'per_name_display',
            render: (role) => {
                return <Tag color='purple'>{role}</Tag>
            }
        },
        {
            title: 'Mô tả chi tiết',
            dataIndex: 'per_description',
            key: 'per_description',
            width: 500,

        },
        {
            title: 'Trạng thái',
            key: 'per_status',
            dataIndex: 'per_status',
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
                    { path: '/mangerment/permisstion', breadcrumbName: 'Tạo quyền' }]}
                separator="/"
                style={{
                    margin: '16px 3px',
                }}
            />
            <Col className='col_wrapp'>
                <Collapse>
                    <Panel header="Tìm kiếm" key="1">
                        <Row>
                            <Col span={3}>
                                <Select
                                    className='select'
                                    placeholder="Tên quyền hiển thị"
                                    value={nameDisplaySearch}
                                    onChange={handleNameDisplaySearch}
                                >
                                    {data.map((item) =>
                                        <Select.Option key={item._id} value={item.per_name_display}>{item.per_name_display}</Select.Option>
                                    )}
                                </Select>
                            </Col>
                            <Col span={5} style={{ marginLeft: '310px' }}>
                                <Select
                                    className='select'
                                    placeholder="Trạng thái"
                                    value={statuSearch}
                                    onChange={handleStatusSearch}

                                >
                                    <Select.Option value="active">Kích hoạt</Select.Option>
                                    <Select.Option value="inactive">Chưa kích hoạt</Select.Option>
                                </Select>
                            </Col>
                        </Row>

                        {/* search */}
                        <Row justify="end" style={{ marginTop: "25px" }}>
                            <Button type="primary" ghost className='btn' onClick={handleSearch}>Tìm kiếm</Button>
                            <Button danger onClick={resest_filter}>Reset bộ lọc</Button>
                        </Row>

                    </Panel>
                </Collapse>
            </Col>
            <Col className='col_wrapp_title' style={{ padding: "30px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <h2>Danh sách các quyền <Tag color="#4096ff">{dataFilter.length}</Tag></h2>
                    <Row>
                        <Button type="primary" icon={<ExportOutlined />} style={{ marginRight: "10px" }} onClick={() => exportToExcel(dataFilter)}>
                            Xuất file Excel
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenAdd(true)}>
                            Thêm mới các quyền
                        </Button>

                    </Row>

                </Row>
            </Col>

            <Table className='table' columns={columns} dataSource={dataFilter} scroll={{ y: 502 }} />

            <AddPermission open={openAdd} setOpen={setOpenAdd} getAll={getDataPermission} />

            <DeletePermission open={openDelete} setOpen={setOpenDelete} item={itemPer} getAll={getDataPermission} />

            <UpdatePermission open={openUpdate} setOpen={setOpenUpdate} item={itemPer} getAll={getDataPermission} />
        </>
    )
}
