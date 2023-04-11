import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const DeleteCate = ({ open, setOpen, item, getAll }) => {

    const ok = async () => {
        try {
            await axios.delete(`http://localhost:7000/category/${item?._id}`)
            setOpen(false)
            toast.success("Xóa danh mục thành công")
            getAll()

        } catch (e) {
            console.log("ERR:", e)
            toast.warning("Xóa danh mục thất bại !");
        }
    }

    return (
        <>
            <Modal
                title="Xóa"
                centered
                open={open}
                onOk={ok}
                onCancel={() => setOpen(false)}
            >
                <p style={{ textAlign: "center" }}>Bạn có chắc muốn xóa danh mục {JSON.stringify(item?.catename)} này ?</p>
            </Modal>
        </>
    );
}
