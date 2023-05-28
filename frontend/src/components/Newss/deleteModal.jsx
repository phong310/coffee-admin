import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const DeleteNewInfor = ({ open, setOpen, item, getAll }) => {

    const ok = async () => {
        try {
            await axios.delete(`http://localhost:7000/news/${item?._id}`)
            setOpen(false)
            toast.success("Xóa thông tin sản phẩm thành công")
            getAll()

        } catch (e) {
            console.log("ERR:", e)
            toast.warning("Xóa thông tin sản phẩm thất bại !");
        }
    }

    return (
        <>
            <Modal
                title="Xóa thông tin"
                centered
                open={open}
                onOk={ok}
                onCancel={() => setOpen(false)}
            >
                <p style={{ textAlign: "center" }}>Bạn có chắc muốn xóa thông tin <span style={{ color: "red" }}>{JSON.stringify(item?.titleNews)}</span> này ?</p>
            </Modal>
        </>
    );
}
