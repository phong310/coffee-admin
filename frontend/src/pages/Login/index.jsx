import { Checkbox, Col, Row } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "../.././assets/CSS/login.css";
import AuthContext from "../../context/Auth";
import Cookies from 'js-cookie';
import { loginUser } from "../../API/apiRequest";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState("");
    const [remember, setRemember] = useState(false)

    const checkLogin = useContext(AuthContext);
    const { users, setUser } = checkLogin
    const navigate = useNavigate();
    const dispatch = useDispatch()


    // const handleUser = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:7000/user/getAllUser");
    //         setUserData(res.data)
    //     } catch (e) {
    //         console.log("Err:", e)
    //     }
    // }

    useEffect(() => {
        const storedPassword = localStorage.getItem("password");
        const storedUsername = localStorage.getItem("username");
        if (storedPassword) {
            const decryptedPassword = atob(storedPassword); // Giải mã mật khẩu
            setPassword(decryptedPassword);
            setUserName(storedUsername);
            setRemember(true);
        }
    }, [])


    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     const user = userData;
    //     const ngdung = user.find(
    //         (u) => u.username === userName && u.password === password
    //     );
    //     if (ngdung) {
    //         if (remember) {
    //             // Lưu vào localStorage
    //             const encryptedPassword = btoa(password); // Mã hóa mật khẩu
    //             localStorage.setItem("password", encryptedPassword);
    //             localStorage.setItem("username", userName);
    //         }
    //         toast.success("Đăng nhập thành công !")
    //         setUser(ngdung)
    //         Cookies.set('user', JSON.stringify(ngdung), { expires: 1 });
    //         navigate("/main/home");
    //     } else {
    //         toast.warning("Đăng nhập thất bại !")
    //         setUser(null)

    //     }
    // };

    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            username: userName,
            password: password
        }
        loginUser(user, dispatch, navigate)
        if (remember) {
            // Lưu vào localStorage
            const encryptedPassword = btoa(password); // Mã hóa mật khẩu
            localStorage.setItem("password", encryptedPassword);
            localStorage.setItem("username", userName);
        }
        // Cookies.set('user', JSON.stringify(user), { expires: 1 });

    }

    return (
        <Row className="body_wrapper">
            <Col span={12}>
                <img
                    src="https://phuclong.com.vn/uploads/post/20649d183ca5f1-bannertrangchu.jpg"
                    alt=""
                    style={{ width: "auto", height: "100vh", objectFit: "contain" }}
                />
            </Col>
            <Col span={12}>
                <Col className="section" span={6}>
                    <img
                        src="https://phuclong.com.vn/images/logo_2.png"
                        alt=""
                        width={80}
                    />
                    <h1 style={{ marginTop: '15px' }}>Hệ thống quản lý Coffee trực tuyến</h1>
                    <form className="infoform" >
                        <label>Tên tài khoản:</label>
                        <input
                            type="text"
                            placeholder="Nhập tên tài khoản"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }} />
                        <label>Mật khẩu:</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ color: "green", fontSize: 12 }}>Nhớ mật khẩu</Checkbox>
                            <Link style={{ color: "green", fontSize: 12 }}>Quên mật khẩu ?</Link>
                        </Row>
                        <button type="submit" className="btn_login" onClick={handleLogin}>Đăng nhập</button>
                    </form>
                </Col>
            </Col>
        </Row>
    );
}
