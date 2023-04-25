import React, { useEffect, useState } from 'react'
import { Col, Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const UpdateRole = ({ open, setOpen, item, getAll }) => {
    const [role, setRole] = useState("");

    useEffect(() => {
        setRole(item?.role)
    }, [item]);

    const handleRole = (value) => {
        setRole(value)
    }


    const ok = async () => {
        const newRole = {
            username: item.username,
            password: item.password,
            confirm: item.confirm,
            email: item.email,
            phone: item.phone,
            role: role,
            status: item.status,
            avatar: item.avatar,
            birthday: item.birthday,
            sex: item.sex,
            address: item.address,
        };
        try {
            await axios.put(`http://localhost:7000/user/update/${item?._id}`, newRole)
            setOpen(false)
            toast.success("Cập nhật quyền thành công")
            getAll()

        } catch (e) {
            console.log("ERR:", e)
            toast.warning("Cập nhật quyền thất bại !");
        }
    }

    return (
        <>
            <Modal
                title="Cập nhật quyền"
                centered
                width={600}
                open={open}
                onOk={ok}
                onCancel={() => setOpen(false)}
            >
                <Col span={24} style={{ margin: '30px 0px' }}>
                    <Select value={role} placeholder="Nhóm quyền" style={{
                        width: 540,
                    }} onChange={handleRole}>
                        <Select.Option value="ADMIN">ADMIN</Select.Option>
                        <Select.Option value="USER">USER</Select.Option>
                    </Select>
                </Col>
            </Modal>
        </>
    );
}
