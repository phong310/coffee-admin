import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../.././assets/CSS/login.css"
import axios from "axios";
import { toast } from 'react-toastify';

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [userData, setUserData] = useState("")

    // const handleUser = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:8000/user/getAllUser");
    //         setUserData(res.data)
    //     } catch (e) {
    //         console.log("Err:", e)
    //     }
    // }

    // useEffect(() => {
    //     handleUser()
    // }, [])

    // const authCtx = useContext(AuthContext);
    // let navigate = useNavigate();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const user = userData;
    //     const ngdung = user.find(
    //         (u) => u.username === userName && u.password === password
    //     );
    //     if (ngdung) {
    //         authCtx.setUser(ngdung);
    //         toast.success("Đăng nhập thành công !")
    //         navigate("/");
    //     } else {
    //         toast.warning("Đăng nhập thất bại !")

    //     }
    // };

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
                    <h1>Welcome</h1>
                    <form className="infoform" >
                        <label>Your name:</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }} />
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                        <button type="submit" className="btn_login">Login</button>{" "}
                        {/* <p>
                            You don't have an account, please sign up{" "}
                            <Link to="/register" className="link"><b>Here</b></Link>
                        </p> */}
                        <p>
                            <Link to="/main/home" className="link"><b><ArrowLeftOutlined style={{ marginRight: 10 }} />Back to home page</b></Link>
                        </p>
                    </form>
                </Col>
            </Col>
        </Row>
    );
}
