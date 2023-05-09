import { Button, Col, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Forbidden = () => {
    const navigate = useNavigate()
    const backHome = () => {
        navigate("/main/home")
    }

    return (
        <Col style={{ marginTop: '5%' }}>
            <Result
                status="403"
                title="403"
                subTitle="Xin lỗi, Bạn không được phép truy cập trang này."
                extra={<Button type="primary" onClick={backHome}>Quay về Trang chủ</Button>}
            />
        </Col>
    )
};
