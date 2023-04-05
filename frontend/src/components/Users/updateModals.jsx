import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const { Option } = Select;



const UpdateModal = ({ data, setData, getAll, item }) => {
    const [placement, setPlacement] = useState('left');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    const [form] = Form.useForm()


    const handleRole = (value) => {
        setRole(value)
    }

    const handleStatus = (item) => {
        setStatus(item)
    }

    useEffect(() => {
        form.setFieldsValue({
            username: item?.username,
            password: item?.password,
            confirm: item?.confirm,
            email: item?.email,
            phone: item?.phone,
            role: item?.role,
            status: item?.status
        })
        setUsername(item?.username);
        setPassword(item?.password);
        setConfirmPassword(item?.confirm);
        setEmail(item?.email);
        setPhoneNumber(item?.phone);
        setRole(item?.role);
        setStatus(item?.status)

    }, [item, form])

    const updateUser = async () => {
        form.validateFields().then(async () => {
            const newUpdate = {
                username: username,
                password: password,
                confirm: confirmPassword,
                email: email,
                phone: phoneNumber,
                role: role,
                status: status
            }
            try {
                const response2 = await axios.put(`http://localhost:7000/user/update/${item?._id}`, newUpdate);
                console.log(response2)
                setData(false);
                toast.success("Cập nhật tài khoản thành công");
                reset_form()
                getAll();
            } catch (e) {
                console.log("Lỗi rồi:", e)
                toast.warning("Cập nhật tài khoản thất bại !");
            }
        })
    }

    const close_form = () => {
        setData(false)
        reset_form()
    }

    const reset_form = () => {
        form.resetFields();
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setPhoneNumber("");
        setRole("");
        setStatus("")
    }



    return (
        <>
            <Drawer
                title="Cập nhật tài khoản"
                width={720}
                placement={placement}
                onClose={close_form}
                open={data}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={close_form}>Hủy</Button>
                        <Button type="primary" onClick={updateUser}>
                            Cập nhật
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical">
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
                                name="password"
                                label="Mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập mật khẩu',
                                    },
                                ]}
                            >
                                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="confirm"
                                label="Xác nhận mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng xác nhận mật khẩu',
                                    },
                                ]}
                            >
                                <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu" />
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
                                    <Option value="ADMIN">ADMIN</Option>
                                    <Option value="USER">USER</Option>
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
                                    <Option value="active">Kích hoạt</Option>
                                    <Option value="inactive">Chưa kích hoạt</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
export default UpdateModal;