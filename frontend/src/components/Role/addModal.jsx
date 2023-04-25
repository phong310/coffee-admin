import React, { useEffect, useState } from 'react'
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const AddRole = ({ open, setOpen, getAll }) => {
    const { TextArea } = Input;



    // const ok = async () => {
    //     const newRole = {
    //         username: item.username,
    //         password: item.password,
    //         confirm: item.confirm,
    //         email: item.email,
    //         phone: item.phone,
    //         role: role,
    //         status: item.status,
    //         avatar: item.avatar,
    //         birthday: item.birthday,
    //         sex: item.sex,
    //         address: item.address,
    //     };
    //     try {
    //         await axios.put(`http://localhost:7000/user/update/${item?._id}`, newRole)
    //         setOpen(false)
    //         toast.success("Cập nhật quyền thành công")
    //         getAll()

    //     } catch (e) {
    //         console.log("ERR:", e)
    //         toast.warning("Cập nhật quyền thất bại !");
    //     }
    // }

    return (
        <>
            <Modal
                title="Thêm mới nhóm quyền"
                centered
                width={800}
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
            >
                <Col span={24} style={{ margin: '30px 0px' }}>
                    <Form layout="vertical">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Tên nhóm quyền"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Xin vui lòng nhập tên',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Tên nhóm quyền" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="status"
                                    label="Trạng thái"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn trạng thái',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Trạng thái">
                                        <Select.Option value="active">Kích hoạt</Select.Option>
                                        <Select.Option value="inactive">Chưa kích hoạt</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Mô tả chi tiết"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Xin vui lòng nhập mô tả',
                                        },
                                    ]}
                                >
                                    <TextArea rows={4} placeholder="Nhập mô tả . . ." maxLength={50} showCount />
                                </Form.Item>
                            </Col>

                        </Row>
                    </Form>
                </Col>
            </Modal>
        </>
    );
}
