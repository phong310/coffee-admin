import { Col, Form, Input, Modal, Row, Select } from 'antd';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';


export const AddPermission = ({ open, setOpen, getAll }) => {
    const { TextArea } = Input;
    const [perName, setPerName] = useState("");
    const [nameDisplay, setNameDisplay] = useState("");
    const [perDes, setPerDes] = useState("");
    const [perStatus, setPerStatus] = useState("")

    const formRef = useRef(null)


    const handleChangeStatus = (value) => {
        setPerStatus(value)
    }

    const OK = () => {
        formRef.current.validateFields().then(async () => {
            const newPer = {
                per_name: perName,
                per_name_display: nameDisplay,
                per_description: perDes,
                per_status: perStatus
            }
            try {
                await axios.post("http://localhost:7000/permission/createPermission", newPer);
                toast.success("Thêm mới quyền thành công")
                reset_form()
                setOpen(false);
                getAll();

            } catch (e) {
                toast.warning("Thêm mới quyền thất bại !")
                console.log("Err", e)
            }
        })
    }

    const onClose = () => {
        setOpen(false);
        reset_form()
    };


    const reset_form = () => {
        formRef.current.resetFields();
        setPerName("");
        setNameDisplay("");
        setPerDes("");
        setPerStatus("");
    }

    return (
        <>
            <Modal
                title="Thêm mới quyền"
                centered
                width={800}
                open={open}
                onOk={OK}
                onCancel={onClose}
            >
                <Col span={24} style={{ margin: '30px 0px' }}>
                    <Form ref={formRef} layout="vertical">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
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
                                    name="nameDisplay"
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
                                    name="description"
                                    label="Mô tả chi tiết"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Xin vui lòng nhập mô tả',
                                        },
                                    ]}
                                >
                                    <TextArea value={perDes} onChange={(e) => setPerDes(e.target.value)} rows={4} placeholder="Nhập mô tả . . ." maxLength={50} showCount />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
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
