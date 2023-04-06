import { Checkbox, Col, Row } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "../.././assets/CSS/login.css";
import AuthContext from "../../context/Auth";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState("");

    const checkLogin = useContext(AuthContext);
    const { user, setUser } = checkLogin

    const handleUser = async () => {
        try {
            const res = await axios.get("http://localhost:7000/user/getAllUser");
            setUserData(res.data)
        } catch (e) {
            console.log("Err:", e)
        }
    }

    useEffect(() => {
        handleUser()
    }, [])

    let navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const user = userData;
        const ngdung = user.find(
            (u) => u.username === userName && u.password === password
        );
        if (ngdung) {
            toast.success("Đăng nhập thành công !")
            setUser(true)
            navigate("/main/home");
        } else {
            toast.warning("Đăng nhập thất bại !")
            setUser(false)

        }
    };

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
                            <Checkbox style={{ color: "green", fontSize: 12 }}>Nhớ mật khẩu</Checkbox>
                            <Link style={{ color: "green", fontSize: 12 }}>Quên mật khẩu ?</Link>
                        </Row>
                        <button type="submit" className="btn_login" onClick={handleLogin}>Đăng nhập</button>
                    </form>
                </Col>
            </Col>
        </Row>
    );
}
