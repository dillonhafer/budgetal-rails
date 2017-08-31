import { Col, Row } from 'antd';
const MortgageCaclulator = () => {
  const style = { border: 'none', width: '100%', height: '800px' };
  return (
    <Row className="space-around">
      <Col span={18} offset={3}>
        <div className="header-row">
          <h3>Mortgage Calculator</h3>
        </div>
        <div className="body-row">
          <iframe
            src="https://mortgage.dillonhafer.com"
            seamless
            style={style}
          />
        </div>
      </Col>
    </Row>
  );
};

export default MortgageCaclulator;
