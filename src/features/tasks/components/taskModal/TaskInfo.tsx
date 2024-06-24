import React from 'react';
import { Avatar, Col, Row, Space, Typography } from 'antd';
import { gray } from '@ant-design/colors';
import { CalendarOutlined } from '@ant-design/icons';
import { Author } from '../../../../types/types.user';
import { apiURL } from '../../../../utils/constants';
import dayjs from 'dayjs';

interface Props {
  author: Author;
  executionDate: string;
}

const TaskInfo: React.FC<Props> = ({ author, executionDate }) => {
  const colStyle = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '14px',
  };

  const src = `${apiURL}/${author.photo}`;

  const avatar = author.photo ? (
    <Avatar src={src} alt={author.firstname} size="small" />
  ) : (
    <Avatar style={{ backgroundColor: '#f56a00' }} size="small">
      {author.firstname.charAt(0)}
    </Avatar>
  );

  const date = dayjs(executionDate).format('D MMMM, dddd');

  return (
    <Row gutter={16}>
      <Col span={24} style={colStyle}>
        <Space>
          {avatar}
          <Typography.Text style={{ color: gray.primary }}>
            {`${author.firstname} ${author.lastname}`}
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24} style={colStyle}>
        <Space>
          <div
            style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#efdbff',
              borderRadius: '50%',
            }}
          >
            <CalendarOutlined style={{ color: '#531dab' }} />
          </div>
          <Typography.Text style={{ color: gray.primary }}>
            {date}
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  );
};

export default TaskInfo;
