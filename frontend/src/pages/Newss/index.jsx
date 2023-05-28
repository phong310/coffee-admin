import { CoffeeOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone, FireOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Collapse, Image, Input, Row, Select, Space, Table, Tabs, Tag, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllNews } from '../../API/apiRequest';
import AddModal from '../../components/Newss/addModal';
import { DeleteNewInfor } from '../../components/Newss/deleteModal';
import UpdateModal from '../../components/Newss/updateModal';


export default function Newss() {
    const { Panel } = Collapse;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [openDel, setOpenDel] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [item, setItem] = useState()
    const [dataTea, setDataTea] = useState([])
    const [dataCoffee, setDataCoffee] = useState([])

    // Kích hoạt effect
    const [trigger, setTrigger] = useState(false)

    // lấy thông tin store redux
    const user = useSelector((state) => state.auth.login?.currentUser)
    const NewsList = useSelector((state) => state.newsList.news?.allNews)





    const getData = async () => {
        getAllNews(dispatch, navigate)
    }

    const handleDelete = (record) => {
        setOpenDel(true)
        setItem(record)
    }

    const handleUpdate = (record) => {
        setOpenUpdate(true)
        setItem(record)
        setTrigger(!trigger)
    }

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
        getData()
    }, [])

    useEffect(() => {
        setData(NewsList)

        // Lọc Tea
        const listTea = NewsList.filter((item) => {
            if (item.titleNews === "TEA") {
                return item
            }
        })
        setDataTea(listTea)

        // Lọc coffee
        const listCoffee = NewsList.filter((item) => {
            if (item.titleNews === "CAFE") {
                return item
            }
        })
        setDataCoffee(listCoffee)
    }, [NewsList])


    const colums = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'titleNews',
            key: 'titleNews',
            width: 180,
            render: (_, { titleNews }) => (
                <>
                    <Tag color={titleNews === 'TEA' ? 'green' : 'tan'}>
                        {titleNews === "CAFE" ? "Hạt cà phê" : "Lá trà"}
                    </Tag>
                </>
            )
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'imgNews',
            key: 'imgNews',
            render: (item) => <Image
                width={150}
                src={item}
            />
        },
        {
            title: 'Nội dung',
            dataIndex: 'contentNews',
            key: 'contentNews',
            width: 700,
        },
        {
            title: 'Trạng thái',
            key: 'statusNews',
            dataIndex: 'statusNews',
            render: (_, { statusNews }) => (
                <>
                    <Tag color={statusNews === 'active' ? 'green' : 'red'}>
                        {statusNews === "active" ? "Kích hoạt" : "Chưa kích hoạt"}
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
                    <Tooltip placement="top" title="Sửa">
                        <EditTwoTone onClick={() => handleUpdate(record)} />
                    </Tooltip>
                    <Tooltip placement="top" title="Xóa">
                        <DeleteTwoTone twoToneColor="#f5222d" onClick={() => handleDelete(record)} />
                    </Tooltip>
                </Space>
            ),
        },
    ]


    return (
        <>
            <Breadcrumb
                routes={[
                    { path: '/', breadcrumbName: "Home" },
                    { path: '/managerment', breadcrumbName: 'Quản lý hệ thống' },
                    { path: '/mangerment/drinks', breadcrumbName: 'Thông tin sản phẩm' }]}
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
                                    placeholder="Trạng thái"

                                >
                                    <Select.Option value="active">Kích hoạt</Select.Option>
                                    <Select.Option value="inactive">Chưa kích hoạt</Select.Option>
                                </Select>
                            </Col>
                        </Row>

                        {/* search */}
                        <Row justify="end">
                            <Button type="primary" ghost className='btn' >Tìm kiếm</Button>
                            <Button danger >Reset bộ lọc</Button>
                        </Row>
                    </Panel>
                </Collapse>
            </Col>
            <Col className='col_wrapp_title' style={{ padding: "30px 0px 10px 0px" }}>
                <Row justify="space-between">
                    <h2>Danh sách nguyên liệu sản phẩm <Tag color="#4096ff">{data.length}</Tag></h2>
                    <Row>
                        <Button type="primary" icon={<ExportOutlined />} style={{ marginRight: "10px" }} >
                            Xuất file Excel
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenAdd(true)}>
                            Thêm mới
                        </Button>
                    </Row>
                </Row>
            </Col>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: (
                            <span>
                                <CoffeeOutlined />
                                Cà phê
                                <Tag color="#4096ff" style={{ marginLeft: 5 }}>{dataCoffee.length}</Tag>
                            </span>
                        ),
                        key: "1",
                        children: <Table className='table' columns={colums} dataSource={dataCoffee} scroll={{ y: 502 }} />
                        ,
                    },
                    {
                        label: (
                            <span>
                                <FireOutlined />
                                Trà
                                <Tag color="#4096ff" style={{ marginLeft: 5 }}>{dataTea.length}</Tag>
                            </span>
                        ),
                        key: "2",
                        children: <Table className='table' columns={colums} dataSource={dataTea} scroll={{ y: 502 }} />,
                    }
                ]}
            />

            <AddModal data={openAdd} setData={setOpenAdd} getAll={getData} />

            <DeleteNewInfor open={openDel} setOpen={setOpenDel} item={item} getAll={getData} />

            <UpdateModal data={openUpdate} setData={setOpenUpdate} getAll={getData} item={item} trigger={trigger} />
        </>
    )
}
