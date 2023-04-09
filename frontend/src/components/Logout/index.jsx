import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export const Logout = ({ open, setOpen, name }) => {
    let navigate = useNavigate()

    const ok = async () => {
        toast.success("Đăng xuất thành công !")
        Cookies.remove('user');
        navigate("/")
        setOpen(false)
    }

    return (
        <>
            <Modal
                title="Đăng xuất"
                centered
                open={open}
                onOk={ok}
                onCancel={() => setOpen(false)}
            >
                <p style={{ textAlign: "center" }}>Bạn có chắc muốn đăng xuất tài khoản <span style={{ color: 'red' }}>{name}</span> này ?</p>
            </Modal>
        </>
    );
}
