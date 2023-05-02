import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const DeleteOrder = ({ open, setOpen, item, getAll }) => {

    const ok = async () => {
        try {
            await axios.delete(`http://localhost:7000/order/${item?._id}`)
            setOpen(false)
            toast.success("Xóa đơn hàng thành công")
            getAll()

        } catch (e) {
            console.log("ERR:", e)
            toast.warning("Xóa đơn hàng thất bại !");
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
                <p style={{ textAlign: "center" }}>Bạn có chắc muốn xóa đơn hàng <span style={{ color: "red" }}>{JSON.stringify(item?._id)}</span> này ?</p>
            </Modal>
        </>
    );
}
