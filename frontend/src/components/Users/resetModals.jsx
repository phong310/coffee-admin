import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';


export const ResetUser = ({ open, setOpen, item, getAll }) => {

    const ok = async () => {
        try {
            await axios.post(`http://localhost:7000/user/reset/${item?._id}`)
            setOpen(false)
            toast.success("Đặt lại mật khẩu thành công")
            getAll()

        } catch (e) {
            console.log("ERR:", e)
            toast.warning("Đặt lại mật khẩu thất bại !");
        }
    }

    return (
        <>
            <Modal
                title="Reset"
                centered
                open={open}
                onOk={ok}
                onCancel={() => setOpen(false)}
            >
                <p style={{ textAlign: "center" }}>Bạn có chắc muốn đặt lại mật khẩu thành <span style={{ color: "red" }}>"123@123a"</span> của tài khoản {JSON.stringify(item?.username)} này ?</p>
            </Modal>
        </>
    );
}
