import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const DeleteRole = ({ open, setOpen, item, getAll }) => {

    const ok = async () => {
        try {
            await axios.delete(`http://localhost:7000/roles/${item?._id}`)
            setOpen(false)
            toast.success("Xóa nhóm quyền thành công")
            getAll()

        } catch (e) {
            console.log("ERR:", e)
            toast.warning("Xóa nhóm quyền thất bại !");
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
                <p style={{ textAlign: "center" }}>Bạn có chắc muốn xóa nhóm quyền <span style={{ color: "red" }}>{JSON.stringify(item?.role_name)}</span> này ?</p>
            </Modal>
        </>
    );
}
