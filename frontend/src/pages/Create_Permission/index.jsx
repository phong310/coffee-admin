import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Collapse, Row, Select, Tag } from 'antd'
import React from 'react'

export default function Permission() {
    const { Panel } = Collapse;
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
                                {/* <Select
                                    className='select'
                                    placeholder="Nhóm quyền"
                                    value={roleSearch}
                                    onChange={handleRoleSearch}
                                >
                                    {data.map((item) =>
                                        <Select.Option key={item._id} value={item.role_name}>{item.role_name}</Select.Option>
                                    )}
                                </Select> */}
                            </Col>
                            <Col span={5} style={{ marginLeft: '320px' }}>
                                {/* <Select
                                    className='select'
                                    placeholder="Trạng thái"
                                    value={roleStatuSearch}
                                    onChange={handleStatusSearch}

                                >
                                    <Select.Option value="active">Kích hoạt</Select.Option>
                                    <Select.Option value="inactive">Chưa kích hoạt</Select.Option>
                                </Select> */}
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
                    <h2>Danh sách các quyền <Tag color="#4096ff">0</Tag></h2>
                    <Row>
                        <Button type="primary" icon={<ExportOutlined />} style={{ marginRight: "10px" }} >
                            Xuất file Excel
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenAdd(true)}>
                            Thêm mới các quyền
                        </Button>

                    </Row>

                </Row>
            </Col>
        </>
    )
}
