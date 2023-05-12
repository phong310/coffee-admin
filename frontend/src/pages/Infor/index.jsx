import { EditTwoTone } from '@ant-design/icons';
import { Button, Card, Col, Divider, Image, Row, Tag } from 'antd';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUser } from '../../API/apiRequest';
import { EditInfor } from '../../components/Infor/editModal';
export const InforUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [user, setUser] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false)

    // lấy thông tin store redux
    const users = useSelector((state) => state.auth.login?.currentUser);

    const getAllUsers = async () => {
        getAllUser(users?.accessToken, dispatch, navigate)
        setUser(users.user)
    }

    useEffect(() => {
        if (!users) {
            navigate("/");
        }
        getAllUsers()
    }, [users.user])

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
                    <Tag color={user.role === 'DIRECTOR' || user.role === 'ADMIN' ? '#f5222d' : (user.role === 'MANAGER' ? '#d3adf7' : '#87e8de')}>{user.role}</Tag>
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
            <EditInfor open={openUpdate} setOpen={setOpenUpdate} getAll={getAllUsers} users={users} />

        </Card>
    )
}
