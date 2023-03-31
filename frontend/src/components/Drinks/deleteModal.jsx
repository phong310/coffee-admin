import React from 'react'
import { Modal } from 'antd';
import { toast } from 'react-toastify';


export const DeleteDrink = ({ open, setOpen }) => {

    const ok = () => {
        // toast.success("Xóa người dùng thành công")
        setOpen(false)
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
                <p style={{ textAlign: "center" }}>Bạn có chắc muốn xóa người dùng số  này ?</p>
            </Modal>
        </>
    );
}
