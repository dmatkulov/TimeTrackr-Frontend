import React, { CSSProperties } from 'react';
import {
  Col,
  Divider,
  Flex,
  Progress,
  ProgressProps,
  Row,
  Statistic,
  Typography,
} from 'antd';
import { convertTime } from '../../../utils/constants';

interface Props {
  totalTimeSpent: number;
  amount: number;
}

const layout = {
  xs: { span: 24 },
  sm: { span: 12 },
  lg: { span: 6 },
};

const colStyle: CSSProperties = {
  marginBottom: '32px',
};

const Statistics: React.FC<Props> = ({ totalTimeSpent, amount }) => {
  const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  const red: ProgressProps['strokeColor'] = {
    '100%': '#87d068',
  };

  const workDay = 28800;

  const workLoad = Math.floor((totalTimeSpent / workDay) * 100);
  const timeSpent = convertTime(totalTimeSpent);

  let overWork;
  let overWorkHours;

  if (workLoad > 100) {
    overWork = workLoad - 100;
    overWorkHours = convertTime(totalTimeSpent - workDay);
  }

  return (
    <Row gutter={32}>
      <Divider />
      <Col {...layout} style={colStyle}>
        <Statistic title="Учет времени" value={timeSpent} />
      </Col>
      <Col {...layout} style={colStyle}>
        <Statistic title="Выполненных задач" value={amount} />
      </Col>
      <Col {...layout} style={colStyle}>
        <Typography.Text
          style={{
            color: 'rgba(0, 0, 0, 0.45)',
            marginBottom: '4px',
            display: 'block',
          }}
        >
          Загруженность за один день {workLoad > 100 ? '100%' : workLoad + '%'}
        </Typography.Text>
        <Flex align="center" style={{ height: '38px' }}>
          <Progress percent={workLoad} strokeColor={twoColors} />
        </Flex>
      </Col>
      {workLoad > 100 && (
        <Col {...layout} style={colStyle}>
          <Typography.Text
            style={{
              color: 'rgba(0, 0, 0, 0.45)',
              marginBottom: '4px',
              display: 'block',
            }}
          >
            У вас переработка {overWorkHours}
          </Typography.Text>
          <Flex align="center" style={{ height: '38px' }}>
            <Progress
              status="exception"
              percent={overWork}
              strokeColor={red}
              showInfo={false}
            />
          </Flex>
        </Col>
      )}
    </Row>
  );
};

export default Statistics;
