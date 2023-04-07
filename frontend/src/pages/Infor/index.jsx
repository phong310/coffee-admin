import React from 'react'
import { Card, Image, Col, Row } from 'antd';

export const InforUser = () => {
    return (
        <Card title="Thông tin người dùng" style={{ width: 900, margin: '0 auto', top: '10%' }}>
            <Row style={{ justifyContent: "center", marginBottom: 20 }}>
                <Col>
                    <Image
                        width={100}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"

                    />
                </Col>
            </Row>


            <p>Card content</p>
            <p>Card content</p>
        </Card>
    )
}
