import React, { useContext } from 'react'
import { Card, Image, Col, Row, Divider, Button, Tag } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import AuthContext from '../../context/Auth';

export const InforUser = () => {

    const { user, setUser } = useContext(AuthContext)


    return (
        <Card title="Thông tin người dùng" style={{ width: 700, height: 780, margin: '0 auto', top: '3%', marginBottom: '20px' }}>
            <Row style={{ justifyContent: "center", marginBottom: 20 }}>
                <Col>
                    <Image
                        width={100}
                        height={100}
                        style={{ objectFit: "cover", borderRadius: '50%' }}
                        src={user.avatar}

                    />

                </Col>
            </Row>
            <Row style={{ justifyContent: "center" }}>
                <Button type="success" ghost icon={<EditTwoTone />}>
                    Chỉnh sửa
                </Button>
            </Row>
            <Col style={{ padding: "20px" }}>
                <Row style={{ justifyContent: "space-between" }}>
                    <span>Tên đăng nhập: </span>
                    <b>{user.username}</b>
                    <Divider />
                </Row>
                <Row style={{ justifyContent: "space-between", }}>
                    <span>Email: </span>
                    <b>{user.email}</b>
                    <Divider />
                </Row>
                <Row style={{ justifyContent: "space-between", }}>
                    <span>Giới tính: </span>
                    <b>{user.sex}</b>
                    <Divider />
                </Row>
                <Row style={{ justifyContent: "space-between", }}>
                    <span>SĐT: </span>
                    <b>{user.phone}</b>
                    <Divider />
                </Row>
                <Row style={{ justifyContent: "space-between", }}>
                    <span>Ngày sinh: </span>
                    <b>{user.birthday}</b>
                    <Divider />
                </Row>
                <Row style={{ justifyContent: "space-between", }}>
                    <span>Nhóm quyền: </span>
                    <Tag color={user.role === 'ADMIN' ? '#d3adf7' : '#87e8de'}>{user.role}</Tag>
                    <Divider />
                </Row>
                <Row style={{ justifyContent: "space-between", }}>
                    <span>Trạng thái: </span>
                    <Tag color={user.status === 'active' ? 'green' : 'red'}>
                        {user.status === "active" ? "Kích hoạt" : "Chưa Kích hoạt"}
                    </Tag>
                    <Divider />
                </Row>
            </Col>

        </Card>
    )
}
