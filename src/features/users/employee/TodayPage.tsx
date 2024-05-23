import React from 'react';
import dayjs from 'dayjs';
import { Divider, Space } from 'antd';

const TodayPage: React.FC = () => {
  const date = new Date();
  const today = dayjs(date).format('DD MMMM, YYYY');
  return (
    <>
      <Space>
        Сегодня
        {today}
      </Space>
      <Divider />
      <div>Ваши задачи</div>
    </>
  );
};

export default TodayPage;
