import React from 'react';
import { useState } from 'react';
import { HomePage } from '../../pages/Home';
import { Drinks } from '../../pages/Drinks';
import { Bakery } from '../../pages/Bakery';
import { Snacks } from '../../pages/Snacks';
import { Route, Routes, Link } from "react-router-dom";
import { DollarOutlined, CoffeeOutlined, DashboardOutlined, UserOutlined, AppstoreOutlined, FireOutlined, MenuOutlined, BellOutlined, HeartOutlined, FileSearchOutlined, CarryOutOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Col, Row, Avatar, Dropdown } from 'antd';
import { Typography } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';


const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;


// function getItem(label, key, icon, children) {
//     return {
//         key,
//         icon,
//         children,
//         label,
//     };
// }
// const items = [
//     getItem('Trang chủ', '1', <DashboardOutlined />),
//     getItem('Option 2', '2', <DesktopOutlined />),
//     getItem('User', 'sub1', <UserOutlined />, [
//         getItem('Tom', '3'),
//         getItem('Bill', '4'),
//         getItem('Alex', '5'),
//     ]),
//     getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//     getItem('Files', '9', <FileOutlined />),
// ];

const itemsDropAvatar = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
];

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

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
                        <Link to="/">Trang chủ</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Quản lý hệ thống">
                        <Menu.Item key="2" icon={<CoffeeOutlined />}>
                            <Link to="/mangerment/drinks">Quản lý đồ uống</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<HeartOutlined />} >
                            <Link to="/mangerment/bakery">Quản lý bánh</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<FireOutlined />}>
                            <Link to="/mangerment/snacks">Quản lý snacks</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5" icon={<DollarOutlined />}>
                        <Link to="/">Quản lý đơn hàng</Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<FileSearchOutlined />}>
                        <Link to="/">Quản lý tin tức</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<UserOutlined />} title="Quản lý tài khoản">
                        <Menu.Item key="7" icon={<UserOutlined />}>
                            <Link to="/">Tài khoản</Link>
                        </Menu.Item>
                        <Menu.Item key="8" icon={<UsergroupDeleteOutlined />}>
                            <Link to="/">Phân quyền</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="9" icon={<CarryOutOutlined />}>
                        <Link to="/">Thống kê</Link>
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
                                    <Title level={4}>Dashbroad</Title>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row style={{ alignItems: 'center', marginRight: 20 }}>
                                <Col>
                                    <Dropdown placement='bottom' arrow overlay={<Menu items={itemsDropAvatar} />}>
                                        <BellOutlined style={{ fontSize: 18 }} />
                                    </Dropdown>
                                </Col>
                                <Col style={{ marginLeft: 25 }}>
                                    <Col>
                                        <Row style={{ alignItems: 'center' }}>
                                            <Dropdown
                                                overlay={<Menu items={itemsDropAvatar} />}
                                                placement="bottom"
                                                arrow
                                            >
                                                <Avatar icon={<UserOutlined />} />
                                            </Dropdown>
                                            <Col style={{ marginLeft: 10, marginTop: 8 }}>
                                                <Title level={5}>The Wind</Title>
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
                        <Route exact path="/" element={<HomePage />} />
                        <Route path="/mangerment/drinks" element={<Drinks />} />
                        <Route path="/mangerment/bakery" element={<Bakery />} />
                        <Route path="/mangerment/snacks" element={<Snacks />} />
                    </Routes>


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