import axios from "axios";
import { logOutFailed, logOutStart, logOutSuccess, loginFailed, loginStart, loginSuccess } from "../redux/autSlice";
import { getUserStart, getUserFaild, getUserSuccess, getRoleStart, getRoleFaild, getRoleSuccess, getPermissionStart, getPermissionFaild, getPermissionSuccess } from "../redux/userSlice";
import { toast } from 'react-toastify';
import { getOrderFaild, getOrderStart, getOrderSuccess } from "../redux/orderSlice";
import { getCateFaild, getCateStart, getCateSuccess } from "../redux/cateSlice";



// LOGIN
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:7000/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/main/home");
        toast.success("Đăng nhập thành công !")
    } catch (e) {
        dispatch(loginFailed())
        toast.error("Đăng nhập không thành công")
    }
}

// LOGOUT
export const logoutUser = async (id, dispatch, navigate, accessToken) => {
    dispatch(logOutStart())
    try {
        await axios.post("http://localhost:7000/auth/logout", id, {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(logOutSuccess())
        navigate("/")
        toast.success("Đăng xuất thành công !")
    } catch (e) {
        dispatch(logOutFailed());
    }
}

// GET ALL USER
export const getAllUser = async (accessToken, dispatch, navigate) => {
    dispatch(getUserStart())
    try {
        const res = await axios.get("http://localhost:7000/user/getAllUser", {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(getUserSuccess(res.data))

    } catch (e) {
        dispatch(getUserFaild())
        navigate("/main/forbidden")
        toast.warning("Chỉ ADMIN mới truy cập !")
    }
}

// GET ALL ROLES
export const getAllRole = async (accessToken, dispatch, navigate) => {
    dispatch(getRoleStart());
    try {
        const res = await axios.get("http://localhost:7000/roles/getAllRole", {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(getRoleSuccess(res.data))

    } catch (e) {
        dispatch(getRoleFaild())
        navigate("/main/forbidden")
        // toast.warning("Chỉ ADMIN mới truy cập !")
    }
}

// GET ALL PERMISSION
export const getAllPermission = async (accessToken, dispatch, navigate) => {
    dispatch(getPermissionStart());
    try {
        const res = await axios.get("http://localhost:7000/permission/getAllPermission", {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(getPermissionSuccess(res.data))

    } catch (e) {
        dispatch(getPermissionFaild())
        navigate("/main/forbidden")
        // toast.warning("Chỉ ADMIN mới truy cập !")
    }
}

// GET ALL ORDER
export const getAllOrder = async (accessToken, dispatch, navigate) => {
    dispatch(getOrderStart())
    try {
        const res = await axios.get("http://localhost:7000/order/getAllOrder", {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(getOrderSuccess(res.data))

    } catch (e) {
        dispatch(getOrderFaild())
        navigate("/main/forbidden")
        toast.warning("Không có quyền truy cập !")
    }
}


// GET ALL CATEGORY 
export const getAllCate = async (accessToken, dispatch, navigate) => {
    dispatch(getCateStart());

    try {
        const res = await axios.get("http://localhost:7000/category/getAllCate", {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(getCateSuccess(res.data))

    } catch (e) {
        dispatch(getCateFaild());
        navigate("/main/forbidden");
        toast.warning("Không có quyền truy cập !")
    }
}
