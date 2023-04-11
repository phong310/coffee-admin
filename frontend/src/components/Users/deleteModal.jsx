import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const DeleteUser = ({ open, setOpen, item, getAll }) => {

    const ok = async () => {
        try {
            await axios.delete(`http://localhost:7000/user/${item?._id}`)
            setOpen(false)
            toast.success("Xóa tài khoản thành công")
            getAll()

        } catch (e) {
            console.log("ERR:", e)
            toast.warning("Xóa tài khoản thất bại !");
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
                <p style={{ textAlign: "center" }}>Bạn có chắc muốn xóa tài khoản <span style={{ color: "red" }}>{JSON.stringify(item?.username)}</span> này ?</p>
            </Modal>
        </>
    );
}
