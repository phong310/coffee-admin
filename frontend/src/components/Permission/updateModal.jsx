import { Col, Form, Input, Modal, Row, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


export const UpdatePermission = ({ open, setOpen, getAll, item }) => {
    const { TextArea } = Input;
    const [perName, setPerName] = useState("");
    const [nameDisplay, setNameDisplay] = useState("");
    const [perDes, setPerDes] = useState("");
    const [perStatus, setPerStatus] = useState("")

    const [form] = Form.useForm()



    const handleChangeStatus = (value) => {
        setPerStatus(value)
    }

    useEffect(() => {
        form.setFieldsValue({
            per_name: item?.per_name,
            per_name_display: item?.per_name_display,
            per_description: item?.per_description,
            per_status: item?.per_status
        })
        setPerName(item?.per_name);
        setNameDisplay(item?.per_name_display);
        setPerDes(item?.per_description);
        setPerStatus(item?.per_status)
    }, [item, form])

    const OK = () => {
        form.validateFields().then(async () => {
            const newPer = {
                per_name: perName,
                per_name_display: nameDisplay,
                per_description: perDes,
                per_status: perStatus
            }
            try {
                await axios.put(`http://localhost:7000/permission/update/${item?._id}`, newPer);
                toast.success("Cập nhật quyền thành công")
                reset_form()
                setOpen(false);
                getAll();

            } catch (e) {
                toast.warning("Cập nhật quyền thất bại !")
                console.log("Err", e)
            }
        })
    }


    const reset_form = () => {
        form.resetFields();
        setPerName("");
        setNameDisplay("");
        setPerDes("");
        setPerStatus("");
    }

    return (
        <>
            <Modal
                title="Cập nhật quyền"
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
                                    name="per_name"
                                    label="Tên quyền"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Xin vui lòng nhập tên',
                                        },
                                    ]}
                                >
                                    <Input value={perName} onChange={(e) => setPerName(e.target.value)} placeholder="Tên quyền" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="per_name_display"
                                    label="Tên hiển thị"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Xin vui lòng nhập tên hiển thị',
                                        },
                                    ]}
                                >
                                    <Input value={nameDisplay} onChange={(e) => setNameDisplay(e.target.value)} placeholder="Tên quyền hiển thị" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="per_description"
                                    label="Mô tả chi tiết"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Xin vui lòng nhập mô tả',
                                        },
                                    ]}
                                >
                                    <TextArea value={perDes} onChange={(e) => setPerDes(e.target.value)} rows={4} placeholder="Nhập mô tả . . ." maxLength={150} showCount />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="per_status"
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
                        </Row>
                    </Form>
                </Col>
            </Modal>
        </>
    );
}
