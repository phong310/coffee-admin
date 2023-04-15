import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Col, Collapse, Input, Row, Select, Space, Table, Tooltip, Tag, Image } from 'antd';
import { DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import AddModal from '../../components/Bakerys/addModal';
import { DeleteBakery } from '../../components/Bakerys/deleteModal';
import UpdateModal from '../../components/Bakerys/updateModal';
import Money from '../../components/Money';
import axios from "axios";
import * as XLSX from 'xlsx';

export const Bakery = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [item, setItem] = useState()


    // Tìm kiếm
    const [titleSearch, setTitleSearch] = useState("");
    const [statuSearch, setStatusSearch] = useState("");

    const getAllBakery = async () => {
        try {
            const res = await axios.get("http://localhost:7000/bakery/getAllBakery")
            setData(res.data)

        } catch (e) {
            console.log("Err", e)
        }
    }

    useEffect(() => {
        getAllBakery()
    }, [])

    const HandleSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:7000/bakery/search?title=${titleSearch}&status=${statuSearch}`)
            setData(res.data)
        } catch (e) {
            console.log("Err search: ", e)
        }
    }

    // Xuất file Excel
    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'Sheet.xlsx');
    }



    const handleDelete = (record) => {
        setOpenDelete(true)
        setItem(record)
    }

    const handleUpdate = (record) => {
        setOpenUpdate(true)
        setItem(record)
    }

    const resest_filter = () => {
        setTitleSearch("");
        setStatusSearch("")
        getAllBakery()
    }

    const handleStatusSearch = (value) => {
        setStatusSearch(value)
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
            width: 400
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
            title: 'Chức năng',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip placement="top" title="Chi tiết">
                        <EyeTwoTone twoToneColor="#531dab" />
                    </Tooltip>
                    <Tooltip placement="top" title="Sửa" onClick={() => handleUpdate(record)}>
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
                    { path: '', breadcrumbName: 'Quản lý hệ thống' },
                    { path: '/managerment/bakery', breadcrumbName: 'Bánh' }]}
                separator="/"
                style={{
                    margin: '16px 0',
                }}
            />
            <Col className='col_wrapp'>
                <Collapse>
                    <Panel header="Tìm kiếm" key="1">
                        <Row >
                            <Col span={7} className="input">
                                <Input value={titleSearch} onChange={(e) => setTitleSearch(e.target.value)} placeholder="Tên sản phẩm" />
                            </Col>
                            <Col span={7}>
                                <Select
                                    className='select'
                                    value={statuSearch}
                                    onChange={handleStatusSearch}

                                >
                                    <Select.Option value="">Tất cả</Select.Option>
                                    <Select.Option value="active">Còn hàng</Select.Option>
                                    <Select.Option value="inactive">Hết hàng</Select.Option>
                                </Select>
                            </Col>
                        </Row>

                        {/* search */}
                        <Row justify="end">
                            <Button type="primary" ghost className='btn' onClick={HandleSearch}>Tìm kiếm</Button>
                            <Button danger onClick={resest_filter}>Reset bộ lọc</Button>
                        </Row>

                    </Panel>
                </Collapse>
            </Col>
            <Col className='col_wrapp_title' style={{ padding: "30px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <h2>Danh sách các loại bánh <Tag color="#4096ff">{data.length}</Tag></h2>
                    <Row>
                        <Button type="primary" icon={<ExportOutlined />} style={{ marginRight: "10px" }} onClick={() => exportToExcel(data)}>
                            Xuất file Excel
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenAdd(true)}>
                            Thêm mới
                        </Button>
                    </Row>

                </Row>
            </Col>

            {/* Table */}
            <Table className='table' columns={columns} dataSource={data} scroll={{ y: 502 }} />

            <AddModal data={openAdd} setData={setOpenAdd} getAll={getAllBakery} />

            <DeleteBakery open={openDelete} setOpen={setOpenDelete} item={item} getAll={getAllBakery} />

            <UpdateModal data={openUpdate} setData={setOpenUpdate} getAll={getAllBakery} item={item} />

        </>
    )
}
