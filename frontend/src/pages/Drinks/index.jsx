import { DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Collapse, Image, Input, Row, Select, Space, Table, Tag, Tooltip } from 'antd'
import axios from "axios"
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import "../../assets/CSS/Drinks.css"
import AddModal from '../../components/Drinks/addModal'
import { DeleteDrink } from '../../components/Drinks/deleteModal'
import { DetailDrinks } from '../../components/Drinks/detailModal'
import UpdateModal from '../../components/Drinks/updateModal'
import Money from '../../components/Money'




export const Drinks = () => {
    const { Panel } = Collapse;
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [Item, setItem] = useState()

    // Phân trang
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5, // số mục hiển thị trên mỗi trang
    });

    const handleChangePagination = (page, pageSize) => {
        setPagination({
            ...pagination,
            current: page,
            pageSize: pageSize,
        });
    };


    // Tìm kiếm
    const [titleSearch, setTitleSearch] = useState("");
    const [statuSearch, setStatusSearch] = useState("");


    const HandleSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:7000/drinks/search?title=${titleSearch}&status=${statuSearch}`)
            setData(res.data)
        } catch (e) {
            console.log("Err search: ", e)
        }
    }

    const resest_filter = () => {
        setTitleSearch("");
        setStatusSearch("")
        getData()
    }

    const handleStatusSearch = (value) => {
        setStatusSearch(value)
    }



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
    }, []);

    // Xuất file Excel
    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'Sheet.xlsx');
    }

    const handleDetail = (record) => {
        setOpenDetail(true)
        setItem(record)
    }

    const handleDelete = (record) => {
        setOpenDelete(true)
        setItem(record)
    }

    const handleUpdate = (record) => {
        setOpenUpdate(true)
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
                        <EyeTwoTone twoToneColor="#531dab" onClick={() => { handleDetail(record) }} />
                    </Tooltip>
                    <Tooltip placement="top" title="Sửa" >
                        <EditTwoTone onClick={() => { handleUpdate(record) }} />
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
                    <h2>Danh sách đồ uống <Tag color="#4096ff">{data.length}</Tag></h2>
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
            <Table className='table' columns={columns} dataSource={data} scroll={{ y: 502 }} pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: data.length,
                onChange: handleChangePagination
            }} />


            <AddModal data={open} setData={setOpen} getAll={getData} />

            <DeleteDrink open={openDelete} setOpen={setOpenDelete} item={Item} getAll={getData} />

            <UpdateModal data={openUpdate} setData={setOpenUpdate} getAll={getData} item={Item} />

            <DetailDrinks open={openDetail} setOpen={setOpenDetail} item={Item} />
        </>
    )
}
