import { LoadingOutlined, MailOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Col, DatePicker, Form, Input, Modal, Row, Select, Upload, message } from 'antd';
import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const { Option } = Select;

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};


export const EditInfor = ({ open, setOpen, getAll, users }) => {

    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [birthday, setBirthday] = useState("");
    const [sex, setSex] = useState("");

    const [form] = Form.useForm()

    const handleChange = (info) => {
        // console.log(info)
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            // Set imageUrl to the uploaded image URL
            setAvatarUrl(info.file.response.imageURL);
            console.log(info.file.response.imageURL)
            setLoading(false);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            setLoading(false);
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    )

    useEffect(() => {
        form.setFieldsValue({
            username: users.user.username,
            email: users.user.email,
            phone: users.user.phone,
            role: users.user.role,
            status: users.user.status,
            avatar: users.user.avatar,
            birthday: moment(users.user.birthday),
            sex: users.user.sex
        })
        setUsername(users.user.username);
        setEmail(users.user.email);
        setPhoneNumber(users.user.phone);
        setRole(users.user.role);
        setStatus(users.user.status)
        setAvatarUrl(users.user.avatar)
        setBirthday(moment(users.user.birthday));
        setSex(users.user.sex)

    }, [users, form])


    const handleRole = (value) => {
        setRole(value)
    }

    const handleStatus = (value) => {
        setStatus(value)
    }

    const handleBirthday = (date, dateString) => {
        setBirthday(dateString);
    }

    const handleSex = (value) => {
        setSex(value)
    }

    const Edit = async () => {
        try {
            const newEdit = {
                avatar: avatarUrl,
                username: username,
                email: email,
                sex: sex,
                phone: phoneNumber,
                role: role,
                birthday: birthday,
                status: status,
            }
            await axios.put(`http://localhost:7000/user/update/${users.user._id}`, newEdit);
            setOpen(false);
            toast.success("Cập nhật tài khoản thành công");
            getAll()
        } catch (e) {
            console.log("Err", e)
        }
    }

    return (
        <>
            <Modal
                title="Cập nhật thông tin"
                centered
                width={900}
                open={open}
                onOk={Edit}
                onCancel={() => setOpen(false)}
            >
                <Form form={form} layout="vertical" >
                    {/* {JSON.stringify(user)} */}
                    <Row style={{ justifyContent: "center", marginBottom: 20 }}>
                        <Col>
                            <Upload
                                name="file"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                action="http://localhost:7000/upload"
                                onChange={handleChange}

                            >
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </Col>

                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label="Tên tài khoản"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập tên',
                                    },
                                ]}
                            >
                                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Tên tài khoản" prefix={<UserOutlined />} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập email',
                                    },
                                ]}
                            >
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" prefix={<MailOutlined />} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="sex"
                                label="Giới tính"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn giới tính',
                                    },
                                ]}
                            >
                                <Select placeholder="Giới tính" onChange={handleSex}>
                                    <Option key="1" value="Nam">Nam</Option>
                                    <Option key="2" value="Nữ">Nữ</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="birthday"
                                label="Ngày sinh"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số ngày sinh',
                                    },
                                ]}
                            >
                                <DatePicker onChange={handleBirthday} style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Chọn ngày sinh" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại',
                                    },
                                ]}
                            >
                                <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type='text' placeholder="SĐT" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="role"
                                label="Nhóm quyền"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn nhóm quyền',
                                    },
                                ]}
                            >
                                <Select placeholder="Nhóm quyền" onChange={handleRole}>
                                    <Option key="1" value="ADMIN">ADMIN</Option>
                                    <Option key="2" value="USER">USER</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
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
                                <Select placeholder="Trạng thái" onChange={handleStatus}>
                                    <Option key="1" value="active">Kích hoạt</Option>
                                    <Option key="2" value="inactive">Chưa kích hoạt</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}
