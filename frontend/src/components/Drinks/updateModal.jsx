import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Upload, message } from 'antd';
import { useEffect, useState, useForm } from 'react';
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


const UpdateModal = ({ data, setData, getAll, item }) => {
    const [placement, setPlacement] = useState('left');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [id, setID] = useState();
    const [price, setPrice] = useState();
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            id: item?.id,
            img: item?.img,
            price: item?.price,
            title: item?.title,
            description: item?.description,
            status: item?.status
        })
        setID(item?.id);
        setImageUrl(item?.img);
        setPrice(item?.price);
        setTitle(item?.title);
        setDescription(item?.description);
        setStatus(item?.status)


    }, [item, form])

    const handleStatus = (value) => {
        setStatus(value)
    }

    const handleUpdate = () => {
        form.validateFields().then(async () => {
            const newUpdate = {
                id: id,
                img: imageUrl,
                price: price,
                title: title,
                description: description,
                status: status
            }

            try {
                await axios.put(`http://localhost:7000/drinks/update/${item?._id}`, newUpdate)
                setData(false);
                toast.success("Cập nhật đồ uống thành công");
                reset_form();
                getAll()

            } catch (e) {
                console.log("Err:", e);
                toast.warning("Cập nhật đồ uống thất bại !")
            }
        })

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


    const reset_form = () => {
        form.resetFields();
        setID("");
        setImageUrl("");
        setPrice("");
        setTitle("");
        setDescription("");
        setStatus("")
    }


    return (
        <>
            <Drawer
                title="Cập nhật đồ uống"
                width={720}
                placement={placement}
                onClose={onClose}
                open={data}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Hủy</Button>
                        <Button onClick={handleUpdate} type="primary">
                            Cập nhật
                        </Button>
                    </Space>
                }
            >
                <Form form={form} onSubmit={handleUpdate} layout="vertical">
                    {/* {JSON.stringify(item)} */}


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
                        <Col span={8}>
                            <Form.Item
                                name="id"
                                label="STT"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập stt',
                                    },
                                ]}
                            >
                                <Input type="number" value={id} onChange={(e) => setID(e.target.value)} placeholder="Nhập STT" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="title"
                                label="Tên đồ uống"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập tên',
                                    },
                                ]}
                            >
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tên đồ uống" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="price"
                                label="Giá đồ uống"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập giá',
                                    },
                                ]}
                            >
                                <Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Nhập giá đồ uống" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Mô tả"
                            >
                                <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Nhập mô tả" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
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
                                <Select placeholder="Chọn trạng thái" onChange={handleStatus}>
                                    <Option value="active">Còn hàng</Option>
                                    <Option value="inactive">Hết hàng</Option>
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