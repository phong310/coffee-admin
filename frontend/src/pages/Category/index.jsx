import { DeleteTwoTone, EditTwoTone, EyeTwoTone, PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Collapse, Input, Row, Space, Table, Tag, Tooltip } from 'antd'
import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../../assets/CSS/Drinks.css"
import { AddModals } from '../../components/Category/addModal'
import { UpdateModals } from '../../components/Category/updateModal'
import { DeleteCate } from '../../components/Category/deleteModal'




export const Category = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState([])
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [CateSearch, setCateSearch] = useState("")
    const [item, setItem] = useState()

    const getAll = async () => {
        try {
            const res = await axios.get("http://localhost:7000/category/getAllCate")
            setData(res.data)
        } catch (e) {
            console.log('ERR:', e)
        }
    }

    const handleSearch = async () => {
        try {
            const result = await axios.get(`http://localhost:7000/category/search?catename=${CateSearch}`)
            setData(result.data)

        } catch (e) {
            console.log('ERR:', e)
        }
    }

    const resest_filter = () => {
        getAll();
        setCateSearch("")
    }

    useEffect(() => {
        getAll()
    }, [])

    const handleAdd = () => {
        setOpenAddModal(true)
    }

    const handleUpdate = (record) => {
        setOpenUpdate(true)
        setItem(record)
    }

    const handleDelete = (rc) => {
        setOpenDelete(true);
        setItem(rc)
    }


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
            width: 300,
            render: (text) => {
                return <Tag color="#0c713d">
                    <b>{text}</b>
                </Tag>
            }
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 700,
        },
        {
            title: 'Điều hướng',
            dataIndex: 'direction',
            key: 'direction',
            render: (_, record) => {
                return (
                    <Link to={`/main/mangerment/${record.title}`}>
                        Quản lý {record.catename}
                    </Link>
                )
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
                        <EditTwoTone onClick={() => handleUpdate(record)} />
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
                        <Row justify="space-between">
                            <Col span={6} className="input">
                                <Input value={CateSearch} onChange={(e) => setCateSearch(e.target.value)} placeholder="Nhập tên danh mục" />
                            </Col>
                            <Col>
                                <Button type="primary" ghost className='btn' onClick={handleSearch}>Tìm kiếm</Button>
                                <Button danger onClick={resest_filter}>Reset bộ lọc</Button>
                            </Col>

                        </Row>
                    </Panel>
                </Collapse>
            </Col>
            <Col className='col_wrapp_title' style={{ padding: "30px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <h2>Danh sách danh mục <Tag color="#4096ff">{data.length}</Tag></h2>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                        Thêm mới
                    </Button>
                </Row>
            </Col>

            {/* Table */}
            <Table className='table' columns={columns} dataSource={data} />

            <AddModals open={openAddModal} setOpen={setOpenAddModal} getAll={getAll} />

            <UpdateModals open={openUpdate} setOpen={setOpenUpdate} getAll={getAll} item={item} />

            <DeleteCate open={openDelete} setOpen={setOpenDelete} getAll={getAll} item={item} />

        </>
    )
}
