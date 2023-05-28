import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Select, Space, Upload, message } from 'antd';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
const { Option } = Select;

// const getBase64 = (img, callback) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

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


const AddModal = ({ data, setData, getAll }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const formRef = useRef(null)

    const handleStatus = (value) => {
        setStatus(value)
        console.log(value)
    }


    const handleChange = (info) => {
        // console.log(info)
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            // Set imageUrl to the uploaded image URL
            setImageUrl(info.file.response.imageURL);
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

    const onClose = () => {
        setData(false);
        reset_form()
    };

    const createNewInfor = () => {
        formRef.current.validateFields().then(async () => {
            const newInfor = {
                titleNews: title,
                imgNews: imageUrl,
                contentNews: description,
                statusNews: status
            }
            try {
                const response2 = await axios.post('http://localhost:7000/news/addNews', newInfor);
                console.log(response2)
                setData(false);
                toast.success("Thêm mới thông tin thành công");
                reset_form()
                getAll();
            } catch (e) {
                console.log("Lỗi rồi:", e)
                toast.warning("Thêm mới thông tin thất bại !");
            }
        })
    }

    const reset_form = () => {
        formRef.current.resetFields();
        setImageUrl("");
        setTitle("");
        setDescription("");
        setStatus("")
    }


    return (
        <>
            <Modal
                title="Thêm mới thông tin"
                width={720}
                onOk={createNewInfor}
                onCancel={onClose}
                open={data}
                bodyStyle={{
                    paddingBottom: 80,
                }}
            >
                <Form ref={formRef} onFinish={createNewInfor} layout="vertical">
                    <Row style={{ justifyContent: "center", marginBottom: 20 }}>
                        <Col>
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                action="http://localhost:7000/upload"
                                onChange={handleChange}

                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
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
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="titleNews"
                                label="Tên sản phẩm"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập tên',
                                    },
                                ]}
                            >
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tên sản phảm" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="contentNews"
                                label="Nôi dung"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập nội dung',
                                    },
                                ]}
                            >
                                <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={8} placeholder="Nhập nội dung" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="statusNews"
                                label="Trạng thái"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn trạng thái',
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn trạng thái" value={status} onChange={handleStatus}>
                                    <Option value="active">Kích hoạt</Option>
                                    <Option value="inactive">Chưa kích hoạt</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
export default AddModal;