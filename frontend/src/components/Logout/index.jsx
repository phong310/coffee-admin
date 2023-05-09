import { Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../API/apiRequest';
// import { createAxios } from '../../Interceptor';
// import { logOutSuccess } from '../../redux/autSlice';


export const Logout = ({ open, setOpen, name }) => {
    let navigate = useNavigate()
    let dispatch = useDispatch()

    // lấy thông tin store redux
    const user = useSelector((state) => state.auth.login?.currentUser)

    const id = user?._id;
    const accessToken = user?.accessToken

    // let axiosJWT = createAxios(user, dispatch, logOutSuccess)


    const ok = async () => {
        logoutUser(id, dispatch, navigate, accessToken)
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
