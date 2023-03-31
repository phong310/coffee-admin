import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const DeleteDrink = ({ open, setOpen, item, getAll }) => {

    const ok = async () => {
        try {
            await axios.delete(`http://localhost:7000/drinks/${item?._id}`)
            setOpen(false)
            toast.success("Xóa người dùng thành công")
            getAll()

        } catch (e) {
            console.log("ERR:", e)
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
                <p style={{ textAlign: "center" }}>Bạn có chắc muốn xóa đồ uống {JSON.stringify(item?.title)} này ?</p>
            </Modal>
        </>
    );
}
