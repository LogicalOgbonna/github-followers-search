import React from 'react';
import GitHubUserSearch from "./lib";
import { Row, Col } from 'antd';
const App = () => {
    return (
        <Row justify="center">
            <Col>
                <GitHubUserSearch />
            </Col>
        </Row>
    )
}

export default App
