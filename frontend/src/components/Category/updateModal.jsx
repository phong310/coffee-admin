import React, { useEffect, useRef, useState } from 'react'
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const UpdateModals = ({ open, setOpen, getAll, item }) => {
    const { TextArea } = Input;
    const { Option } = Select;

    const [cateName, setCateName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            catename: item?.catename,
            title: item?.title,
            description: item?.description
        })
        setCateName(item?.catename);
        setTitle(item?.title);
        setDescription(item?.description);

    }, [item, form])


    const ok = () => {
        form.validateFields().then(async () => {
            try {
                const newCate = {
                    catename: cateName,
                    title: title,
                    description: description
                }
                await axios.put(`http://localhost:7000/category/updateCate/${item?._id}`, newCate)
                setOpen(false)
                toast.success("Cập nhật danh mục thành công")
                reset_form()
                getAll()

            } catch (e) {
                console.log("ERR:", e)
                toast.warning("Cập nhật danh mục thất bại !");
            }
        })

    }
    const handleTitle = (value) => {
        setTitle(value)
    }

    const reset_form = () => {
        form.resetFields();
        setCateName("");
        setTitle("");
        setDescription("");
    }

    return (
        <>
            <Modal
                title="Cập nhập"
                centered
                width={700}
                open={open}
                onOk={ok}
                onCancel={() => setOpen(false)}
            >
                <Form form={form} layout="vertical" style={{ margin: '30px 10px' }}>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item
                                name="catename"
                                label="Tên danh mục"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập tên danh mục',
                                    },
                                ]}
                            >
                                <Input value={cateName} onChange={(e) => setCateName(e.target.value)} placeholder="Tên danh mục" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                label="Tiêu đề"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập tiêu đề',
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn Tiêu đề" onChange={handleTitle}>
                                    <Option value="drinks">Đồ uống</Option>
                                    <Option value="bakery">Bánh</Option>
                                    <Option value="snacks">Đồ ăn vặt</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập mô tả',
                                    },
                                ]}
                            >
                                <TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} placeholder="Mô tả" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}
