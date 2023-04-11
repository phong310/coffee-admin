import React, { useRef, useState } from 'react'
import { Col, Form, Input, Modal, Row } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const AddModals = ({ open, setOpen, getAll }) => {
    const { TextArea } = Input;

    const [cateName, setCateName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const formRef = useRef(null)

    const ok = () => {
        formRef.current.validateFields().then(async () => {
            try {
                const newCate = {
                    catename: cateName,
                    title: title,
                    description: description
                }
                await axios.post(`http://localhost:7000/category/createCate`, newCate)
                setOpen(false)
                toast.success("Thêm danh mục thành công")
                reset_form()
                getAll()

            } catch (e) {
                console.log("ERR:", e)
                toast.warning("Xóa đồ uống thất bại !");
            }
        })

    }

    const reset_form = () => {
        formRef.current.resetFields();
        setCateName("");
        setTitle("");
        setDescription("");
    }

    return (
        <>
            <Modal
                title="Thêm mới"
                centered
                width={700}
                open={open}
                onOk={ok}
                onCancel={() => setOpen(false)}
            >
                <Form ref={formRef} layout="vertical" style={{ margin: '30px 10px' }}>

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
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề" />
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
