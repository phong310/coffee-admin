import React, { useContext, useEffect, useState } from 'react'
import { Card, Image, Col, Row, Divider, Button, Tag } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import AuthContext from '../../context/Auth';
import { EditInfor } from '../../components/Infor/editModal';
import moment from "moment"
import axios from 'axios';
export const InforUser = () => {

    const { user, setUser } = useContext(AuthContext);
    const [openUpdate, setOpenUpdate] = useState(false)

    const getAllUser = async () => {
        try {
            const res = await axios.get("http://localhost:7000/user/getAllUser");
            setUser(res.data.find((item) => {
                if (item._id === user._id) {
                    return user
                }
            }))
        } catch (e) {
            console.log("Err:", e)
        }
    }

    useEffect(() => { getAllUser() }, [])

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
                <Button type="success" ghost icon={<EditTwoTone />} onClick={() => setOpenUpdate(true)}>
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
                    <b><i>{user.email}</i></b>
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
                    <b>{moment(user.birthday).format('DD/MM/YYYY')}</b>
                    <Divider />
                </Row>
                <Row style={{ justifyContent: "space-between", }}>
                    <span>Nhóm quyền: </span>
                    {user.role.map((item) => <Tag key={item._id} color={item === 'DIRECTOR' || item === 'ADMIN' ? '#f5222d' : (item === 'MANAGER' ? '#d3adf7' : '#87e8de')}>{item}</Tag>)}
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

            {/* Chỉnh sửa */}
            <EditInfor open={openUpdate} setOpen={setOpenUpdate} getAll={getAllUser} />

        </Card>
    )
}
