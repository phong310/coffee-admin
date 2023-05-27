import { DeleteTwoTone, EditTwoTone, ExportOutlined, EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Collapse, Input, Row, Select, Space, Table, Tag, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllNews } from '../../API/apiRequest';

export default function Newss() {
    const { Panel } = Collapse;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // lấy thông tin store redux
    const user = useSelector((state) => state.auth.login?.currentUser)
    const NewsList = useSelector((state) => state.newsList.news?.allNews)
    const [data, setData] = useState([])

    const getData = async () => {
        getAllNews(dispatch, navigate)
    }

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
        getData()
    }, [])

    useEffect(() => { setData(NewsList) }, [NewsList])

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
            // render: (item) => <Image
            //     width={70}
            //     src={item}
            // />
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
                        <DeleteTwoTone twoToneColor="#f5222d" />
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

                                >
                                    <Select.Option value="">Tất cả</Select.Option>
                                    <Select.Option value="active">Còn hàng</Select.Option>
                                    <Select.Option value="inactive">Hết hàng</Select.Option>
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
                    <h2>Danh sách nguyên liệu sản phẩm <Tag color="#4096ff">0</Tag></h2>
                    <Row>
                        <Button type="primary" icon={<ExportOutlined />} style={{ marginRight: "10px" }} >
                            Xuất file Excel
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                            Thêm mới
                        </Button>
                    </Row>
                </Row>
            </Col>

            <Table className='table' columns={colums} dataSource={data} scroll={{ y: 502 }} />
        </>
    )
}
