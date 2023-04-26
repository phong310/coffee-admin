import React, { useEffect, useRef, useState } from 'react'
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const UpdateRole = ({ open, setOpen, getAll, item }) => {
    const { TextArea } = Input;
    const [roleName, setRoleName] = useState("");
    const [roleDes, setRoleDes] = useState("");
    const [roleStatus, setRoleStatus] = useState("");

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            role_name: item?.role_name,
            role_description: item?.role_description,
            role_status: item?.role_status
        })
        setRoleName(item?.role_name);
        setRoleDes(item?.role_description);
        setRoleStatus(item?.role_status)

    }, [item, form])


    const handleChangeStatus = (value) => {
        setRoleStatus(value)
    }

    const OK = () => {
        form.validateFields().then(async () => {
            const newRole = {
                role_name: roleName,
                role_description: roleDes,
                role_status: roleStatus
            }
            try {
                await axios.put(`http://localhost:7000/roles/update/${item?._id}`, newRole);
                toast.success("Cập nhật nhóm quyền thành công")
                reset_form()
                setOpen(false);
                getAll();

            } catch (e) {
                toast.warning("Cập nhật nhóm quyền thất bại !")
                console.log("Err", e)
            }
        })
    }


    const reset_form = () => {
        form.resetFields();
        setRoleName("");
        setRoleDes("");
        setRoleStatus("");
    }






    return (
        <>
            <Modal
                title="Thêm mới nhóm quyền"
                centered
                width={800}
                open={open}
                onOk={OK}
                onCancel={() => setOpen(false)}
            >
                <Col span={24} style={{ margin: '30px 0px' }}>
                    <Form form={form} layout="vertical">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="role_name"
                                    label="Tên nhóm quyền"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Xin vui lòng nhập tên',
                                        },
                                    ]}
                                >
                                    <Input value={roleName} onChange={(e) => setRoleName(e.target.value)} placeholder="Tên nhóm quyền" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="role_status"
                                    label="Trạng thái"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn trạng thái',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Trạng thái" onChange={handleChangeStatus}>
                                        <Select.Option value="active">Kích hoạt</Select.Option>
                                        <Select.Option value="inactive">Chưa kích hoạt</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="role_description"
                                    label="Mô tả chi tiết"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Xin vui lòng nhập mô tả',
                                        },
                                    ]}
                                >
                                    <TextArea value={roleDes} onChange={(e) => setRoleDes(e.target.value)} rows={4} placeholder="Nhập mô tả . . ." maxLength={50} showCount />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Modal>
        </>
    );
}
