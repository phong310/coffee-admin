import { ApartmentOutlined, AppstoreOutlined, BellOutlined, CarryOutOutlined, CoffeeOutlined, DashboardOutlined, DollarOutlined, FileSearchOutlined, FireOutlined, HeartOutlined, MenuOutlined, NodeExpandOutlined, ProfileOutlined, SettingOutlined, UserOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Avatar, Col, Dropdown, Layout, Menu, Row, Typography, theme } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
import React, { useContext, useState } from 'react';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import AuthContext from '../../context/Auth';
import { Account } from '../../pages/Account';
import { Bakery } from '../../pages/Bakery';
import { Category } from '../../pages/Category';
import { Drinks } from '../../pages/Drinks';
import { HomePage } from '../../pages/Home';
import { InforUser } from '../../pages/Infor';
import { Snacks } from '../../pages/Snacks';
import { Logout } from '../Logout';
import { Order } from '../../pages/Order';
import { Role } from '../../pages/Role';
import { Forbidden } from '../../pages/Forbidden';
import Permission from '../../pages/Create_Permission';
import { useSelector } from 'react-redux';
import Newss from '../../pages/Newss';


const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;


const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    // const { user, setUser } = useContext(AuthContext)
    const user = useSelector((state) => state.auth.login?.currentUser.user)
    // console.log(user)
    const [openLogout, setOpenLogOut] = useState(false)
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case "/main/home":
                return "Trang chủ";
            case "/main/mangerment/drinks":
                return "Quản lý đồ uống";
            case "/main/mangerment/bakery":
                return "Quản lý bánh";
            case "/main/mangerment/snacks":
                return "Quản lý đồ ăn vặt";
            case "/main/mangerment/account":
                return "Quản lý tài khoản";
            case "/main/mangerment/role":
                return "Quản lý nhóm quyền";
            case "/main/mangerment/permission":
                return "Tạo các quyền";
            case "/main/mangerment/category":
                return "Quản lý danh mục bán hàng";
            case "/main/mangerment/infor":
                return "Thông tin người dùng";
            case "/main/order":
                return "Quản lý đơn hàng"
            case "/main/news":
                return "Quản lý thông tin sản phẩm"
            case "/main/forbidden":
                return "403"
            default:
                return "Dashbroad";
        }
    };

    const handleLogout = () => {
        setOpenLogOut(true)
    }

    const itemsDropAvatar = [
        {
            key: '1',
            label: (
                <Link to="/main/mangerment/infor" >Thông tin người dùng</Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to="/main/mangerment/account"> Tài khoản</Link>
            ),
        },
        {
            key: '3',
            label: (
                <span onClick={handleLogout}>Đăng xuất</span>
            ),
        },
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={210}>

                <Row style={{ padding: "10px 0px", justifyContent: "center" }}>
                    <img
                        src="https://phuclong.com.vn/images/logo_2.png"
                        width={80}
                    />
                </Row>


                {/* Menu side bar */}
                {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        <Link to="/main/home">Trang chủ</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Quản lý hệ thống">
                        <Menu.Item key="2" icon={<CoffeeOutlined />}>
                            <Link to="/main/mangerment/drinks">Quản lý đồ uống</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<HeartOutlined />} >
                            <Link to="/main/mangerment/bakery">Quản lý bánh</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<FireOutlined />}>
                            <Link to="/main/mangerment/snacks">Quản lý snacks</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<NodeExpandOutlined />} title="Đơn hàng">
                        <Menu.Item key="5" icon={<DollarOutlined />}>
                            <Link to="/main/order">Quản lý đơn hàng</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="6" icon={<ApartmentOutlined />}>
                        <Link to="/main/mangerment/category">Danh mục bán hàng</Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<FileSearchOutlined />}>
                        <Link to="/main/news">Thông tin sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key="8" icon={<ProfileOutlined />}>
                        <Link to="/main/home">Quản lý tin tức</Link>
                    </Menu.Item>
                    <SubMenu key="sub3" icon={<UserOutlined />} title="Quản lý tài khoản">
                        <Menu.Item key="9" icon={<UserOutlined />}>
                            <Link to="/main/mangerment/account">Tài khoản</Link>
                        </Menu.Item>
                        <Menu.Item key="10" icon={<UsergroupDeleteOutlined />}>
                            <Link to="/main/mangerment/role">Nhóm quyền</Link>
                        </Menu.Item>
                        <Menu.Item key="11" icon={<SettingOutlined />}>
                            <Link to="/main/mangerment/permission">Tạo quyền</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="12" icon={<CarryOutOutlined />}>
                        <Link to="/main/home">Thống kê</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Row style={{ justifyContent: "space-between" }}>
                        <Col>
                            <Row>
                                <Col style={{ marginLeft: 20 }}>
                                    <MenuOutlined onClick={() => setCollapsed(!collapsed)} />
                                </Col>

                                <Col style={{ marginLeft: 20, marginTop: 17 }}>
                                    <Title level={4}>{getPageTitle()}</Title>
                                </Col>

                            </Row>
                        </Col>
                        <Col>
                            <Row style={{ alignItems: 'center', marginRight: 20 }}>
                                <Col>
                                    <BellOutlined style={{ fontSize: 18 }} />
                                </Col>
                                <Col style={{ marginLeft: 25 }}>
                                    <Col>
                                        <Row style={{ alignItems: 'center' }}>
                                            <Dropdown
                                                overlay={<Menu items={itemsDropAvatar} />}
                                                placement="bottom"
                                                arrow
                                                trigger={['click']}
                                            >
                                                <Avatar src={user.avatar} />
                                            </Dropdown>
                                            <Col style={{ marginLeft: 10, marginTop: 8 }}>
                                                <Title level={5}>{user.username}</Title>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Header>


                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    {/* Router các page */}
                    <Routes>
                        <Route exact path="/home" element={<HomePage />} />
                        <Route path="/mangerment/drinks" element={<Drinks />} />
                        <Route path="/mangerment/bakery" element={<Bakery />} />
                        <Route path="/mangerment/snacks" element={<Snacks />} />
                        <Route path="/mangerment/account" element={<Account />} />
                        <Route path="/mangerment/role" element={<Role />} />
                        <Route path="/mangerment/permission" element={<Permission />} />
                        <Route path="/mangerment/category" element={<Category />} />
                        <Route path="/mangerment/infor" element={<InforUser />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/news" element={<Newss />} />
                        <Route path="/forbidden" element={<Forbidden />} />
                    </Routes>

                    <Logout open={openLogout} setOpen={setOpenLogOut} name={user.username} />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Design ©2023 Created by The Wind
                </Footer>
            </Layout>
        </Layout>
    );
};
export default MainLayout;