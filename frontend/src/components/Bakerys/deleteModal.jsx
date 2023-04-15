import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const DeleteBakery = ({ open, setOpen, item, getAll }) => {

    const ok = async () => {
        try {
            await axios.delete(`http://localhost:7000/bakery/${item?._id}`)
            setOpen(false)
            toast.success("Xóa loại bánh thành công")
            getAll()

        } catch (e) {
            console.log("ERR:", e)
            toast.warning("Xóa loại bánh thất bại !");
        }
    }

    return (
        <>
            <Modal
                title="Delete"
                centered
                open={open}
                onOk={ok}
                onCancel={() => setOpen(false)}
            >
                <p style={{ textAlign: "center" }}>Bạn có chắc muốn xóa bánh {JSON.stringify(item?.title)} này ?</p>
            </Modal>
        </>
    );
}
