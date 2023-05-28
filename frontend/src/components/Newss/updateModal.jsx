import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, Row, Select, Upload, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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


const UpdateModal = ({ data, setData, getAll, item, trigger }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            titleNews: item?.titleNews,
            imgNews: item?.imgNews,
            contentNews: item?.contentNews,
            statusNews: item?.statusNews
        })
        setImageUrl(item?.imgNews);
        setTitle(item?.titleNews);
        setDescription(item?.contentNews);
        setStatus(item?.statusNews)


    }, [item, form, trigger])

    const handleStatus = (value) => {
        setStatus(value)
    }

    const handleUpdate = () => {
        form.validateFields().then(async () => {
            const newUpdate = {
                titleNews: title,
                imgNews: imageUrl,
                contentNews: description,
                statusNews: status
            }

            try {
                await axios.put(`http://localhost:7000/news/update/${item?._id}`, newUpdate)
                setData(false);
                toast.success("Cập nhật thông tin thành công");
                reset_form();
                getAll()

            } catch (e) {
                console.log("Err:", e);
                toast.warning("Cập nhật thông tin thất bại !")
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
        setImageUrl("");
        setTitle("");
        setDescription("");
        setStatus("")
    }


    return (
        <>
            <Modal
                title="Cập nhật thông tin sản phẩm "
                width={720}
                onOk={handleUpdate}
                onCancel={onClose}
                open={data}
                bodyStyle={{
                    paddingBottom: 80,
                }}
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
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tên đồ uống" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="contentNews"
                                label="Nội dung"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xin vui lòng nhập nội dung',
                                    },
                                ]}
                            >
                                <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} rows={8} placeholder="Nhập mô tả" />
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
                                <Select placeholder="Chọn trạng thái" onChange={handleStatus}>
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
export default UpdateModal;