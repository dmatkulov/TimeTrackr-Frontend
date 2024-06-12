import React from 'react';
import { Col, Row, Statistic } from 'antd';

interface Props {
  totalTimeSpent: string | undefined;
  amount: number | undefined;
}

const Statistics: React.FC<Props> = ({ totalTimeSpent, amount }) => (
  <Row gutter={16}>
    <Col span={8}>
      <Statistic title="Учет времени" value={totalTimeSpent} />
    </Col>
    <Col span={8}>
      <Statistic title="Выполненных задач" value={amount} />
    </Col>
  </Row>
);

export default Statistics;
