import { LoadingOutlined, MailOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Upload, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
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

const UpdateModal = ({ data, setData, getAll, item }) => {
    const [placement, setPlacement] = useState('left');
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [birthday, setBirthday] = useState("");
    const [sex, setSex] = useState("");


    const [form] = Form.useForm()


    const handleRole = (value) => {
        setRole(value)
    }

    const handleSex = (value) => {
        setSex(value)
    }

    const handleStatus = (item) => {
        setStatus(item)
    }

    const handleBirthday = (date, dateString) => {
        setBirthday(dateString);
    }


    useEffect(() => {
        form.setFieldsValue({
            username: item?.username,
            password: item?.password,
            confirm: item?.confirm,
            email: item?.email,
            phone: item?.phone,
            role: item?.role,
            status: item?.status,
            avatar: item?.avatar,
            birthday: item?.birthday,
            sex: item?.sex
        })
        setUsername(item?.username);
        setPassword(item?.password);
        setConfirmPassword(item?.confirm);
        setEmail(item?.email);
        setPhoneNumber(item?.phone);
        setRole(item?.role);
        setStatus(item?.status)
        setAvatarUrl(item?.avatar)
        setBirthday(item?.birthday);
        setSex(item?.sex)

    }, [item, form])

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

    const updateUser = async () => {
        form.validateFields().then(async () => {
            const newUpdate = {
                username: username,
                password: password,
                confirm: confirmPassword,
                email: email,
                phone: phoneNumber,
                role: role,
                status: status,
                avatar: avatarUrl,
                birthday: birthday,
                sex: sex,
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
                                    <Option value="Nam">Nam</Option>
                                    <Option value="Nữ">Nữ</Option>
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
                                {birthday}
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